# from base image node
FROM node:18.13.0-alpine3.16

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# copy oter files as well
RUN npm run build
COPY dist/server.js .

#expose the port
EXPOSE 3000

# command to run when intantiate an image
CMD ["node","dist/server.js"]