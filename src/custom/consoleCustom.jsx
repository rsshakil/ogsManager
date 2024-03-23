//通常時は"debug=******"で切り替える
//出荷後は常時ログは出ないようにする
//出荷後に表示されるログは要調整


/* 
 * ログ関数上書き関数 
 */
function initLogger(debugModeState) { 
// export const initLogger = (debugModeState) => {
    const DEBUG_MODE = debugModeState; //本番はこれ切り替える
    //trueのときのみデバッグログを出力する
    var _warn = console.warn; 
    var _error = console.error; 
    var _debug = console.debug; 
    var _info = console.info; 
    var _log = console.log; 
  
    // デバッグログはデバックモードのみ出力 
    console.debug = function () { 
        if (DEBUG_MODE === true) { 
            arguments[0] = "[DEBUG] " + arguments[0]; //第1引数(メッセージ）の前にログレベルを出力
            _debug.apply(console, arguments);
        } 
    } 

    // logログはデバックモードのみ出力 
    console.log = function () { 
        if (DEBUG_MODE === true) { 
            arguments[0] = "[LOG] " + arguments[0]; //第1引数(メッセージ）の前にログレベルを出力
            _log.apply(console, arguments);
        } 
    } 

    // INFOログ 
    console.info = function () { 
        if (DEBUG_MODE === true) { 
            arguments[0] = "[INFO] " + arguments[0]; //第1引数(メッセージ）の前にログレベルを出力
            _info.apply(console, arguments);
        } 
    } 

    // WARNログ 
    console.warn = function () { 
        if (DEBUG_MODE === true) { 
            arguments[0] = "[WARN] " + arguments[0]; //第1引数(メッセージ）の前にログレベルを出力
            _warn.apply(console, arguments);
        } 
    } 
 
    // ERRORログ 
    console.error = function () { 
        arguments[0] = "[ERROR] " + arguments[0]; //第1引数(メッセージ）の前にログレベルを出力
        _error.apply(console, arguments);
    } 


}
export default initLogger;
