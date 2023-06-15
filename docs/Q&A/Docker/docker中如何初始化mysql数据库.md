# docker中如何初始化mysql数据库

> https://github.com/YuArtian/docker-mysql-init
>
> https://stackoverflow.com/questions/38504257/mysql-scripts-in-docker-entrypoint-initdb-are-not-executed/52715521



### 需求

在 Docker 创建 MySQL 容器之后，希望能自动创建项目需要的库和表，初始数据也需要自动录入。要做到 MySQL 的容器启动好之后，数据库就是可用的状态。

所以，需要容器启动时可以执行 sql 脚本

### 实现原理

在 MySQL 官方镜像中提供了容器启动时自动执行 `docker-entrypoint-initdb.d` 文件夹下脚本的功能

所以简单来讲，只需要将 sql 脚本放入  `docker-entrypoint-initdb.d` 文件夹下就行了

但是，如果有多个 sql 需要依次执行，就要依赖 sh 进行控制

示例代码可以参考：https://github.com/YuArtian/docker-mysql-init 的实现

可查看 `simple` 和 `multiple` 文件夹下的示例

### 相关源码

docker-entrypoint.sh 源码如下：(https://github.com/docker-library/mysql/blob/master/8.0/docker-entrypoint.sh#L53)

```sh
_main() {
	#...
	if [ -z "$DATABASE_ALREADY_EXISTS" ]; then
	#...
	docker_process_init_files /docker-entrypoint-initdb.d/*
}
```

```sh
docker_process_init_files() {
	# mysql here for backwards compatibility "${mysql[@]}"
	mysql=( docker_process_sql )
	echo
	local f
	for f; do
		case "$f" in
			*.sh)
				# https://github.com/docker-library/postgres/issues/450#issuecomment-393167936
				# https://github.com/docker-library/postgres/pull/452
				if [ -x "$f" ]; then
					mysql_note "$0: running $f"
					"$f"
				else
					mysql_note "$0: sourcing $f"
					. "$f"
				fi
				;;
			*.sql)    mysql_note "$0: running $f"; docker_process_sql < "$f"; echo ;;
			*.sql.gz) mysql_note "$0: running $f"; gunzip -c "$f" | docker_process_sql; echo ;;
			*.sql.xz) mysql_note "$0: running $f"; xzcat "$f" | docker_process_sql; echo ;;
			*)        mysql_warn "$0: ignoring $f" ;;
		esac
		echo
	done
  }
```

> 另外，容器不执行 .sh 和 .sql 的问题
>
> https://stackoverflow.com/questions/38504257/mysql-scripts-in-docker-entrypoint-initdb-are-not-executed/52715521