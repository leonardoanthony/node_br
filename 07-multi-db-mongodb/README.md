docker run \
    --name postgres \
    -e POSTGRES_USER=leonardoanthony \
    -e POSTGRES_PASSWORD=senhasenhamsm \
    -e POSTGRES_DB=heroes \
    -p 5432:5432 \
    -d \
    postgres

docker exec -it postgres /bin/bash
docker run  --rm -ti postgres sh


docker run \
    --name adminer \
    -p 8080:8080 \
    --link postgres:postgres \
    -d \
    adminer


docker run \
    --name mongodb \
    -p 27017:27017 \
    -e MONGO_INITDB_ROOT_USERNAME=admin \
    -e MONGO_INITDB_ROOT_PASSWORD=senhadmin \
    -d \
    mongo

docker run \
    --name mongoclient \
    -p 3000:3000 \
    --link mongodb:mongodb \
    -d \
    mongoclient/mongoclient

docker exec -it mongodb \
    mongosh --host localhost -u admin -p senhadmin --authenticationDatabase admin \
    --eval "db.getSiblingDB('herois').createUser({user: 'leonardoanthony', pwd:'senhasenhamsm', roles: [{role: 'readWrite', db: 'herois'}]})"