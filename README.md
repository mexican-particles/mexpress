# デプロイする前に
## 必要なコマンド
- aws cli  
- serverless framework

## .envのコピー
```
cp backend/.env.sample backend/.env
```

## 各種packegeのインストール
大量のnode_modulesを君の目で確かめてくれ
```bash
npm install
cd ./backend
npm install
```

# 便利コマンドリスト
## バックエンド

## クラウド上の環境更新
`--stage={ステージ名}` でdev以外のステージができます（ ローカルでの実行時は `backend/.env` のSTAGEを変えるのを忘れずに
AWS CLIで設定したdefault profileの環境にdynamoDBとLambdaなどがデプロイされます
```bash
sls deploy
```

### ローカルで動かす
nodemonとts-nodeでTypeScriptを編集して動かせます
※ DynamoDBは現時点ではローカルでは動かないので、ローカルのAPIサーバであっても永続化はAWS上のDynamoDBに行われます
```bash
cd backend
npm start
```

### lint
```bash
cd ./backend
npm run lint:fix
```

### test
メキシコにテストはない

## クラウド上の環境を消す
消す前にS3は空にしておこう
```bash
sls remove --stage {環境名} --region ap-northeast-1
```

