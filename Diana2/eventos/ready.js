module.exports = client => {
  console.log(
    `${client.guilds.size} servidores | ${client.users.size} usuarios`
  );

  /*
   * TROCA DE AVATAR
   */

  setInterval(() => {
    let random_avatar = [
      "https://media.discordapp.net/attachments/659061891355639814/674334962199035970/deboe1i53sx21.jpg?width=222&height=300",
      "https://media.discordapp.net/attachments/659061891355639814/674335316504739840/3b29a8f71d672627ae9089cb2a23b685.png?width=300&height=300",
      "https://media.discordapp.net/attachments/659061891355639814/674335497731964958/c72e23206fdac5aba50fcb71f4718536.png?width=300&height=300",
      "https://criticalhits.com.br/wp-content/uploads/2019/11/World-of-Warcraft-Shadowlands.jpg"
    ];

    client.user.setAvatar(
      random_avatar[Math.floor(Math.random() * random_avatar.length)]
    );
  }, 30 * 60000);

  const firebase = require("firebase");
  const database = firebase.database();

  database
    .ref(`Owner`)
    .once("value")
    .then(async function(mdk) {
      if (mdk.val() == null) {
        database.ref(`Owner`).set({
          game: 0,
          qtdcmd: 0,
          embed: 3684413,
          delete: 10,
          cooldown: 3,
          suporte: 0,
          permissão: 3198025,
          criador: 0,
          tokenbot: 0,
          antifake: 10,
          mendreik: 0,
          diana: 0,
          positivo: 0,
          negativo: 0,
          aviso: 0,
          relogio: 0,
          dinheiro: 0,
          seta: 0,
          lixo: 0,
          um: 0,
          dois: 0,
          tres: 0,
          quatro: 0,
          cinco: 0,
          seis: 0,
          sete: 0,
          oito: 0,
          nove: 0
        });
      }
      database.ref(`Owner`).update({
        qtdcmd: (mdk.val().qtdcmd = 0)
      });
    });

  /*
   * STATUS DO BOT
   */

  setInterval(async function() {
    const Servidor = "687614701491716097";
    const promises = [
      client.shard.broadcastEval("this.users.size"),
      client.shard.broadcastEval("this.guilds.size")
    ];

    Promise.all(promises).then(async results => {
      const membrosall = results[0].reduce((a, b) => a + b, 0);
      const servidoresall = results[1].reduce((a, b) => a + b, 0);

      client.user.setGame(require("currency-formatter").format(membrosall, { code: "de-DE", precision: 0}) + " Usuários");
      client.guilds
        .get(Servidor)
        .channels.get("723986345185247324")
        .setName(require("currency-formatter").format(membrosall, { code: "de-DE", precision: 0}) + " Usuários");
      client.guilds
        .get(Servidor)
        .channels.get("723986385299570818")
        .setName(require("currency-formatter").format(servidoresall, { code: "de-DE", precision: 0}) + " Servidores");
    });
  }, 5 * 60000);
};
