# Getting Started

TBD

# Local database setup

1. Use docker compose:

```bash
docker-compose up -d
```

2. Add the following environment variables to your `.env` file:

```bash
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/postgres
```


# Docker build

```bash
docker build -t <image-name> .
```

# Docker run

```bash
docker run -p 3000:3000 <image-name> --env-file .env
```

If you changed the port in the `.env` file, make sure to change the port in the `docker run` command as well.
