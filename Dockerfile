# Stage 1: Build Stage
FROM node:lts-alpine as build-stage

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project
COPY . .

# Build the Vite app for production
RUN npm run build

# Stage 2: Production Stage
FROM nginx:alpine


COPY nginx.conf /etc/nginx/conf.d/default.conf


# Copy the built files from the build stage to Nginx's web root
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Optional: Copy a custom nginx.conf file if you have one
# Uncomment the following line if you have a custom nginx.conf
# COPY --from=build-stage /app/nginx.conf /etc/nginx/conf.d/default.conf

# Expose the port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]