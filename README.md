https://scotch.io/tutorials/create-a-mean-app-with-angular-2-and-docker-compose
DOCKER COMPOSE
docker-compose up --build
docker-compose down --rmi local

SERVER
docker build -t wedding-server ./wedding-server
docker run -p 4000:4000 wedding-server
docker stop wedding-server

UI
docker build -t wedding-ui ./wedding-ui
docker run -it -p 3000:3000 -v C:\Users\Jesse\dev\wedding-docapp\wedding-ui/src:/sedovic-ginnever-wedding-webapp/src wedding-ui
