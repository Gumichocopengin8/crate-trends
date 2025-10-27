FROM rust:1.90.0-slim-trixie AS builder
RUN apt-get update && apt-get install -y pkg-config libssl-dev
WORKDIR /app
COPY . .
RUN cargo build --release

FROM public.ecr.aws/amazonlinux/amazonlinux:2023-minimal
RUN dnf install -y openssl
COPY --from=public.ecr.aws/awsguru/aws-lambda-adapter:0.9.1 /lambda-adapter /opt/extensions/lambda-adapter
COPY --from=builder /app/target/release/crate_trends_api /app
CMD ["/app"]
