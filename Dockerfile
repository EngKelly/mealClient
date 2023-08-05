# Stage 1: Build the Angular application
FROM node:14.17.1 as build

WORKDIR /app

# Install Angular CLI globally
# RUN npm install -g @angular/cli

# Copy package.json and package-lock.json before other files
# Utilise Docker cache to save re-installing packages if there are no changes
COPY package*.json ./

RUN npm install

# Copy all files from current directory to working dir in image
COPY . .

# Generate the build of the application
RUN ng build --prod

# Stage 2: Serve app with nginx
FROM nginx:1.19.10-alpine

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy the build output to replace the default nginx contents
COPY --from=build /app/dist /usr/share/nginx/html

# Copy the custom nginx configuration
COPY ./nginx-custom.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
