import dotenv from 'dotenv';
dotenv.config();
import * as Discordjs from 'discord.js';
import Readline from 'readline';
import Utils from './modules/utils.js';
import YAML from './modules/yaml.js';
import Bot from './modules/bot.js';
var rl = Readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
rl.on('line', function (input) {
    if (input == 'stop') {
        process.exit();
    }
});
var client = new Discordjs.Client({ partials: ['MESSAGE', 'CHANNEL', 'REACTION'], intents: [
        Discordjs.Intents.FLAGS.DIRECT_MESSAGES,
        Discordjs.Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
        // Discordjs.Intents.FLAGS.DIRECT_MESSAGE_TYPING,
        Discordjs.Intents.FLAGS.GUILDS,
        // Discordjs.Intents.FLAGS.GUILD_BANS,
        // Discordjs.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
        // Discordjs.Intents.FLAGS.GUILD_INTEGRATIONS,
        // Discordjs.Intents.FLAGS.GUILD_INVITES,
        Discordjs.Intents.FLAGS.GUILD_MEMBERS,
        Discordjs.Intents.FLAGS.GUILD_MESSAGES,
        Discordjs.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        // Discordjs.Intents.FLAGS.GUILD_MESSAGE_TYPING,
        // Discordjs.Intents.FLAGS.GUILD_PRESENCES,
        // Discordjs.Intents.FLAGS.GUILD_VOICE_STATES,
        // Discordjs.Intents.FLAGS.GUILD_WEBHOOKS,
    ] });
YAML.Generate('config', "button:\n  style: SUCCESS\n\npermissions: # role based!\n  verification: '1234567890' # put the id of your admin role (recommended) \n");
YAML.Generate('lang', "errors: # all follow the model of embeds\n  permissions: \n    title: Error\n    description: '```Insufficient Permissions```'\n    color: 0xED4245\n  usage:\n    title: Error\n    description: '```Incorrect Usage: {usage}```'\n    color: 0xED4245\n\ncommands: \n  verification:\n    name: verification\n    description: aids in the creation, deletion, and provides information regarding verification\n    defaultPermission: false\n    embeds:\n      create:\n        success:\n          title: Verification Create\n          description: Successfully created a new verification\n          color: 0x3BA55C\n      delete: \n        success:\n          title: Verification Delete\n          description: Successfully deleted a verification\n          color: 0x3BA55C\n      info:\n        menu:\n          title: Verification Information\n          fields:\n            - name: Verify Role\n              value: '<@&{roleid}>'\n            - name: Number Verified\n              value: '```{total}```'\n            - name: Button Text\n              value: '{button}'\n          color: 0x3BA55C\n      help:\n        menu:\n          title: Verification Help\n          description: |\n            `/verification create [channel] [button text] [verify role]` creates a new embed for verification\n            `/verification delete [message id]` deletes an embed for verification\n            `/verification info [message id]` provides information for a verification embed\n            `/verification help` sends the help menu\n          color: 0x3BA55C\n\nsystem: \n  verify:\n    welcome:\n      title: Welcome to the Discord Server!\n      description: To continue to the Discord server please click the button and complete the captcha.\n      color: 0x3BA55C\n    verify: \n      title: To become verified in the Discord server, Please complete the captcha\n      image: \n        url: '{image}'\n      color: 0x3BA55C\n    success:\n      title: Success!\n      color: 0x3BA55C\n    error:\n      title: Incorrect, please try again!\n      image: \n        url: '{image}'\n      color: 0x3BA55C\n    tryagain:\n      title: Sorry, please try again later!\n      color: 0x3BA55C\n    alreadyverified:\n      title: Sorry, you are already verified\n      color: 0x3BA55C\n    checkdms:\n      title: Please check your dms!\n      color: 0x3BA55C\n");
Utils.CreateDirectory('logs');
Utils.CreateDirectory('logs/console');
Utils.CreateDirectory('backups');
var bot = new Bot(client, process.env.TOKEN, ['config', 'lang']);
bot.Start(bot);
