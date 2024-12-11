# Getting Started

TBD


# Docker build

```bash
docker build -t <image-name> .
```

# Docker run

```bash
docker run -p 3000:3000 <image-name> --env-file .env
```

If you changed the port in the `.env` file, make sure to change the port in the `docker run` command as well.
