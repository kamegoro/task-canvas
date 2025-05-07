package useCase

import (
	"context"
	"task-canvas/domain"
	"task-canvas/port"
)

type GetUsersMeUseCase struct {
	userPort port.UserPort
}

func NewGetUsersMeUseCase(userPort port.UserPort) *GetUsersMeUseCase {
	return &GetUsersMeUseCase{
		userPort: userPort,
	}
}

func (g *GetUsersMeUseCase) Exec(ctx context.Context, userId domain.UserId) (*domain.User, error) {
	user, err := g.userPort.FindById(ctx, &userId)
	if err != nil {
		return &domain.User{}, err
	}

	return user, nil
}
