# ====== Etapa 1: Build frontend ======
FROM node:20-alpine AS build
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Ejecutar build
RUN npm run build

# Normalizar la carpeta de salida a /app/build-output
RUN mkdir -p /app/build-output && \
    if [ -d /app/build ]; then \
        mv /app/build/* /app/build-output/; \
    elif [ -d /app/dist ]; then \
        mv /app/dist/* /app/build-output/; \
    else \
        echo "ERROR: carpeta de build no encontrada" && exit 1; \
    fi

# Verificación opcional
RUN ls -la /app/build-output

# ====== Etapa 2: Servir con Nginx ======
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Limpia contenido previo del contenedor nginx
RUN rm -rf ./*

# Copiar los archivos del build
COPY --from=build /app/build-output/ ./

# Verificación: mostrar contenido final
RUN ls -la /usr/share/nginx/html

# Exponer puerto 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
