package useCase

import (
	"context"
	"reflect"
	"task-canvas/domain"
	mock_port "task-canvas/mock/port"
	"task-canvas/port"
	"testing"

	"go.uber.org/mock/gomock"
)

func TestGetUsersMeUseCase_Exec(t *testing.T) {
	ctrl := gomock.NewController(t)
	defer ctrl.Finish()

	ctx := context.Background()
	mockUserPort := mock_port.NewMockUserPort(ctrl)

	userId := domain.NewUserId()

	user := domain.User{
		Id:           userId,
		Email:        domain.Email("test@example.com"),
		PasswordHash: domain.PasswordHash("password_hash"),
	}

	mockUserPort.EXPECT().FindById(ctx, &userId).Return(&user, nil)

	type fields struct {
		userPort port.UserPort
	}
	type args struct {
		ctx    context.Context
		userId domain.UserId
	}
	tests := []struct {
		name    string
		fields  fields
		args    args
		want    *domain.User
		wantErr bool
	}{
		{
			name: "ユーザーIDからユーザー情報を取得する",
			fields: fields{
				userPort: mockUserPort,
			},
			args: args{
				ctx:    ctx,
				userId: userId,
			},
			want:    &user,
			wantErr: false,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			g := &GetUsersMeUseCase{
				userPort: tt.fields.userPort,
			}
			got, err := g.Exec(tt.args.ctx, tt.args.userId)
			if (err != nil) != tt.wantErr {
				t.Errorf("GetUsersMeUseCase.Get() error = %v, wantErr %v", err, tt.wantErr)
				return
			}
			if !reflect.DeepEqual(got, tt.want) {
				t.Errorf("GetUsersMeUseCase.Get() = %v, want %v", got, tt.want)
			}
		})
	}
}
