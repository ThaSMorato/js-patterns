docker run \
  --name postgres \
  -e POSTGRES_USER=thalesmorato \
  -e POSTGRES_PASSWORD="senha123" \
  -e POSTGRES_DB=heroes \
  -p 5432:5432 \
  -d \
  postgres

docker exec -it postgres psql --username thalesmorato --dbname heroes
CREATE TABLE warriors(id serial PRIMARY KEY, name VARCHAR (255) NOT NULL);
SELECT * FROM warriors;

docker run \
  --name mongodb \
  -e MONGO_INITDB_ROOT_USERNAME=thalesmorato \
  -e MONGO_INITDB_ROOT_PASSWORD=senha123 \
  -p 27017:27017 \
  -d \
  mongo:4