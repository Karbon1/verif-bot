var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import Utils from './utils.js';
var Discord = /** @class */ (function () {
    function Discord() {
    }
    Discord.Embed = function (Message) {
        var embed = Message.embed;
        return {
            embeds: [embed],
            content: Message.content,
            files: Message.files,
            components: Message.components,
            ephemeral: Message.ephemeral
        };
    };
    Discord.CreateRole = function (guild, options) {
        guild.roles.create(options)
            .then()["catch"](Utils.Error);
    };
    Discord.DeleteRole = function (guild, finder) {
        var roleDeleted = guild.roles.cache.find(function (role) { return role.name === finder || role.id === finder; });
        if (roleDeleted == null)
            throw Utils.Error(new Error('Role does not exist'));
        roleDeleted["delete"]();
    };
    Discord.HasRole = function (member, finder) {
        return member.roles.cache.some(function (role) { return role.name === finder || role.id === finder; });
    };
    Discord.GiveRole = function (member, guild, finder) {
        var role = guild.roles.cache.find(function (role) { return role.name === finder || role.id === finder; });
        if (role == null)
            throw Utils.Error(new Error('Role does not exist'));
        return member.roles.add(role);
    };
    Discord.RemoveRole = function (member, guild, finder) {
        var role = guild.roles.cache.find(function (role) { return role.name === finder || role.id === finder; });
        if (role == null)
            throw Utils.Error(new Error('Role does not exist'));
        return member.roles.remove(role);
    };
    Discord.CreateChannel = function (guild, name, options) {
        return guild.channels.create(name, __assign({ type: 'GUILD_TEXT' }, options));
    };
    Discord.DeleteChannel = function (guild, finder) {
        return guild.channels.cache.find(function (c) { return (c.name === finder || c.id === finder) && c.type == 'GUILD_TEXT'; })["delete"]();
    };
    Discord.CreateCategory = function (guild, name, options) {
        return guild.channels.create(name, __assign({ type: 'GUILD_CATEGORY' }, options));
    };
    Discord.DeleteCategory = function (guild, finder) {
        guild.channels.cache.find(function (c) { return (c.name === finder || c.id === finder) && c.type == 'GUILD_CATEGORY'; })["delete"]();
    };
    Discord.MoveChannelToCategory = function (guild, channel, category) {
        var newCategory = guild.channels.cache.find(function (c) { return (c.name === category || c.id === category) && c.type == 'GUILD_CATEGORY'; });
        var newChannel = guild.channels.cache.find(function (c) { return (c.name === channel || c.id === channel) && c.type == 'GUILD_TEXT'; });
        if (!newCategory)
            throw Utils.Error(new Error('Category channel does not exist'));
        if (!newChannel)
            throw Utils.Error(new Error('Channel does not exist'));
        newChannel.setParent(newCategory.id);
    };
    return Discord;
}());
export default Discord;
