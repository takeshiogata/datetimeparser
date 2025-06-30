import { CONFIG } from './config.js';
import { DateFormatter } from './date-formatter.js';
import { TimeFormatter } from './time-formatter.js';

/**
 * 日時の解析・整形を担当するクラス
 */
export class DateTimeParser {
    constructor() {
        this.currentYear = new Date().getFullYear();
    }

    /**
     * 1行の文字列をスマートに解析し、日付や時刻の部分だけを整形する
     * @param {string} line - 整形対象の1行の文字列
     * @returns {string} - 整形後の文字列
     */
    formatLine(line) {
        if (!line || typeof line !== 'string') {
            return '';
        }

        let formattedLine = line.trim();

        // 各パターンを順次適用
        formattedLine = this._replaceFullDateFormat(formattedLine);
        formattedLine = this._replaceMonthDayFormat(formattedLine);
        formattedLine = this._replace4DigitTimeRange(formattedLine);
        formattedLine = this._replaceColonTimeRange(formattedLine);
        formattedLine = this._replaceSingleYear(formattedLine);

        return formattedLine;
    }

    /**
     * 複数行のテキストを整形する
     * @param {string} text - 整形対象のテキスト
     * @returns {string} - 整形後のテキスト
     */
    formatText(text) {
        if (!text || typeof text !== 'string') {
            return '';
        }

        const lines = text.split('\n');
        const formattedLines = lines.map(line => this.formatLine(line));
        return formattedLines.join('\n');
    }

    /**
     * YYYY/MM/DD または YYYY-MM-DD 形式の日付を置換
     * @private
     */
    _replaceFullDateFormat(line) {
        return line.replace(CONFIG.patterns.fullDate, (match, year, month, day) => {
            const yearNum = parseInt(year, 10);
            const monthNum = parseInt(month, 10);
            const dayNum = parseInt(day, 10);
            
            if (DateFormatter.isValidDate(yearNum, monthNum, dayNum)) {
                return DateFormatter.formatDate(yearNum, monthNum, dayNum);
            }
            return match;
        });
    }

    /**
     * M/D または M-D 形式の日付を置換
     * @private
     */
    _replaceMonthDayFormat(line) {
        return line.replace(CONFIG.patterns.monthDay, (match, month, day) => {
            const monthNum = parseInt(month, 10);
            const dayNum = parseInt(day, 10);
            
            if (DateFormatter.isValidDate(this.currentYear, monthNum, dayNum)) {
                return DateFormatter.formatMonthDay(monthNum, dayNum, this.currentYear);
            }
            return match;
        });
    }

    /**
     * 4桁の時刻形式（HHMM-HHMM）を置換
     * @private
     */
    _replace4DigitTimeRange(line) {
        return line.replace(CONFIG.patterns.timeRange4Digit, (match, startTime, endTime) => {
            const formatted = TimeFormatter.formatTimeRangeIfValid(startTime, endTime);
            return formatted || match;
        });
    }

    /**
     * HH:MM-HH:MM 形式の時間を置換
     * @private
     */
    _replaceColonTimeRange(line) {
        return line.replace(CONFIG.patterns.timeRangeColon, (match, startTime, endTime) => {
            if (TimeFormatter.isValidTimeWithColon(startTime) && 
                TimeFormatter.isValidTimeWithColon(endTime)) {
                return TimeFormatter.formatTimeRange(startTime, endTime);
            }
            return match;
        });
    }

    /**
     * 単独の4桁数字を年として解釈
     * @private
     */
    _replaceSingleYear(line) {
        return line.replace(CONFIG.patterns.singleYear, (match, year, offset, string) => {
            const yearNum = parseInt(year, 10);
            
            if (yearNum >= CONFIG.yearRange.min && yearNum <= CONFIG.yearRange.max) {
                const beforeMatch = string.substring(0, offset);
                const afterMatch = string.substring(offset + match.length);
                
                // 既に「年」が付いている場合はスキップ
                if (beforeMatch.endsWith('年') || afterMatch.startsWith('年')) {
                    return match;
                }
                
                return `${yearNum}年`;
            }
            return match;
        });
    }

    /**
     * 現在年を更新する（年が変わった時に使用）
     * @param {number} year - 新しい年
     */
    updateCurrentYear(year) {
        if (typeof year === 'number' && 
            year >= CONFIG.yearRange.min && 
            year <= CONFIG.yearRange.max) {
            this.currentYear = year;
        }
    }
} 