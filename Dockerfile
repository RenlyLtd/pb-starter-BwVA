
FROM alpine:latest as download

RUN apk add curl

RUN curl -s https://get-latest.deno.dev/pocketbase/pocketbase?no-v=true >> tag.txt

RUN wget https://github.com/pocketbase/pocketbase/releases/download/v$(cat tag.txt)/pocketbase_$(cat tag.txt)_linux_amd64.zip \
    && unzip pocketbase_$(cat tag.txt)_linux_amd64.zip \
    && chmod +x /pocketbase

FROM alpine:latest

RUN apk update && apk add --update git build-base ca-certificates && rm -rf /var/cache/apk/*

COPY --from=download /pocketbase /usr/local/bin/pocketbase

# Create a startup script
COPY start.sh /usr/local/bin/start.sh
RUN chmod +x /usr/local/bin/start.sh

# Copy hooks to a temporary location
COPY ./pb_hooks /tmp/pb_hooks
COPY ./pb_migrations /tmp/pb_migrations

EXPOSE 8090

ENTRYPOINT ["/usr/local/bin/start.sh"]
