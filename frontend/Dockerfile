# --- ETAPA 1: BUILDER (Compilación de la aplicación Angular) ---
FROM node:20-alpine AS builder

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de definición de dependencias
COPY package.json package-lock.json ./

# Instala las dependencias del proyecto
RUN npm ci

# Copia el resto del código fuente de la aplicación
COPY . .

# Construye la aplicación Angular para producción
# Ajusta 'your-angular-project-name' si tu proyecto Angular tiene un nombre específico
# Si tu comando de build es simplemente 'ng build', puedes usar 'npm run build'
# El '--output-path=./dist/browser' es un valor común para Angular CLI, ajústalo si es diferente
RUN npm run build -- --output-path=./dist/browser --configuration=production

# --- ETAPA 2: PRODUCTION (Servir la aplicación con Nginx) ---
FROM nginx:alpine AS production

# Copia la configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia los archivos estáticos de la aplicación Angular construida desde la etapa 'builder'
COPY --from=builder /app/dist/browser /usr/share/nginx/html

# Expone el puerto 80, que es el puerto por defecto de Nginx
EXPOSE 80

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
# --- ETAPA 1: BUILDER (Compilación de la aplicación Angular) ---
FROM node:20-alpine AS builder

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de definición de dependencias
COPY package.json package-lock.json ./

# Instala las dependencias del proyecto
RUN npm ci

# Copia el resto del código fuente de la aplicación
COPY . .

# Construye la aplicación Angular para producción
RUN npm run build -- --configuration=production

# --- ETAPA 2: PRODUCTION (Servir la aplicación con Nginx) ---
FROM nginx:alpine AS production

# Copia la configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia los archivos estáticos desde la ruta de salida correcta de la compilación de Angular
COPY --from=builder /app/dist/frontend/browser/ /usr/share/nginx/html

# Expone el puerto 80, que es el puerto por defecto de Nginx
EXPOSE 80

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]