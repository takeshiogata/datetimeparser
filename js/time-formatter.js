import { CONFIG } from './config.js';

/**
 * 時刻処理を担当するクラス
 */
export class TimeFormatter {
    /**
     * 時刻として妥当かどうかをチェックする
     * @param {string} timeStr - 4桁の時刻文字列（例: "1200"）
     * @returns {boolean} - 妥当な時刻かどうか
     */
    static isValidTime(timeStr) {
        if (timeStr.length !== 4) {
            return false;
        }
        
        const hour = parseInt(timeStr.substring(0, 2), 10);
        const minute = parseInt(timeStr.substring(2, 4), 10);
        
        return Number.isInteger(hour) && 
               Number.isInteger(minute) &&
               hour >= CONFIG.timeRange.hour.min && 
               hour <= CONFIG.timeRange.hour.max && 
               minute >= CONFIG.timeRange.minute.min && 
               minute <= CONFIG.timeRange.minute.max;
    }

    /**
     * HH:MM形式の時刻が妥当かどうかをチェックする
     * @param {string} timeStr - HH:MM形式の時刻文字列
     * @returns {boolean} - 妥当な時刻かどうか
     */
    static isValidTimeWithColon(timeStr) {
        const parts = timeStr.split(':');
        if (parts.length !== 2) {
            return false;
        }
        
        const hour = parseInt(parts[0], 10);
        const minute = parseInt(parts[1], 10);
        
        return Number.isInteger(hour) && 
               Number.isInteger(minute) &&
               hour >= CONFIG.timeRange.hour.min && 
               hour <= CONFIG.timeRange.hour.max && 
               minute >= CONFIG.timeRange.minute.min && 
               minute <= CONFIG.timeRange.minute.max;
    }

    /**
     * 4桁の時刻文字列をHH:MM形式に変換する
     * @param {string} timeStr - 4桁の時刻文字列（例: "1200"）
     * @returns {string} - HH:MM形式の時刻
     */
    static formatTime(timeStr) {
        const hour = timeStr.substring(0, 2);
        const minute = timeStr.substring(2, 4);
        return `${hour}:${minute}`;
    }

    /**
     * 時刻範囲をフォーマットする
     * @param {string} startTime - 開始時刻
     * @param {string} endTime - 終了時刻
     * @returns {string} - フォーマットされた時刻範囲
     */
    static formatTimeRange(startTime, endTime) {
        return `${startTime}〜${endTime}`;
    }

    /**
     * 時刻の妥当性をチェックして、適切であればフォーマットする
     * @param {string} startTime - 開始時刻（4桁）
     * @param {string} endTime - 終了時刻（4桁）
     * @returns {string|null} - フォーマットされた時刻範囲または null
     */
    static formatTimeRangeIfValid(startTime, endTime) {
        if (this.isValidTime(startTime) && this.isValidTime(endTime)) {
            return this.formatTimeRange(
                this.formatTime(startTime), 
                this.formatTime(endTime)
            );
        }
        return null;
    }
} 