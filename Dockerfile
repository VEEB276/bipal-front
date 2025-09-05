## Minimal Dockerfile to serve pre-built Angular dist with Nginx
## PRE-REQUISITO: Ejecutar build local (pnpm run build:prod) para generar dist/bipal-front/browser

FROM nginx:1.27-alpine

# Copiar config personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Limpiar html default
RUN rm -rf /usr/share/nginx/html/*

# Copiar únicamente artefactos ya compilados a subcarpeta (para baseHref /bipal-front/)
RUN mkdir -p /usr/share/nginx/html/bipal-front
COPY dist/bipal-front/browser /usr/share/nginx/html/bipal-front

EXPOSE 80
