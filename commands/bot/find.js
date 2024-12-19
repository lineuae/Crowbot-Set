module.exports = {
    name: 'find',
    description: {
        fr: "Trouver le salon vocal d'un utilisateur.",
        en: "Find the voice channel of a user.",
    },
    usage: {
        fr: {'find <@utilisateur | ID>': "Trouver le salon vocal d'un utilisateur."},
        en: {'find <@user | ID>': "Find the voice channel of a user."}
    },
    run: async (client, message, args) => {
        const allowedRoles = ['1315144251780108348', '1315144233568567306','1315144222508318720', '1315144220818018335', '1315144228946444319', '1315144227750940742','1315144214832615485', '1315144202874785802', '1315144199045251082', '1314701776196206794']; // Remplace par les IDs des rôles autorisés
        const hasPermission = message.member.roles.cache.some(role => allowedRoles.includes(role.id));

        if (!hasPermission) {
            return message.reply("> `❌` Erreur : Vous n'avez pas la permission d'utiliser cette commande !");
        }

        const userId = args[0].replace(/[<@!>]/g, '');
        const member = message.guild.members.cache.get(userId);

        if (!member || !member.voice.channel) {
            return message.reply("> `❌` Erreur : L'utilisateur mentionné n'est pas dans un salon vocal !");
        }

        return message.reply(`> ✅ ${member.user.tag} se trouve dans le salon vocal : \`${member.voice.channel.name}\`.`);
    },
};
