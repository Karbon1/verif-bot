import { MessageActionRow, MessageButton } from 'discord.js';
import Utils from '../../modules/utils.js';
import Discord from '../../modules/discord.js';
export default (function (bot) {
    var config = bot.configs.config;
    var lang = bot.configs.lang;
    Utils.db.prepare('CREATE TABLE IF NOT EXISTS "verification" (channelid TEXT, messageid TEXT, roleid TEXT, buttontext TEXT, data TEXT)').run();
    bot.CreateCommand({
        name: lang.commands.verification.name,
        description: lang.commands.verification.description,
        defaultPermission: lang.commands.verification.defaultPermission,
        options: [
            {
                name: 'help',
                description: 'Sends the help menu',
                type: 'SUB_COMMAND'
            },
            {
                name: 'create',
                description: 'Creates a new embed for verification',
                type: 'SUB_COMMAND',
                options: [
                    {
                        name: 'channel',
                        description: 'The channel where the verification embed will be placed',
                        type: 'CHANNEL',
                        required: true
                    },
                    {
                        name: 'button',
                        description: 'The text of the button that will be created',
                        type: 'STRING',
                        required: true
                    },
                    {
                        name: 'role',
                        description: 'The role that will be given after completing a verification',
                        type: 'ROLE',
                        required: true
                    }
                ]
            },
            {
                name: 'delete',
                description: 'Deletes an embed for verification',
                type: 'SUB_COMMAND',
                options: [
                    {
                        name: 'message',
                        description: 'The id of the message that will be deleted',
                        type: 'STRING',
                        required: true
                    }
                ]
            },
            {
                name: 'info',
                description: 'Provides information for a verification embed',
                type: 'SUB_COMMAND',
                options: [
                    {
                        name: 'message',
                        description: 'The id of the message that will provide information regarding the verification',
                        type: 'STRING',
                        required: true
                    }
                ]
            },
        ],
        execute: function (interaction) {
            // if (!Discord.HasRole(message.member, config.permissions.verification)) return message.channel.send(Discord.Embed({
            //   embed: lang.errors.permissions
            // }))
            var sub = interaction.options.getSubcommand() || '/';
            if (sub === 'help' || sub === '/') {
                return interaction.reply(Discord.Embed({
                    embed: lang.commands.verification.embeds.help.menu
                }));
            }
            if (sub === 'create') {
                var channel_1 = interaction.options.get('channel').channel;
                var buttontext_1 = interaction.options.get('button').value;
                var role_1 = interaction.options.get('role').role;
                // if (channelid === '/' || (emoji === '/' || !/\p{Extended_Pictographic}/u.test(emoji)) || roleid === '/' || !!!channel) {
                //   return message.channel.send(Discord.Embed({
                //     embed: Utils.Placeholder(lang.errors.usage, {
                //       '{usage}': `-ver create [channel] [emoji] [verify role]`
                //     })
                //   }))
                // }
                interaction.reply(Discord.Embed({
                    embed: lang.commands.verification.embeds.create.success
                }));
                channel_1.send(Discord.Embed({
                    embed: lang.system.verify.welcome,
                    components: [
                        new MessageActionRow()
                            .addComponents(new MessageButton()
                            .setCustomId('verify')
                            .setLabel(buttontext_1)
                            .setStyle(config.button.style))
                    ]
                })).then(function (m) {
                    Utils.db
                        .prepare('INSERT INTO verification (channelid, messageid, roleid, buttontext, data) VALUES (?, ?, ?, ?, ?)')
                        .run(channel_1.id, m.id, role_1.id, buttontext_1, JSON.stringify([]));
                });
                return;
            }
            if (sub === 'delete') {
                var msgid_1 = interaction.options.get('message').value;
                var verification = Utils.db.prepare('SELECT * FROM verification WHERE messageid=?').all(msgid_1)[0];
                if (!!!verification) {
                    return interaction.reply(Discord.Embed({
                        embed: Utils.Placeholder(lang.errors.usage, {
                            '{usage}': "-ver delete [message id]"
                        }),
                        ephemeral: true
                    }));
                }
                var channel = interaction.guild.channels.cache.get(verification.channelid);
                channel.messages.fetch(verification.messageid).then(function (m) {
                    m["delete"]();
                    Utils.db.prepare('DELETE FROM verification WHERE messageid = ?').run(msgid_1);
                    interaction.reply(Discord.Embed({
                        embed: lang.commands.verification.embeds["delete"].success
                    }));
                });
                return;
            }
            if (sub === 'info') {
                var msgid = interaction.options.get('message').value;
                var verification = Utils.db.prepare('SELECT * FROM verification WHERE messageid=?').all(msgid)[0];
                if (!!!verification) {
                    return interaction.reply(Discord.Embed({
                        embed: Utils.Placeholder(lang.errors.usage, {
                            '{usage}': "-ver info [message id]"
                        }),
                        ephemeral: true
                    }));
                }
                interaction.reply(Discord.Embed({
                    embed: Utils.Placeholder(lang.commands.verification.embeds.info.menu, {
                        // @ts-ignore
                        '{roleid}': verification.roleid,
                        // @ts-ignore
                        '{total}': JSON.parse(verification.data).length,
                        // @ts-ignore
                        '{button}': verification.buttontext
                    })
                }));
                return;
            }
        }
    });
});
