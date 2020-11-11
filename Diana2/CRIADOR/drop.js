const tempo = 15;
const carroforte = new Set();
const dinheiro = 10000;

module.exports = {
  async execute(client, message, args, database, mdk) {
    message.delete();

    if (
      message.author.id !== require("../config.json").criador &&
      message.author.id !== require("../config.json").diana
    )
      return message.channel
        .send("🔔 | Este comando é exclusivo do meu criador!")
        .then(m => m.delete(10000));

    await message.channel
      .send(
        "A Transportadora de valores mandou um Carro Forte com **" +
          require("currency-formatter").format(dinheiro, {
            code: "de-DE",
            symbol: "R$ ",
            precision: 0
          }) +
          "** !!!\n Vocês tem **__" +
          tempo +
          " Segundos__** para disputar, digite `roubar` para ter a chance de rouba-lo",
        {
          file:
            "https://cdn.discordapp.com/attachments/644849613261504512/650547646548803594/oie_transparent.png"
        }
      )
      .then(async msg => {
        const filter = m => m.content.toLowerCase() === "roubar";
        const collector = msg.channel.createMessageCollector(filter, {
          time: tempo * 1000
        });
        var gotCorrectAnswer = false;
        let i = 1;
        let a = [];
        let b = [];
        collector.on("collect", async m => {
          gotCorrectAnswer = true;
          if (m.author.bot) return;

          var { body } = await require("snekfetch").get(
            require("../firebase.json").databaseURL +
              "/BlackList/" +
              m.author.id +
              ".json"
          );

          if (body === null) body = "undefined";
          if (body === "undefined") body = 0;

          const TEMPO = body.tempo;
          const DATA = body.data;
          const MOTIVO = body.motivo;

          const time = require("parse-ms")(TEMPO - (Date.now() - DATA));
          if (DATA !== null && TEMPO - (Date.now() - DATA) > 0) return;

          if (carroforte.has(m.author.id)) {
            //
          } else {
            m.react("🔫");
            a.push(m.author.id);
            b.push(`**[${i++}]** ${m.author.username}`);
            carroforte.add(m.author.id);
            setTimeout(() => {
              carroforte.delete(m.author.id);
            }, tempo * 1000);
          }
          m.delete(tempo * 1000);
          msg.delete(tempo * 1000);
        });

        setTimeout(async function() {
          if (a.length === 0)
            return message.channel
              .send(
                "Como vocês são burros, deixaram o motorista fugir !!! 🚛💨"
              )
              .then(m => m.delete(10000), msg.delete());

          let ganhador = a[Math.floor(Math.random() * a.length)];

          message.channel
            .send("**Participantes:** \n\n " + b.join("\n"))
            .then(async amsg => {
              setTimeout(async function() {
                amsg.delete(1000);

                var { body } = await require("snekfetch").get(
                  require("../firebase.json").databaseURL +
                    "/Servidores/Banco/" +
                    message.guild.id +
                    "/" +
                    ganhador +
                    ".json"
                );

                if (body === null) body = "undefined";
                if (body === "undefined") body = 0;

                var banco;
                if (!body) {
                  banco = 0;
                } else {
                  banco = Number(body.dindin);
                }

                var dinmão;
                if (!body) {
                  dinmão = 0;
                } else {
                  dinmão = Number(body.dinheiro);
                }

                database
                  .ref("Servidores/Banco/" + message.guild.id + "/" + ganhador)
                  .set({
                    dindin: banco,
                    dinheiro: dinmão + dinheiro
                  });

                message.channel.send(
                  "<@" +
                    ganhador +
                    ">, você conseguiu roubar o Carro Forte e recebeu **" +
                    require("currency-formatter").format(dinheiro, {
                      code: "de-DE",
                      symbol: "R$ ",
                      precision: 0
                    }) +
                    "** na sua Carteira"
                );
              }, 5000);
            });
        }, tempo * 1000);
      });
  }
};
