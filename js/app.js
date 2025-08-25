import { CONFIG } from './config.js?v=1.2.6';
import { DateFormatter } from './date-formatter.js?v=1.2.6';
import { DateTimeParser } from './datetime-parser.js?v=1.2.6';
import { UIManager } from './ui-manager.js?v=1.2.6';

/**
 * 日時整形アプリケーションのメインクラス
 */
export class DateTimeFormatterApp {
    constructor() {
        this.parser = new DateTimeParser();
        this.uiManager = new UIManager();
        this.isInitialized = false;
    }

    /**
     * アプリケーションを初期化する
     */
    async init() {
        try {
            this._setupUI();
            this._setupEventHandlers();
            this._displayInitialInfo();
            this.isInitialized = true;
            console.log('日時整形アプリケーションが初期化されました');
        } catch (error) {
            console.error('アプリケーションの初期化に失敗しました:', error);
            this.uiManager.showMessage('アプリケーションの初期化に失敗しました');
        }
    }

    /**
     * UIの初期設定
     * @private
     */
    _setupUI() {
        const todayInfo = DateFormatter.getTodayInfo();
        this.uiManager.displayTodayInfo(todayInfo);
        this.uiManager.displayVersionInfo();
        
        // パーサーの現在年を更新
        this.parser.updateCurrentYear(todayInfo.year);
    }

    /**
     * イベントハンドラーを設定する
     * @private
     */
    _setupEventHandlers() {
        this.uiManager.setupEventListeners({
            onInput: () => this._handleInput(),
            onCopy: () => this._handleCopy(),
            onClear: () => this._handleClear(),
            onLoad: () => this._handleLoad()
        });
    }

    /**
     * 初期情報を表示する
     * @private
     */
    _displayInitialInfo() {
        // 初期入力があれば処理する
        this._processInput();
    }

    /**
     * 入力イベントハンドラー
     * @private
     */
    _handleInput() {
        this._processInput();
    }

    /**
     * コピーイベントハンドラー
     * @private
     */
    async _handleCopy() {
        const outputText = this.uiManager.getOutputText();
        await this.uiManager.copyToClipboard(outputText);
    }

    /**
     * クリアイベントハンドラー
     * @private
     */
    _handleClear() {
        this.uiManager.clearAll();
        this.uiManager.showMessage(CONFIG.messages.cleared);
    }

    /**
     * ロードイベントハンドラー
     * @private
     */
    _handleLoad() {
        this._processInput();
    }

    /**
     * 入力テキストを処理して出力する
     * @private
     */
    _processInput() {
        try {
            const inputText = this.uiManager.getInputText();
            const formattedText = this.parser.formatText(inputText);
            this.uiManager.setOutputText(formattedText);
        } catch (error) {
            console.error('テキスト処理中にエラーが発生しました:', error);
            this.uiManager.showMessage('処理中にエラーが発生しました');
        }
    }

    /**
     * 現在年を更新する（年が変わった時に呼び出す）
     * @param {number} [year] - 新しい年（省略時は現在年）
     */
    updateCurrentYear(year) {
        const newYear = year || new Date().getFullYear();
        this.parser.updateCurrentYear(newYear);
        
        const todayInfo = DateFormatter.getTodayInfo();
        this.uiManager.displayTodayInfo(todayInfo);
    }

    /**
     * アプリケーションの状態を取得する
     * @returns {Object} - アプリケーションの状態
     */
    getStatus() {
        return {
            isInitialized: this.isInitialized,
            currentYear: this.parser.currentYear,
            inputLength: this.uiManager.getInputText().length,
            outputLength: this.uiManager.getOutputText().length
        };
    }
}

// グローバルに利用可能にする（必要に応じて）
window.DateTimeFormatterApp = DateTimeFormatterApp; 