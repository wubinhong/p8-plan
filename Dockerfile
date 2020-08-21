FROM mongo:bionic AS base
LABEL author="Binghong wu" email="<wubinhong2012@gmail.com>"

# Timezone setting
ENV TZ="Asia/Shanghai"
# There are tree locales (C, C.UTF-8, POSIX) in image(mongo:bionic), so just take C.UTF-8 as default locale.
ENV LANG="C.UTF-8" LC_ALL="C.UTF-8" LC_LANG="C.UTF-8" PYTHONIOENCODING="UTF-8"
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# Basic flask environment
COPY ./docker/sources.list /etc/apt/
RUN apt-get update -y
RUN apt-get install -y openjdk-8-jdk openjdk-8-dbg curl tree vim less net-tools tcpdump lsof iputils-ping traceroute atop glances cron nginx-full redis-server && rm -rf /var/lib/apt/lists/*
#RUN apt-get install -y build-essential

# Nginx component setting: redirect logger to container's std in/out which can be checkeout out via command docker logs
RUN ln -sf /dev/stdout /var/log/nginx/access.log && ln -sf /dev/stderr /var/log/nginx/error.log
# Disable IPv6 for redis-server
RUN sed -i "s/bind .*/bind 127.0.0.1/g" /etc/redis/redis.conf

# Volume
VOLUME [ "/data" ]

### =================== New Stage =========================== ###
# Stage two building
## Note: this should be used in conjunction with / along with ./build.sh bash script, which means that as long as having built target--base above into local repo with tag wbh/p8:base,
## this target--app would be executed without running the content of stage--base
FROM wbh/p8:base AS app
### =================== New Stage =========================== ###
# Sync app
# Configure pip
RUN mkdir -p /app/backend /app/frontend && mkdir /root/.pip
COPY ./backend/app/build/libs/app.jar /app/backend/
COPY ./docker/p8-entrypoint.sh /usr/local/bin
COPY ./docker/nginx.conf /etc/nginx/nginx.conf
COPY ./docker/p8.conf /etc/nginx/sites-available/default
COPY ./docker/cron_backup.sh /app
COPY ./docker/cron_task /etc/cron.d/backup-task

# Set environment variables
WORKDIR /app/backend
## https://docs.oracle.com/javase/7/docs/webnotes/tsg/TSG-VM/html/envvars.html
#ENV JAVA_TOOL_OPTIONS="-Xms50m -Xmx50m -XX:+PrintGC"
ENV JAVA_TOOL_OPTIONS="-Xms50m -Xmx50m"

# Startup app
# Illustrate how to construct a standard dockefile, acutally, we don't have to use ENTRYPOINT here.
ENTRYPOINT ["p8-entrypoint.sh"]
CMD ["p8"]
