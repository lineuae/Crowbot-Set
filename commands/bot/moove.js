const { PermissionsBitField } = require('discord.js');

module.exports = {
    name: 'moove',
    description: {
        fr: "Ramène une personne dans votre salon vocal.",
        en: "Move a person to your voice channel.",
    },
    usage: {
        fr: {'moove <@utilisateur | ID>': "Ramène une personne dans votre salon vocal."},
        en: {'moove <@user | ID>': "Move a person to your voice channel."}
    },
    run: async (client, message, args) => {
        const allowedRoles = ['1315144233568567306', '1315144227750940742', '1315144214832615485', '1315144202874785802', '1315144199045251082', '1314701776196206794']; // Remplace par les IDs des rôles autorisés
        const hasPermission = message.member.roles.cache.some(role => allowedRoles.includes(role.id));

        if (!hasPermission) {
            return message.reply("> `❌` Erreur : Vous n'avez pas la permission d'utiliser cette commande !");
        }

        if (!message.member.permissions.has(PermissionsBitField.Flags.MoveMembers)) {
            return message.reply("> `❌` Erreur : Vous n'avez pas la permission de déplacer des membres !");
        }

        const userId = args[0].replace(/[<@!>]/g, '');
        const member = message.guild.members.cache.get(userId);
        const userVoiceChannel = message.member.voice.channel;

        if (!userVoiceChannel) {
            return message.reply("> `❌` Erreur : Vous devez être dans un salon vocal pour utiliser cette commande !");
        }

        if (!member || !member.voice.channel) {
            return message.reply("> `❌` Erreur : L'utilisateur mentionné n'est pas dans un salon vocal !");
        }

        member.voice.setChannel(userVoiceChannel)
            .then(() => message.reply(`> ✅ ${member.user.tag} a été déplacé dans votre salon vocal.`))
            .catch(error => message.reply(`> ❌ Erreur : ${error.message}`));
    },
};
