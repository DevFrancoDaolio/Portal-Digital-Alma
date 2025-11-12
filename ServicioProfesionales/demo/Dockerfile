# ===============================
# FASE 1: COMPILACIÓN (BUILD)
# ===============================
FROM maven:3.9.9-eclipse-temurin-21 AS build
WORKDIR /app

# 1️⃣ Copiamos solo el pom.xml para cachear dependencias
COPY pom.xml .

# Descargamos dependencias sin compilar aún
RUN mvn dependency:go-offline

# 2️⃣ Copiamos todo el código fuente (src)
COPY src ./src

# 3️⃣ Compilamos el proyecto sin ejecutar tests
RUN mvn clean package -DskipTests

# ===============================
# FASE 2: IMAGEN FINAL
# ===============================
FROM eclipse-temurin:21-jdk-alpine
WORKDIR /app

# Copiamos el JAR desde la fase de build
COPY --from=build /app/target/demo-*.jar app.jar

# Puerto interno del microservicio
EXPOSE 8080

# Variables de memoria opcionales
ENV JAVA_OPTS="-Xms256m -Xmx512m"

# Comando de arranque
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]
