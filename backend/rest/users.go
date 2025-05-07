package rest

import (
	"net/http"
	"task-canvas/config"
	"task-canvas/domain"
	db_driver "task-canvas/driver"
	"task-canvas/gateway"
	"task-canvas/logger"
	"task-canvas/useCase"

	"github.com/google/uuid"
	"github.com/labstack/echo/v4"
)

type User struct {
	Id    string `json:"id"`
	Email string `json:"email"`
}

type ResponseUser struct {
	User User `json:"user"`
}

func GetUsersMe(c echo.Context) error {
	taskCanvasDriver := db_driver.NewQuerier(config.PgPool)
	userGateway := gateway.NewUserGateway(taskCanvasDriver)
	getUsersMeUseCase := useCase.NewGetUsersMeUseCase(userGateway)

	userIdStr := c.Get("userId").(string)

	uuidUserId, err := uuid.Parse(userIdStr)
	if err != nil {
		logger.Logger.Error("Failed to bind release: " + err.Error())
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}

	user, err := getUsersMeUseCase.Exec(c.Request().Context(), domain.UserId(uuidUserId))
	if err != nil {
		logger.Logger.Error("Failed to bind release: " + err.Error())
		return echo.NewHTTPError(http.StatusBadRequest, err.Error())
	}

	res := ResponseUser{
		User: User{
			Id:    uuid.UUID(user.Id).String(),
			Email: string(user.Email),
		},
	}

	return c.JSON(http.StatusOK, res)
}
