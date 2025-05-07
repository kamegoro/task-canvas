FROM golang:1.24.3-alpine3.21

WORKDIR /backend

RUN apk update && apk add git

COPY . .

RUN go install github.com/air-verse/air@latest

RUN go mod download

EXPOSE 8080

CMD ["air", "-c", ".air.toml"]