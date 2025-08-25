#!/bin/bash

echo "🚀 日時整形マン 開発サーバーを起動します..."
echo "📁 ポート3000でローカルサーバーを起動中..."

# ローカルサーバーを起動
python3 -m http.server 3000

echo ""
echo "✅ サーバーが起動しました！"
echo "🌐 アプリケーション: http://localhost:3000"
echo ""
echo "🛑 サーバーを停止するには: Ctrl+C"
