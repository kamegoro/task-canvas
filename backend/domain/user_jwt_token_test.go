package domain

import (
	"testing"
	"time"

	"github.com/google/uuid"
)

func TestNewUserJwtToken(t *testing.T) {
	userIdUuid := uuid.New()
	userId := UserId(userIdUuid)

	type args struct {
		userId *UserId
	}
	tests := []struct {
		name    string
		args    args
		want    UserJwtToken
		wantErr bool
	}{
		{
			name: "JWT_SECRETが取得できない場合はエラーを返す",
			args: args{
				userId: &userId,
			},
			want:    "",
			wantErr: true,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got, err := NewUserJwtToken(tt.args.userId)
			if (err != nil) != tt.wantErr {
				t.Errorf("NewUserJwtToken() error = %v, wantErr %v", err, tt.wantErr)
				return
			}
			if got != tt.want {
				t.Errorf("NewUserJwtToken() = %v, want %v", got, tt.want)
			}
		})
	}
}

func TestUserJwtToken_ValidateJWT(t *testing.T) {
	t.Setenv("JWT_SECRET", "test_secret")

	validUserId := NewUserId()

	validToken, _ := NewUserJwtToken(&validUserId)

	time.Sleep(1 * time.Second)

	tests := []struct {
		name    string
		tr      UserJwtToken
		want    *UserId
		wantErr bool
	}{
		{
			name:    "有効なトークンの場合はユーザーIDを返す",
			tr:      validToken,
			want:    &validUserId,
			wantErr: false,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got, err := tt.tr.ValidateJWT()
			if (err != nil) != tt.wantErr {
				t.Errorf("UserJwtToken.ValidateJWT() error = %v, wantErr %v", err, tt.wantErr)
				return
			}
			if got != nil && tt.want != nil && *got != *tt.want {
				t.Errorf("UserJwtToken.ValidateJWT() = %v, want %v", got, tt.want)
			}
		})
	}
}
