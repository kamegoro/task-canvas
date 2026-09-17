FROM golang:1.27.1-alpine3.24

WORKDIR /backend

RUN apk update && apk add git

COPY . .

RUN go install github.com/air-verse/air@latest

RUN go mod download

EXPOSE 8080

CMD ["air", "-c", ".air.toml"]