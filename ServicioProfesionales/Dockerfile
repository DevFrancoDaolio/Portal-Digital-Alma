# ====== Etapa 1: Build ======
FROM eclipse-temurin:21-jdk AS build

# Directorio de trabajo
WORKDIR /app

# Copiamos pom.xml primero (para aprovechar cache de Docker)
COPY pom.xml .

# Instalar dependencias de Maven y compilar
RUN apt-get update && apt-get install -y maven

# Copiamos el código fuente
COPY src ./src

# Compilación y empaquetado (skip tests)
RUN mvn clean package -DskipTests

# ====== Etapa 2: Run (JRE ligero) ======
FROM eclipse-temurin:21-jre

WORKDIR /app

# Copiamos el JAR desde la etapa de build
COPY --from=build /app/target/*.jar ./app.jar

# Comando para ejecutar la aplicación
ENTRYPOINT ["java", "-jar", "app.jar"]

