# ===============================
# FASE 1: COMPILACIÓN (BUILD)
# Usamos Java 17, una versión LTS común.
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
# FASE 2: IMAGEN FINAL (RUNTIME)
# Usamos solo el JRE para una imagen más ligera y segura
# ===============================
FROM eclipse-temurin:21-jdk-alpine
WORKDIR /app

# Etiqueta para distinguir entre diferentes aplicaciones
ARG SERVICE_PORT

# Copiamos el JAR desde la fase de build
COPY --from=build /app/target/*.jar app.jar

# Puerto interno del microservicio (Será 8761 para Eureka, 8080 para Gateway, etc.)
# Nota: La exposición del puerto aquí es solo documental, Docker Compose lo maneja.
EXPOSE ${SERVICE_PORT}

# Variables de memoria opcionales
ENV JAVA_OPTS="-Xms256m -Xmx512m"

# Comando de arranque: ejecuta el JAR con las variables de memoria
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]