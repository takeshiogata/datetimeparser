#!/bin/bash

# 開発用サーバー起動スクリプト（Vite + 静的HTML対応）
# 使用方法: ./start-dev-servers.sh

echo "🚀 開発サーバーを起動します..."

# datetimeparser プロジェクト（静的HTML、ポート3000）
echo "📁 datetimeparser をポート3000で起動..."
cd /Users/takeshi/Develop/datetimeparser
python3 -m http.server 3000 &
DATETIMEPARSER_PID=$!

# Viteプロジェクト（JSX、ポート5173）
echo "📁 Viteプロジェクト をポート5173で起動..."
# パスを実際のViteプロジェクトの場所に変更してください
cd /Users/takeshi/Develop/your-vite-project
npm run dev &
VITE_PID=$!

echo ""
echo "✅ 開発サーバーが起動しました！"
echo "🌐 datetimeparser (静的HTML): http://localhost:3000"
echo "🌐 Viteプロジェクト (JSX): http://localhost:5173"
echo ""
echo "🛑 サーバーを停止するには: Ctrl+C"

# プロセスを待機
wait
