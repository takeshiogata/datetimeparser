import { CONFIG } from './config.js';

/**
 * 日付処理を担当するクラス
 */
export class DateFormatter {
    /**
     * 日付が妥当かどうかをチェックする
     * @param {number} year - 年
     * @param {number} month - 月
     * @param {number} day - 日
     * @returns {boolean} - 妥当な日付かどうか
     */
    static isValidDate(year, month, day) {
        if (year < CONFIG.yearRange.min || year > CONFIG.yearRange.max) {
            return false;
        }
        
        const date = new Date(year, month - 1, day);
        return !isNaN(date.getTime()) && 
               date.getFullYear() === year && 
               date.getMonth() === month - 1 && 
               date.getDate() === day;
    }

    /**
     * 日付を日本語形式にフォーマットする
     * @param {number} year - 年
     * @param {number} month - 月
     * @param {number} day - 日
     * @returns {string} - フォーマットされた日付
     */
    static formatDate(year, month, day) {
        const date = new Date(year, month - 1, day);
        const dayOfWeek = CONFIG.weekdays[date.getDay()];
        return `${year}年${month}月${day}日（${dayOfWeek}）`;
    }

    /**
     * 月日を日本語形式にフォーマットする（年は現在年を使用）
     * @param {number} month - 月
     * @param {number} day - 日
     * @param {number} [currentYear] - 現在年（省略時は今年）
     * @returns {string} - フォーマットされた月日
     */
    static formatMonthDay(month, day, currentYear = new Date().getFullYear()) {
        const date = new Date(currentYear, month - 1, day);
        const dayOfWeek = CONFIG.weekdays[date.getDay()];
        return `${month}月${day}日（${dayOfWeek}）`;
    }

    /**
     * 今日の日付情報を取得する
     * @returns {Object} - 日付情報オブジェクト
     */
    static getTodayInfo() {
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth() + 1;
        const day = today.getDate();
        const dayOfWeek = CONFIG.weekdays[today.getDay()];
        
        return {
            year,
            month,
            day,
            dayOfWeek,
            formatted: `${year}年${month}月${day}日（${dayOfWeek}）`
        };
    }
} 