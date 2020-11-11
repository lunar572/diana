module.exports = (client, guild) => {
  const firebase = require("firebase");
  const database = firebase.database();

  // ENTRADA EM SERVIDORES
  client.shard.broadcastEval(
    `this.guilds.get("687614701491716097").channels.get("688086926104068201").send({
        embed: {
          title: "Entrada em Servidor",
          description: "Acabei de entrar em um Servidor",
          thumbnail: {
            url: "` +
      guild.iconURL +
      `"
          },
          fields: [
            {
              value: "` +
      guild.name +
      `",
              name: "Servidor:",
              inline: true
            },
            {
              value: "` +
      guild.id +
      `",
              name: "ID:",
              inline: true
            },
            {
              value: "` +
      guild.owner.user.tag +
      `",
              name: "Dono:",
              inline: true
            },
            {
              value: "` +
      guild.owner.user.id +
      `",
              name: "ID:",
              inline: true
            },
            {
              value: "` +
      guild.memberCount +
      `",
              name: "População:",
              inline: true
            },
            {
              value: "` +
      `${guild.channels
        .random()
        .createInvite({ maxAge: 0 })
        .then(a => {
          a.toString();
        })}}` +
      `",
              name: "Convite:",
              inline: false
            }
          ]
        }
      });`
  );
};
