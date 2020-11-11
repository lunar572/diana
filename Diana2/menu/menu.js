module.exports = {
  name: "menu",
  aliases: ["menu", "ajuda", "help"],
  async execute(client, message, args, database, mdk) {
    require("fs").readdir("./administracao/", (err, administracao) => {
      require("fs").readdir("./economia/", (err, economia) => {
        require("fs").readdir("./interacao/", (err, interação) => {
          require("fs").readdir("./usuario/", (err, usuário) => {
            require("fs").readdir("./jogos/", (err, jogos) => {
              require("fs").readdir("./utilidades/", (err, utilidades) => {
                message.channel.send({
                  embed: {
                    timestamp: new Date(),
                    title: "Menu de Comandos",
                    footer: {
                      text: "Executado por: " + message.author.tag
                    },
                    thumbnail: {
                      url: client.user.avatarURL
                    },
                    image: {
                      url:
                        "https://media.discordapp.net/attachments/674354727135477784/725050088434565301/dianabanner.png"
                    },
                    fields: [
                      {
                        value: `${administracao
                          .map(r => `\`${r.split(".js")}\``)
                          .join(" ")}`,
                        name: "💠 | Administração " + `(${administracao.length})`
                      },
                      {
                        value: `${interação
                          .map(r => `\`${r.split(".js")}\``)
                          .join(" ")}`,
                        name: "💠 | Interação " + `(${interação.length})`
                      },
                      {
                        value: `${economia
                          .map(r => `\`${r.split(".js")}\``)
                          .join(" ")}`,
                        name: "💠 | Economia " + `(${economia.length})`
                      },
                      {
                        value: `${usuário
                          .map(r => `\`${r.split(".js")}\``)
                          .join(" ")}`,
                        name: "💠 | Usuário " + `(${usuário.length})`
                      },
                      {
                        value: `${jogos
                          .map(r => `\`${r.split(".js")}\``)
                          .join(" ")}`,
                        name: "💠 | Jogos " + `(${jogos.length})`
                      },
                      {
                        value: `${utilidades
                          .map(r => `\`${r.split(".js")}\``)
                          .join(" ")}`,
                        name: "💠 | Utilidades " + `(${utilidades.length})`
                      }
                    ]
                  }
                });
              });
            });
          });
        });
      });
    });
  }
};
