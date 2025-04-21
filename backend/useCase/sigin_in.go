package useCase

import (
	"context"
	"task-canvas/domain"
	"task-canvas/logger"
	"task-canvas/port"
)

type SignInUseCase struct {
	userPort port.UserPort
}

func NewSignInUseCase(userPort port.UserPort) *SignInUseCase {
	return &SignInUseCase{
		userPort: userPort,
	}
}

func (u *SignInUseCase) Exec(ctx context.Context, email domain.Email, password domain.Password) (*domain.UserId, error) {
	users, err := u.userPort.FindByEmail(ctx, email)
	if err != nil {
		logger.Logger.Error("signInUseCase: Failed to find user by email", "email", email)
		return nil, domain.ErrUserNotFound
	}

	if len(users.Values) == 0 {
		logger.Logger.Warn("User not found", "email", email)
		return nil, domain.ErrUserNotFound
	}

	user := users.Values[0]

	if !user.PasswordHash.ComparePasswordHash(password) {
		logger.Logger.Warn("Password mismatch", "email", email)
		return nil, domain.ErrPasswordIncorrect
	}

	return &user.Id, nil
}
