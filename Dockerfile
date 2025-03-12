# Sử dụng image node để build Angular
FROM node:18 AS build-stage
WORKDIR /app

# Copy toàn bộ project vào container
COPY . .

# Cài đặt dependencies
RUN npm install
RUN npm run build

# Sử dụng image nginx để phục vụ ứng dụng
FROM nginx:latest AS production-stage
COPY --from=build-stage /app/dist/management-human /usr/share/nginx/html

# Expose port
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
