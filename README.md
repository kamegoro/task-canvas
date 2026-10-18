# task-canvas

### システム構成

![task-canvas システム構成図](./docs/architecture.png)

ローカル開発 / CI E2E 環境([k8s-infrastructure](https://github.com/kamegoro/k8s-infrastructure)がHelm+Skaffoldでデプロイ)の構成です。frontend(Next.js)がBFFとしてbackend(Go)を呼び出し、backendがPostgreSQLを読み書きします。task-canvas-progressはマイクロフロントエンドとして、BFFを経由せずブラウザから直接読み込まれます。task-canvas-tag-manager / task-canvas-profileは同じDBに接続する設計のみ存在し、まだ配線されていません。

本番はAWS([aws-infrastructure](https://github.com/kamegoro/aws-infrastructure)、ECS Fargate + RDS)上で別途稼働しています。

編集用のソースは [docs/architecture.drawio](./docs/architecture.drawio)([draw.io](https://app.diagrams.net/)で開けます)。

### Upgrade Guide

- [Node.js](./docs/node-upgrade.md)
- [Golang](./docs//golang-upgrade.md)
