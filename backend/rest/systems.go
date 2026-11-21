package rest

import "github.com/labstack/echo/v5"

func Ping(c *echo.Context) error {
	return c.String(200, "pong")
}
