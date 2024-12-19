const { PermissionsBitField } = require('discord.js');

module.exports = {
    name: 'join',
    description: {
        fr: "Rejoindre un salon vocal.",
        en: "Join a voice channel.",
    },
    usage: {
        fr: {'join <@utilisateur | ID | ID salon vocal>': "Rejoindre un salon vocal."},
        en: {'join <@user | ID | voice channel ID>': "Join a voice channel."}
    },
    run: async (client, message, args) => {
        const allowedRoles = ['1315144233568567306', '1315144220818018335', '1315144227750940742', '1315144214832615485', '1315144202874785802', '1315144199045251082', '1314701776196206794']; // Remplace par les IDs des rôles autorisés
        const hasPermission = message.member.roles.cache.some(role => allowedRoles.includes(role.id));

        if (!hasPermission) {
            return message.reply("> `❌` Erreur : Vous n'avez pas la permission d'utiliser cette commande !");
        }

        const userIdOrChannelId = args[0].replace(/[<@!>]/g, '');
        const targetMember = message.guild.members.cache.get(userIdOrChannelId);
        const targetChannel = message.guild.channels.cache.get(userIdOrChannelId);

        if (targetMember && targetMember.voice.channel) {
            const channel = targetMember.voice.channel;
            message.member.voice.setChannel(channel)
                .then(() => message.reply(`> ✅ Vous avez rejoint le salon vocal de ${targetMember.user.tag}.`))
                .catch(error => message.reply(`> ❌ Erreur : ${error.message}`));
        } else if (targetChannel && targetChannel.isVoice()) {
            message.member.voice.setChannel(targetChannel)
                .then(() => message.reply(`> ✅ Vous avez rejoint le salon vocal.`))
                .catch(error => message.reply(`> ❌ Erreur : ${error.message}`));
        } else {
            return message.reply("> L'utilisateur n'est pas en vocal ou le salon vocal spécifié n'existe pas !");
        }
    },
};
