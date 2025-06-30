/**
 * アプリケーションの設定値を管理するモジュール
 */
export const CONFIG = {
    // 曜日の配列
    weekdays: ['日', '月', '火', '水', '木', '金', '土'],
    
    // 年の有効範囲
    yearRange: { 
        min: 1900, 
        max: 2100 
    },
    
    // 時刻の有効範囲
    timeRange: { 
        hour: { min: 0, max: 23 }, 
        minute: { min: 0, max: 59 } 
    },
    
    // メッセージ表示時間（ミリ秒）
    messageDuration: 2000,
    
    // 正規表現パターン
    patterns: {
        // YYYY/MM/DD または YYYY-MM-DD 形式
        fullDate: /\b(\d{4})[-/](\d{1,2})[-/](\d{1,2})\b/g,
        
        // M/D または M-D 形式
        monthDay: /\b(0?[1-9]|1[0-2])[\/-](0?[1-9]|[12]?\d|3[01])\b/g,
        
        // 4桁時刻形式（HHMM-HHMM）
        timeRange4Digit: /\b(\d{4})-(\d{4})\b/g,
        
        // HH:MM-HH:MM 形式
        timeRangeColon: /(\d{2}:\d{2})-(\d{2}:\d{2})/g,
        
        // 単独の4桁数字（年として解釈）
        singleYear: /\b(\d{4})\b/g
    },
    
    // UIメッセージ
    messages: {
        copySuccess: 'コピーしました！ ✨',
        copyFailed: 'コピーに失敗しました 😢',
        cleared: 'クリアしました。',
        noContent: 'コピーする日程がありません。'
    }
}; 