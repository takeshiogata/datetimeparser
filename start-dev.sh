#!/bin/bash

echo "🚀 開発サーバーを起動します..."
echo "📁 ポート3000でローカルサーバーを起動中..."

# ローカルサーバーを起動
python3 -m http.server 3000

echo ""
echo "✅ サーバーが起動しました！"
echo "🌐 メインアプリ: http://localhost:3000/index.html"
echo "🐛 デバッグページ: http://localhost:3000/debug.html"
echo ""
echo "🛑 サーバーを停止するには: Ctrl+C"
