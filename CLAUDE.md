# CLAUDE.md

このファイルはClaude Codeが使用するプロジェクト情報を含んでいます。

## プロジェクト概要

🎨 **Avatar Maker** - Renderのデモを行うためのアバター生成Webアプリケーション

### 実装済み機能
- **名前・キーワード入力**でオリジナルSVGアバター生成
- **レスポンシブUI**（PC・スマートフォン対応）
- **SVGダウンロード機能**
- **再生成機能**
- **アニメーション付きUI**

### 技術スタック
- **フロントエンド**: HTML + CSS + Vanilla JavaScript
- **バックエンド**: Node.js + Express
- **アバター生成**: SVG（軽量でスケーラブル）
- **デプロイ**: Render対応

### デモで伝えるRenderの利点
- ✅ GitHubにpushすると自動でデプロイされる（CI/CDが簡単）
- ✅ 環境変数の設定がRender上で簡単にできる  
- ✅ WebHook設定不要でも自動反映（Renderの特長）
- ✅ 独自ドメインやhttpsもすぐ使える（簡単な公開）
- ✅ 軽量でRenderの無料枠でも快適動作

### 起動方法
```bash
npm install
npm start
# http://localhost:3000 でアクセス
```

### GitHubリポジトリ
git@github.com:DaaasukeMurata/avator_maker.git

### プロジェクト構造
```
avator_maker/
├── CLAUDE.md              # このファイル
├── README.md              # 詳細なドキュメント
├── package.json           # Node.js設定
├── server.js              # Expressサーバー
└── public/                # フロントエンド
    ├── index.html         # メインページ
    ├── styles.css         # スタイル
    ├── app.js             # UI制御
    └── avatar-generator.js # アバター生成エンジン
```

