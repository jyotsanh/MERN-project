# use node:18 as base image
FROM node:18
# create a working directory
WORKDIR /app
# copy the package.json to our current working dir
COPY package*.json ./
# install all dependencies
RUN npm install
# copy all src code from backend
COPY . .
# Expose backend port
EXPOSE 8000

# run the backend server
CMD ["npm","run","bro"]