import * as fs from 'fs';
import Database from 'better-sqlite3';
import Log from './loggers.js';
var Utils = /** @class */ (function () {
    function Utils() {
    }
    Utils.PadWithZeros = function (number, length) {
        if (length === void 0) { length = 4; }
        var n = '' + number;
        while (n.length < length) {
            n = '0' + n;
        }
        return n;
    };
    Utils.Time = function (date) {
        if (date === void 0) { date = new Date(); }
        var d = new Date(date);
        return {
            UTC: d.toUTCString(),
            ISO: d.toISOString(),
            TZ: d.toString(),
            date: d.getDate(),
            month: d.getMonth() + 1,
            year: d.getFullYear(),
            hours: d.getHours(),
            minutes: d.getMinutes(),
            seconds: d.getSeconds()
        };
    };
    Utils.Backup = function (name) {
        var _this = this;
        var time = this.Time();
        var folder = "./backups/" + time.month + "-" + time.date + "-" + time.year;
        this.CreateDirectory(folder);
        fs.copyFile(name, folder + "/" + name, function (err) {
            if (err)
                _this.Error(err);
            Log.Success("Created backup of " + name);
        });
    };
    Utils.CreateDirectory = function (name) {
        if (!fs.existsSync("./" + name)) {
            fs.mkdirSync("./" + name);
        }
    };
    Utils.ConvertHexaColor = function (hexaColor) {
        return Number(hexaColor.toUpperCase().replace('#', '0x'));
    };
    Utils.Error = function (e) {
        fs.appendFileSync('errors.txt', Utils.Time().TZ + "\n" + e.stack + "\n\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n");
        Log.Error('An error has occured!');
    };
    Utils.Random = function (minimum, maximum) {
        return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum;
    };
    // https://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid/2117523#2117523
    Utils.UUID4 = function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0;
            var v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };
    Utils.IsValidHttpURL = function (s) {
        var url;
        try {
            url = new URL(s);
        }
        catch (e) {
            return false;
        }
        return url.protocol === 'http:' || url.protocol === 'https:';
    };
    Utils.Placeholder = function (object, placeholders) {
        try {
            var obj_1 = JSON.stringify(object);
            Object.keys(placeholders).map(function (key) {
                obj_1 = obj_1.split(key).join(placeholders[key].toString().replace(/"/g, '\\"')).replace(/\r?\n|\r/g, '\\n');
            });
            return JSON.parse(obj_1);
        }
        catch (e) {
            this.Error(e);
        }
    };
    Utils.db = Database('database.db');
    return Utils;
}());
export default Utils;
