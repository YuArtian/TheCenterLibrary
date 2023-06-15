# Nginx强制跳转Https

> https://www.jianshu.com/p/116fc2d08165

## Nginx配置

### Nginx安装注意事项

安装的时候需要注意加上 **--with-http_ssl_module**，因为http_ssl_module不属于Nginx的基本模块。



```shell
1.配置
./configure 
--user=www 
--group=www 
--prefix=/usr/local/nginx 
--with-http_stub_status_module 
--with-http_ssl_module
2.编译安装
make && make install
```

### 配置SSL证书

如下两个证书文件
 **ssl.crt**
 **ssl.key**

配置存放路径为**/usr/local/nginx/cert/**



```shell
server {
          listen 443;
          server_name dev.wangsl.com;
          root /var/www/XXX/public;
 
          ssl on;
          ssl_certificate /usr/local/nginx/cert/ssl.crt;
          ssl_certificate_key /usr/local/nginx/cert/ssl.key;
          ssl_session_timeout 5m;
          ssl_protocols SSLv2 SSLv3 TLSv1;
          ssl_ciphers HIGH:!aNULL:!MD5;               //或者是ssl_ciphers ALL:!ADH:!EXPORT56:RC4+RSA:+HIGH:+MEDIUM:+LOW:+SSLv2:+EXP;
          ssl_prefer_server_ciphers on;
 
          access_log /var/www/vhosts/www.wangsl.com/logs/clickstream_ssl.log main;
          error_log /var/www/vhosts/www.wangsl.com/logs/clickstream_error_ssl.log;
 
         if ($remote_addr !~ ^(124.165.97.144|133.110.186.128|133.110.186.88)) {           //对访问的来源ip做白名单限制
                rewrite ^.*$ /maintence.php last;
         }
         
         location ~ \.php$ {
              fastcgi_pass 127.0.0.1:9000;
              fastcgi_read_timeout 300;
              fastcgi_index index.php;
              fastcgi_param SCRIPT_FILENAME /scripts$fastcgi_script_name;
             #include fastcgi_params;
             include fastcgi.conf;
         }
}
```

### Http访问强制跳转到Https的几种方式：

**一、采用nginx的rewrite方法**



```bash
1) 下面是将所有的http请求通过rewrite重写到https上。
    例如将所有的dev.wangsl.com域名的http访问强制跳转到https。
    下面配置均可以实现：
 
配置1：
server {
    listen 80;
    server_name dev.wangsl.com;
    index index.html index.php index.htm;
   
    access_log  /usr/local/nginx/logs/8080-access.log main;
    error_log  /usr/local/nginx/logs/8080-error.log;
     
    rewrite ^(.*)$  https://$host$1 permanent;        //这是ngixn早前的写法，现在还可以使用。
  
    location ~ / {
    root /var/www/html/8080;
    index index.html index.php index.htm;
    }
    }
 
================================================================
上面的跳转配置rewrite ^(.*)$  https://$host$1 permanent;
也可以改为下面
rewrite ^/(.*)$ http://dev.wangsl.com/$1 permanent;
或者
rewrite ^ http://dev.wangsl.com$request_uri? permanent;
================================================================
 
配置2：
server {
    listen 80;
    server_name dev.wangsl.com;
    index index.html index.php index.htm;
   
    access_log  /usr/local/nginx/logs/8080-access.log main;
    error_log  /usr/local/nginx/logs/8080-error.log;
 
    return      301 https://$server_name$request_uri;      //这是nginx最新支持的写法
  
    location ~ / {
    root /var/www/html/8080;
    index index.html index.php index.htm;
    }
    }
 
 
配置3：这种方式适用于多域名的时候，即访问wangsl.com的http也会强制跳转到https://dev.wangsl.com上面
server {
    listen 80;
    server_name dev.wangsl.com wangsl.com *.wangsl.com;
    index index.html index.php index.htm;
   
    access_log  /usr/local/nginx/logs/8080-access.log main;
    error_log  /usr/local/nginx/logs/8080-error.log;
     
    if ($host ~* "^wangsl.com$") {
    rewrite ^/(.*)$ https://dev.wangsl.com/ permanent;
    }
  
    location ~ / {
    root /var/www/html/8080;
    index index.html index.php index.htm;
    }
    }
 
 
配置4：下面是最简单的一种配置
server {
    listen 80;
    server_name dev.wangsl.com;
    index index.html index.php index.htm;
   
    access_log  /usr/local/nginx/logs/8080-access.log main;
    error_log  /usr/local/nginx/logs/8080-error.log;
     
    if ($host = "dev.wangsl.com") {
       rewrite ^/(.*)$ http://dev.wangsl.com permanent;
    }
 
    location ~ / {
    root /var/www/html/8080;
    index index.html index.php index.htm;
    }
    }
```

**二、采用nginx的497状态码**



```bash
497 - normal request was sent to HTTPS 
解释：当网站只允许https访问时，当用http访问时nginx会报出497错误码

思路：
利用error_page命令将497状态码的链接重定向到https://dev.wangsl.com这个域名上

配置实例：
如下访问dev.wangsl.com或者wangsl.com的http都会被强制跳转到https
server {
listen 80;
server_name dev.wangsl.com wangsl.com *.wangsl.com;
index index.html index.php index.htm;

access_log  /usr/local/nginx/logs/8080-access.log main;
error_log  /usr/local/nginx/logs/8080-error.log;

error_page 497  https://$host$uri?$args; 

location ~ / {
root /var/www/html/8080;
index index.html index.php index.htm;
}
}


也可以将80和443的配置放在一起：
server { 
listen       127.0.0.1:443;  #ssl端口 
listen       127.0.0.1:80;   #用户习惯用http访问，加上80，后面通过497状态码让它自动跳到443端口 
server_name  dev.wangsl.com; 
#为一个server{......}开启ssl支持 
ssl                  on; 
#指定PEM格式的证书文件  
ssl_certificate      /etc/nginx/wangsl.pem;  
#指定PEM格式的私钥文件 
ssl_certificate_key  /etc/nginx/wangsl.key; 

#让http请求重定向到https请求  
error_page 497  https://$host$uri?$args; 

location ~ / {
root /var/www/html/8080;
index index.html index.php index.htm;
}
}
```

**三、利用meta的刷新作用将http跳转到https**



```csharp
上述的方法均会耗费服务器的资源，可以借鉴百度使用的方法：巧妙的利用meta的刷新作用，将http跳转到https
可以基于http://dev.wangsl.com的虚拟主机路径下写一个index.html，内容就是http向https的跳转
 
将下面的内容追加到index.html首页文件内
[root@localhost ~]# cat /var/www/html/8080/index.html
<html> 
<meta http-equiv="refresh" content="0;url=https://dev.wangsl.com/"> 
</html>
 
[root@localhost ~]# cat /usr/local/nginx/conf/vhosts/test.conf
server {
    listen 80;
    server_name dev.wangsl.com wangsl.com *.wangsl.com;
    index index.html index.php index.htm;
   
    access_log  /usr/local/nginx/logs/8080-access.log main;
    error_log  /usr/local/nginx/logs/8080-error.log;
     
    #将404的页面重定向到https的首页 
    error_page  404 https://dev.wangsl.com/;  
  
    location ~ / {
    root /var/www/html/8080;         
    index index.html index.php index.htm;
    }
    }
```

**四、通过proxy_redirec方式**



```cpp
解决办法：
# re-write redirects to http as to https, example: /home
proxy_redirect http:// https://;
```

## 前端脚本控制

```javascript
<script type="text/javascript">
	var targetProtocol = "https:";
	if (window.location.protocol != targetProtocol)
		window.location.href = targetProtocol +
		window.location.href.substring(window.location.protocol.length);
</script>
```