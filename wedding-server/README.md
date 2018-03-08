http://localhost:4000
docker build -t sedovic-ginnever-wedding-server ./sedovic-ginnever-wedding-server
docker run -d --name sedovic-ginnever-wedding-server -p 4000:4000 sedovic-ginnever-wedding-server
docker stop sedovic-ginnever-wedding-server