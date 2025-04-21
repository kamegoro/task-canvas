package rest

import (
	"net/http"
	"task-canvas/config"
	"task-canvas/domain"
	db_driver "task-canvas/driver"
	"task-canvas/gateway"
	"task-canvas/logger"
	"task-canvas/useCase"

	"github.com/labstack/echo/v4"
)

type PostSignInRequest struct {
	Email    string `json:"email" validate:"required,email"`
	Password string `json:"password" validate:"required"`
}

func PostSignIn(ctx echo.Context) error {
	req := new(PostSignInRequest)
	if err := ctx.Bind(req); err != nil {
		logger.Logger.Error("Failed to bind request", "error", err.Error())
		return ctx.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}
	if err := ctx.Validate(req); err != nil {
		logger.Logger.Error("Validation failed", "error", err.Error())
		return ctx.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	dbDriver := db_driver.NewQuerier(config.PgPool)
	userGateway := gateway.NewUserGateway(dbDriver)
	signInUseCase := useCase.NewSignInUseCase(userGateway)
	generateJwtUseCase := useCase.NewGenerateJwtUseCase()

	echoCtx := ctx.Request().Context()

	userId, err := signInUseCase.Exec(echoCtx, domain.Email(req.Email), domain.Password(req.Password))
	if err != nil {
		logger.Logger.Error("Sign-in failed", "error", err.Error())
		return ctx.JSON(http.StatusBadRequest, map[string]string{"error": err.Error()})
	}

	jwtToken, err := generateJwtUseCase.Exec(*userId)
	if err != nil {
		logger.Logger.Error("Failed to generate JWT", "error", err.Error())
		return ctx.JSON(http.StatusInternalServerError, map[string]string{"error": err.Error()})
	}

	ctx.Response().Header().Set("Authorization", "Bearer "+string(jwtToken))

	return ctx.NoContent(http.StatusOK)
}
