FROM adoptopenjdk/openjdk11:jdk-11.0.2.9-slim
WORKDIR /opt
ENV PORT 9090
EXPOSE 9090
COPY target/*.jar /opt/app.jar
ENTRYPOINT exec java $JAVA_OPTS -Djdk.tls.client.protocols=TLSv1.2 -Xmx1500m -jar app.jar
