package main

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

const defaultPort = ":8080"

func main() {
	e := echo.New()
	e.GET("/", func(c echo.Context) error {
		return c.String(http.StatusOK, "Hello, World")
	})
	e.GET("/TODO", func(c echo.Context) error {
		return c.String(http.StatusOK, "TODOが投げられました")
	})

	e.Logger.Fatal(e.Start(defaultPort))
}
