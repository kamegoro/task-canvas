# task-canvas

### システム構成

![task-canvas システム構成図](./docs/architecture.png)

同じアプリケーションコードを、本番想定のAWS(ECS Fargate + RDS, [aws-infrastructure](https://github.com/kamegoro/aws-infrastructure))と、ローカル開発/CI E2EのKubernetes([k8s-infrastructure](https://github.com/kamegoro/k8s-infrastructure))という2つの独立したデプロイ先で動かしています(相互接続なし)。frontend(Next.js)がBFFとしてbackend(Go)を呼び出し、backendがPostgreSQLを読み書きします。task-canvas-progressはブラウザから直接読み込まれる独立した表示コンポーネントで、BFFを経由しません。task-canvas-tag-manager / task-canvas-profileは同じDBに接続する設計のみ存在し、まだ配線されていません。

編集用のソースは [docs/architecture.drawio](./docs/architecture.drawio)([draw.io](https://app.diagrams.net/)で開けます)。

### Upgrade Guide

- [Node.js](./docs/node-upgrade.md)
- [Golang](./docs//golang-upgrade.md)
