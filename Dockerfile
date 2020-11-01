FROM mongo:bionic
LABEL author="Binghong wu" email="<wubinhong2012@gmail.com>"

# Timezone setting
ENV TZ="Asia/Shanghai"
# There are tree locales (C, C.UTF-8, POSIX) in image(mongo:bionic), so just take C.UTF-8 as default locale.
ENV LANG="C.UTF-8" LC_ALL="C.UTF-8" LC_LANG="C.UTF-8" PYTHONIOENCODING="UTF-8"
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# Basic flask environment
COPY ./docker/sources.list /etc/apt/
RUN apt-get update --fix-missing -y
RUN apt-get install -y openjdk-11-jdk openjdk-11-dbg curl tree vim less net-tools tcpdump lsof iputils-ping traceroute atop glances cron nginx-full redis-server && rm -rf /var/lib/apt/lists/*
#RUN apt-get install -y build-essential

# Nginx component setting: redirect logger to container's std in/out which can be checkeout out via command docker logs
RUN ln -sf /dev/stdout /var/log/nginx/access.log && ln -sf /dev/stderr /var/log/nginx/error.log
# Disable IPv6 for redis-server
RUN sed -i "s/bind .*/bind 127.0.0.1/g" /etc/redis/redis.conf

# Volume
VOLUME [ "/data" ]

# Install backend dependencies
RUN mkdir -p /root/.pip /app/backend /app/src/backend/gradle /app/src/backend/backend
COPY ./gradle /app/src/backend/gradle
COPY ./settings.gradle /app/src/backend/
COPY ./gradlew /app/src/backend/
COPY ./build.gradle /app/src/backend/

## Download gradle wrapper
WORKDIR /app/src/backend
RUN ./gradlew projects

## Install gradlen dependencies
COPY ./backend /app/src/backend/backend
RUN mkdir -p tmp && find backend -name "build.gradle" |xargs cp --parents -t tmp && rm -r backend && mv tmp/backend . && rm -r tmp
RUN ./gradlew clean :backend:app:dependencies --configuration=compile
RUN rm -r /app/src/backend/backend

# Update backend source and compile jar
COPY ./backend /app/src/backend/backend
RUN ./gradlew clean :backend:app:assemble && cp backend/app/build/libs/app.jar /app/backend/

# Configure pip
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
