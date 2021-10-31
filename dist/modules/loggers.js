import * as fs from 'fs';
import Utils from './utils.js';
import { gray, green, blue, red, white } from 'colorette';
var getTime = function () {
    var time = Utils.Time();
    return {
        YMD: time.year + "-" + Utils.PadWithZeros(time.month, 2) + "-" + Utils.PadWithZeros(time.date, 2),
        HMS: Utils.PadWithZeros(time.hours, 2) + ":" + Utils.PadWithZeros(time.minutes, 2) + ":" + Utils.PadWithZeros(time.seconds, 2)
    };
};
var default_1 = /** @class */ (function () {
    function default_1() {
    }
    default_1.Success = function (message) {
        var _a = getTime(), YMD = _a.YMD, HMS = _a.HMS;
        console.log(gray("(" + YMD + " " + HMS + ") (CODE: S) ") + green('Captcha Bot') + gray(' » ') + white(message));
        fs.appendFileSync("./logs/console/" + YMD + ".txt", "(" + YMD + " " + HMS + ")" + " (CODE: S) Captcha Bot \u00BB " + message + "\n");
    };
    default_1.Error = function (message) {
        var _a = getTime(), YMD = _a.YMD, HMS = _a.HMS;
        console.log(gray("(" + YMD + " " + HMS + ") (CODE: E) ") + red('Captcha Bot') + gray(' » ') + white(message));
        fs.appendFileSync("./logs/console/" + YMD + ".txt", "(" + YMD + " " + HMS + ")" + " (CODE: E) Captcha Bot \u00BB " + message + "\n");
    };
    default_1.Info = function (message) {
        var _a = getTime(), YMD = _a.YMD, HMS = _a.HMS;
        console.log(gray("(" + YMD + " " + HMS + ") (CODE: I) ") + blue('Captcha Bot') + gray(' » ') + white(message));
        fs.appendFileSync("./logs/console/" + YMD + ".txt", "(" + YMD + " " + HMS + ")" + " (CODE: I) Captcha Bot \u00BB " + message + "\n");
    };
    return default_1;
}());
export default default_1;
