# Crate Trends API

## Set up

### Local

- In the current directory, run `HOST=127.0.0.1 cargo run`. Then access `http://localhost:8080`. Default host is `0.0.0.0`
- You may setup custom port as well with `PORT=80`. Default port is `8080`. However, front page uses `8080` port, so you should use default port.

### Docker

- In the current directory, run `docker compose up` (`docker compose up -d` for background). Then access `http://localhost:8080`.
  - The docker image is depoyable on AWS Lambda

After starting a server, access `http://localhost:8080/up`. All set if you see `You're up!!` message.
