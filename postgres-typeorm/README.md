# Postgres-Typeorm

A simple sample CRUD application to test using Keploy build with Typeorm and Postgres.

## Setup application

Clone the repository and move to postgres-typeorm folder

```bash
git clone https://github.com/keploy/samples-typescript && cd samples-typescript/postgres-typeorm

# Install the dependencies
npm install
```

# Using Keploy :

There are two ways to use Keploy:-

1. [Using Docker](#running-sample-app-using-docker)

# Running sample app using docker

Keploy can be used on Linux & Windows through Docker, and on MacOS by the help of [Colima](https://docs.keploy.io/docs/server/macos/installation/#using-colima).

As of now there is only one ways to use Keploy eBPF in MacOS, i.e. [Natively using Colima](#using-colima).

# Using Colima

## Install Colima

You need to have the latest version of `brew` installed on your system and then run this command from a terminal:

```zsh
brew install colima
```

Start Colima with defaults

```zsh
colima start
```

### Creating Alias

We need to create a custom network for Keploy since we are using the Docker, therefore application container would require `docker network` to act as the bridge between them.

If you're using a **docker-compose network**, replace `keploy-network` with your app's `docker_compose_network_name` below.

```zsh
docker network create keploy-network
```

## Create Keploy Alias

We need create an alias for Keploy:

```bash
alias keploy='sudo docker run --pull always --name keploy-v2 -p 16789:16789 --privileged --pid=host -it -v "$(pwd)":/files -v /sys/fs/cgroup:/sys/fs/cgroup -v /sys/kernel/debug:/sys/kernel/debug -v /sys/fs/bpf:/sys/fs/bpf -v /var/run/docker.sock:/var/run/docker.sock --rm ghcr.io/keploy/keploy'
```

## Let's start the Postgres Instance

```bash
docker-compose up -d
```

## Capture the testcases

1. We first need to build dockerimage of our application:-

```bash
docker build -t postgres-app:1.0 .
```

2. Now we will run the keploy in record mode:-

```bash
keploy record -c "docker run -p 3000:3000 --name postgresTypeormApp --network keploy-network postgres-app:1.0"
```

#### Let's generate the testcases.

Make API Calls using [Hoppscotch](https://hoppscotch.io), [Postman](https://postman.com) or cURL command. Keploy with capture those calls to generate the test-suites containing testcases and data mocks.

```bash
curl --request POST \
--url http://localhost:3000/users \
   --header 'content-type: application/json' \
   --data '{
    "firstName":"Vikas",
    "lastName":"Rushi",
    "age":"20"
    }'
```

we will get the output:

```bash
{"firstName":"Vikas","lastName":"Rushi","age":"20","id":3}
```

## Running the testcases

```bash
keploy test -c "docker run -p 3000:3000 --name postgresTypeormApp --network keploy-network postgres-app:1.0" --delay 10
```
