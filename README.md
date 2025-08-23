# 日時整形マン

日付と時刻の入力テキストを整形するシンプルなWebアプリケーションです。

## 機能

- 様々な形式の日時入力に対応
- 年を省略した入力（例：7/1）は現在の年で自動補完
- 整形された日程をコピー可能
- レスポンシブデザイン対応

## 使用方法

### ローカル開発

```bash
# 開発サーバーを起動
./start-dev.sh

# または直接実行
python3 -m http.server 3000
```

ブラウザで `http://localhost:3000` にアクセスしてください。

### 本番環境

GitHub Pagesで自動デプロイされます：
https://takeshiogata.github.io/datetimeparser/

## 技術構成

- **フロントエンド**: HTML5, CSS3, JavaScript (ES6 Modules)
- **スタイリング**: Tailwind CSS (CDN)
- **デプロイ**: GitHub Pages + GitHub Actions

## ファイル構成

```
datetimeparser/
├── index.html          # メインHTMLファイル
├── styles.css          # カスタムCSS
├── js/                 # JavaScriptモジュール
│   ├── app.js         # メインアプリケーション
│   ├── config.js      # 設定ファイル
│   ├── ui-manager.js  # UI管理
│   ├── date-formatter.js    # 日付整形
│   ├── datetime-parser.js   # 日時解析
│   └── time-formatter.js    # 時刻整形
├── start-dev.sh        # 開発サーバー起動スクリプト
└── .github/workflows/  # GitHub Actions設定
```

## ライセンス

MIT License 