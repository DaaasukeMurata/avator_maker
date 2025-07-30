# 🎨 Avatar Maker - Render Demo App

Renderのデモンストレーション用のアバター生成Webアプリケーションです。名前とキーワードを入力するだけで、オリジナルのSVGアバターを自動生成できます。

## 🚀 特徴

- **簡単操作**: 名前とキーワードを入力するだけでアバター生成
- **SVG形式**: 軽量でスケーラブルなベクター形式
- **レスポンシブデザイン**: PC・スマートフォン対応
- **ダウンロード機能**: 生成したアバターをSVGファイルとして保存
- **再生成機能**: 同じパラメータで異なるデザインのアバターを生成
- **軽量**: Renderの無料枠でも快適に動作

## 🎯 デモで伝えるRenderの利点

1. **GitHubにpushするだけで自動デプロイ** - CI/CDが簡単
2. **環境変数の設定がRender上で簡単** - Web UIから設定可能
3. **WebHook設定不要で自動反映** - Renderの特長
4. **独自ドメインとHTTPS** - すぐに使える本格的な公開環境

## 🛠 技術スタック

- **フロントエンド**: HTML, CSS, Vanilla JavaScript
- **バックエンド**: Node.js + Express
- **アバター生成**: SVGベースの生成アルゴリズム
- **デプロイ**: Render

## 📁 プロジェクト構造

```
avator_maker/
├── CLAUDE.md              # プロジェクト情報
├── README.md              # このファイル
├── package.json           # Node.js依存関係
├── server.js              # Expressサーバー
└── public/                # 静的ファイル
    ├── index.html         # メインページ
    ├── styles.css         # スタイルシート
    ├── app.js             # フロントエンドロジック
    └── avatar-generator.js # アバター生成エンジン
```

## 🚀 ローカル開発

### 前提条件
- Node.js 16.0.0以上

### インストールと実行

```bash
# 依存関係のインストール
npm install

# サーバー起動
npm start
```

アプリケーションは `http://localhost:3000` で利用できます。

### デモモード
URLに `?demo=true` を追加すると、自動的にサンプルデータが入力されます:
`http://localhost:3000?demo=true`

## 🌐 Renderでのデプロイ手順

### 1. GitHubリポジトリの準備
```bash
git init
git add .
git commit -m "Initial commit - Avatar Maker for Render Demo"
git remote add origin git@github.com:DaaasukeMurata/avator_maker.git
git push -u origin main
```

### 2. Renderでのデプロイ設定

1. [Render](https://render.com)にアカウント登録・ログイン
2. 「New +」→「Web Service」を選択
3. GitHubリポジトリを連携: `git@github.com:DaaasukeMurata/avator_maker.git`
4. 以下の設定を入力:
   - **Name**: `avatar-maker-demo`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free` (デモ用)

### 3. 環境変数の設定（必要に応じて）
- `NODE_ENV`: `production`
- `PORT`: 自動設定（通常は設定不要）

### 4. デプロイ実行
「Create Web Service」をクリックすると自動デプロイが開始されます。

## ✨ 使い方

1. **名前を入力**: あなたの名前を入力してください
2. **キーワードを入力**: 「猫,青,メガネ」のようにカンマ区切りでキーワードを入力
3. **生成ボタンをクリック**: 「アバターを生成」ボタンを押す
4. **アバターを確認**: 生成されたアバターが表示されます
5. **ダウンロード**: 気に入ったら「SVGをダウンロード」でファイル保存
6. **再生成**: 「再生成」ボタンで異なるデザインを試す

## 🎨 カスタマイズ要素

アバターは以下の要素を自動的に組み合わせて生成されます：

- **肌の色**: 10色のカラーパレット
- **髪型**: ストレート、カーリー、スパイキー、ロング等
- **髪の色**: 10色のカラーパレット
- **表情**: ハッピー、シリアス、サプライズ、ウィンク等
- **目の色**: 10色のカラーパレット
- **アクセサリー**: メガネ、帽子、イヤリング等

## 🔧 カスタマイズ方法

### 新しいアクセサリーを追加
`public/avatar-generator.js`の`generateAccessory`メソッドに新しいケースを追加:

```javascript
case 'necklace':
    return `<ellipse cx="150" cy="200" rx="30" ry="5" fill="#FFD700" stroke="#333" stroke-width="2"/>`;
```

### 新しい髪型を追加
`generateHair`メソッドに新しいスタイルを追加できます。

### カラーパレットの変更
`colors`配列を編集して、好みの色に変更できます。

## 📊 パフォーマンス

- **軽量**: 全アセット合計 < 50KB
- **高速**: サーバーサイド処理なし（フロントエンドのみ）
- **スケーラブル**: SVG形式で任意のサイズに対応

## 🤝 貢献

このプロジェクトはRenderのデモ用に作成されました。改善提案や機能追加のアイデアがありましたら、Issueを作成してください。

## 📄 ライセンス

MIT License

---

**Render Demo Point**: このアプリケーションは、GitHubへのプッシュだけで自動的にRenderにデプロイされ、すぐに世界中からアクセス可能になります！ 🌍