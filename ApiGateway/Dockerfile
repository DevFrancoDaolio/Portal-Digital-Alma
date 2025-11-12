# ===============================
# FASE 1: COMPILACIÓN (BUILD)
# Usamos la imagen de Maven y Java 21 (de tu pom.xml)
# ===============================
FROM maven:3.9.9-eclipse-temurin-21 AS build
WORKDIR /app

# CLAVE: Copiamos todo el proyecto a la vez
# Esto asegura que Maven tenga todos los archivos necesarios (.mvn, etc.)
COPY . .

# CLAVE: Usamos 'mvn clean install' en lugar de 'go-offline'
# Esto fuerza a Maven a resolver todas las dependencias y compilar el proyecto en un solo paso
RUN mvn clean install -DskipTests

# ===============================
# FASE 2: IMAGEN FINAL (RUNTIME)
# ===============================
FROM eclipse-temurin:21-jdk-alpine
WORKDIR /app

# Ya que usamos el Dockerfile de la versión antigua, usaremos la línea de copia correcta:
COPY --from=build /app/target/ApiGateway-*.jar app.jar

# Puerto interno del microservicio
EXPOSE 8080

# Variables de memoria opcionales
ENV JAVA_OPTS="-Xms256m -Xmx512m"

# Comando de arranque
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]