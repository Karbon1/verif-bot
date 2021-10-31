var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import * as fs from 'fs';
import logs from 'discord-logs';
import Utils from './utils.js';
import YAML from './yaml.js';
import * as path from 'path';
import { fileURLToPath } from 'url';
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
var Bot = /** @class */ (function () {
    function Bot(client, token, yamlFiles) {
        this.client = client;
        this.token = token;
        this.yamlFiles = yamlFiles;
        this.src = [];
        this.commands = [];
        this.events = [];
        this.configs = {};
    }
    Bot.prototype.Start = function (bot) {
        return __awaiter(this, void 0, void 0, function () {
            var files;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, logs(bot.client)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.YAMLFiles()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.GetSrc()];
                    case 3:
                        files = _a.sent();
                        return [4 /*yield*/, this.GetModules(bot, files)];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, this.StartEvents()];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, this.Login()];
                    case 6:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Bot.prototype.GetSrc = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var getAllFiles = function (dirPath, arrayOfFiles) {
                            var files = fs.readdirSync(path.join(__dirname, dirPath, '/'));
                            arrayOfFiles = arrayOfFiles || [];
                            files.forEach(function (file) {
                                if (fs.statSync(path.join(__dirname, dirPath, '/', file)).isDirectory()) {
                                    arrayOfFiles = getAllFiles(dirPath + '/' + file, arrayOfFiles);
                                }
                                else {
                                    arrayOfFiles.push(path.join(__dirname, dirPath, '/', file));
                                }
                            });
                            return arrayOfFiles;
                        };
                        var files = getAllFiles('../src', []);
                        if (files)
                            resolve(files);
                        else
                            reject(files);
                    })];
            });
        });
    };
    Bot.prototype.GetModules = function (bot, files) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        var c = 0;
                        files.map(function (file) { /*'file:\\\\\\' +*/ return file.replace(/\.ts/g, '.js'); }).forEach(function (file, index) { return __awaiter(_this, void 0, void 0, function () {
                            var name, module;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!file.endsWith('.js'))
                                            return [2 /*return*/];
                                        name = file.substring(0, file.indexOf('.js')).replace(/^.*[\\\/]/, '');
                                        return [4 /*yield*/, import(file)];
                                    case 1:
                                        module = (_a.sent())["default"];
                                        return [4 /*yield*/, module(bot)];
                                    case 2:
                                        _a.sent();
                                        this.src.push({ name: name, file: file, module: module });
                                        c++;
                                        if (c == files.length)
                                            resolve(files);
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                    })];
            });
        });
    };
    Bot.prototype.StartEvents = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _i, _a, event_1;
            return __generator(this, function (_b) {
                for (_i = 0, _a = this.events; _i < _a.length; _i++) {
                    event_1 = _a[_i];
                    this.client.on(event_1.name, event_1.execute.bind(null, this.client));
                }
                return [2 /*return*/];
            });
        });
    };
    Bot.prototype.Login = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        _this.client.login(_this.token)["catch"](function () {
                            var err = new Error('An Error Occurred');
                            Utils.Error(err);
                            reject(err);
                        });
                    })];
            });
        });
    };
    Bot.prototype.YAMLFiles = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        _this.yamlFiles.forEach(function (yaml) {
                            _this.configs[yaml] = YAML.Get(yaml);
                        });
                        resolve(_this.yamlFiles);
                    })];
            });
        });
    };
    Bot.prototype.CreateCommand = function (command) {
        this.commands.push(command);
    };
    Bot.prototype.CreateEvent = function (event) {
        this.events.push(event);
    };
    return Bot;
}());
export default Bot;
