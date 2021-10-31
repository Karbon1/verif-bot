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
import _ from 'lodash';
import { MessageAttachment } from 'discord.js';
import Utils from '../../modules/utils.js';
import Discord from '../../modules/discord.js';
import Verify from '../../modules/verify.js';
export default (function (bot) {
    var config = bot.configs.config;
    var lang = bot.configs.lang;
    bot.CreateEvent({
        name: 'interactionCreate',
        execute: function (client, interaction) {
            if (!interaction.isCommand())
                return;
            var i = _.findIndex(bot.commands, { name: interaction.commandName });
            if (i === -1)
                return;
            try {
                bot.commands[i].execute(interaction);
            }
            catch (error) {
                Utils.Error(error);
                interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            }
        }
    });
    bot.CreateEvent({
        name: 'interactionCreate',
        execute: function (client, interaction) {
            var _this = this;
            if (!interaction.isButton())
                return;
            if (interaction.customId === 'verify') {
                var verification = Utils.db.prepare('SELECT * FROM verification WHERE messageid=?').all(interaction.message.id)[0];
                // @ts-ignore
                var data_1 = JSON.parse(verification.data);
                var d = _.find(data_1, { user: interaction.user.id }) || {
                    verified: false
                };
                interaction.reply(Discord.Embed({
                    embed: lang.system.verify.checkdms,
                    ephemeral: true
                }));
                if (d.verified) {
                    interaction.user.send(Discord.Embed({
                        embed: lang.system.verify.alreadyverified
                    })).then(function (k) {
                        setTimeout(function () {
                            k["delete"]();
                        }, 10000);
                    });
                }
                if (!!verification && !(d.verified)) {
                    var attempts_1 = 0;
                    // @ts-ignore
                    var role_1 = interaction.guild.roles.cache.get(verification.roleid);
                    var filter_1 = function (m) { return m.author.id == interaction.user.id; };
                    var u_1 = function () {
                        if (attempts_1 >= 3) {
                            interaction.user.send(Discord.Embed({
                                embed: lang.system.verify.tryagain
                            }));
                            return;
                        }
                        else {
                            var code_1 = Verify.generate();
                            interaction.user.send(Discord.Embed({
                                embed: { description: '.' },
                                files: [
                                    new MessageAttachment(code_1.buffer)
                                ]
                            })).then(function (msg) {
                                var url = msg.attachments.first().proxyURL;
                                msg["delete"]();
                                interaction.user.send(Discord.Embed({
                                    embed: Utils.Placeholder((!attempts_1) ? lang.system.verify.verify : lang.system.verify.error, {
                                        '{image}': url
                                    })
                                })).then(function (m) {
                                    interaction.user.dmChannel.awaitMessages({ filter: filter_1, max: 1 })
                                        .then(function (collected) { return __awaiter(_this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            if (collected.first().content === code_1.answer) {
                                                m.edit(Discord.Embed({
                                                    embed: lang.system.verify.success
                                                }));
                                                interaction.member.roles.add(role_1);
                                                data_1.push({
                                                    verified: true,
                                                    user: interaction.user.id
                                                });
                                                Utils.db.prepare('UPDATE "verification" SET data = ? WHERE roleid = ?').run(JSON.stringify(data_1), role_1.id);
                                                return [2 /*return*/];
                                            }
                                            else {
                                                attempts_1++;
                                                u_1();
                                            }
                                            return [2 /*return*/];
                                        });
                                    }); });
                                });
                            });
                        }
                    };
                    u_1();
                }
            }
        }
    });
});
