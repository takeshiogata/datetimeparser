import { CONFIG } from './config.js';

/**
 * UI操作を担当するクラス
 */
export class UIManager {
    constructor() {
        this.elements = this._getDOMElements();
        this.messageTimeout = null;
    }

    /**
     * DOM要素を取得する
     * @private
     */
    _getDOMElements() {
        const requiredElements = [
            'inputDates', 'outputDates', 'copyButton', 
            'clearButton', 'messageBox', 'todaysDate', 'todaysWeekday', 'versionInfo'
        ];

        const elements = {};
        
        for (const id of requiredElements) {
            const element = document.getElementById(id);
            if (!element) {
                throw new Error(`Required element with id '${id}' not found`);
            }
            elements[id] = element;
        }

        return elements;
    }

    /**
     * 入力テキストを取得する
     * @returns {string} - 入力テキスト
     */
    getInputText() {
        return this.elements.inputDates.value;
    }

    /**
     * 出力テキストを設定する
     * @param {string} text - 出力テキスト
     */
    setOutputText(text) {
        this.elements.outputDates.value = text;
    }

    /**
     * 出力テキストを取得する
     * @returns {string} - 出力テキスト
     */
    getOutputText() {
        return this.elements.outputDates.value;
    }

    /**
     * 入力・出力エリアをクリアする
     */
    clearAll() {
        this.elements.inputDates.value = '';
        this.elements.outputDates.value = '';
        this.elements.inputDates.focus();
    }

    /**
     * フィードバックメッセージを表示する
     * @param {string} message - 表示するメッセージ
     * @param {number} [duration] - 表示時間（ミリ秒）
     */
    showMessage(message, duration = CONFIG.messageDuration) {
        if (this.messageTimeout) {
            clearTimeout(this.messageTimeout);
        }

        this.elements.messageBox.textContent = message;
        this.elements.messageBox.classList.add('show');
        
        this.messageTimeout = setTimeout(() => {
            this.elements.messageBox.classList.remove('show');
            this.messageTimeout = null;
        }, duration);
    }

    /**
     * 今日の日付情報を表示する
     * @param {Object} todayInfo - 日付情報オブジェクト
     */
    displayTodayInfo(todayInfo) {
        this.elements.todaysDate.textContent = `今日の日付: ${todayInfo.year}年${todayInfo.month}月${todayInfo.day}日`;
        this.elements.todaysWeekday.textContent = ` (${todayInfo.dayOfWeek})`;
    }

    /**
     * バージョン情報を表示する
     */
    displayVersionInfo() {
        this.elements.versionInfo.textContent = `v${CONFIG.app.version}`;
    }

    /**
     * クリップボードにテキストをコピーする
     * @param {string} text - コピーするテキスト
     * @returns {Promise<boolean>} - コピーが成功したかどうか
     */
    async copyToClipboard(text) {
        if (!text) {
            this.showMessage(CONFIG.messages.noContent);
            return false;
        }

        if (navigator.clipboard && navigator.clipboard.writeText) {
            try {
                await navigator.clipboard.writeText(text);
                this.showMessage(CONFIG.messages.copySuccess);
                return true;
            } catch (error) {
                console.error('Clipboard API failed:', error);
                return this._fallbackCopy(text);
            }
        }
        return this._fallbackCopy(text);
    }

    /**
     * フォールバック用のコピー処理
     * @private
     */
    _fallbackCopy(text) {
        try {
            this.elements.outputDates.select();
            const success = document.execCommand('copy');
            
            if (success) {
                this.showMessage(CONFIG.messages.copySuccess);
                return true;
            } else {
                throw new Error('execCommand failed');
            }
        } catch (error) {
            console.error('Fallback copy failed:', error);
            this.showMessage(CONFIG.messages.copyFailed);
            return false;
        }
    }

    /**
     * イベントリスナーを設定する
     * @param {Object} handlers - イベントハンドラーオブジェクト
     */
    setupEventListeners(handlers) {
        if (handlers.onInput) {
            this.elements.inputDates.addEventListener('input', handlers.onInput);
        }

        if (handlers.onCopy) {
            this.elements.copyButton.addEventListener('click', handlers.onCopy);
        }

        if (handlers.onClear) {
            this.elements.clearButton.addEventListener('click', handlers.onClear);
        }

        if (handlers.onLoad) {
            window.addEventListener('load', handlers.onLoad);
        }
    }
}