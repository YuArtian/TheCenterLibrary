# 如何彻底重启Docker实例

> https://docs.tibco.com/pub/mash-local/4.1.1/doc/html/docker/GUID-BD850566-5B79-4915-987E-430FC38DAAE4.html

1. Stop the container(s) using the following command:

   ```
   docker-compose down
   ```

2. Delete all containers using the following command:

   ```
   docker rm -f $(docker ps -a -q)
   ```

3. Delete all volumes using the following command:

   ```
   docker volume rm $(docker volume ls -q)
   ```

4. Restart the containers using the following command:

   ```
   docker-compose up -d
   ```

