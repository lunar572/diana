module.exports = {
  name: "personalidade",
  aliases: ["personalidade", "personality"],
  async execute(client, message, args, database, mdk) {
    const types = [
      "Pisicopata",
      "Depressivo(a)",
      "Carinhoso(a)",
      "Burro(a)",
      "Escuro(a)",
      "Elegante",
      "Bonito(a)",
      "Feio(a)",
      "Inteligente",
      "Otaku",
      "Legal",
      "Engraçado(a)",
      "Inseguro(a)",
      "Sozinho(a)",
      "Otimista",
      "Bravo(a)",
      "Sonhador(a)",
      "Sexy",
      "Gostoso(a)",
      "Delicia",
      "Corno(a)",
      "Pensativo(a)",
      "Iludido(a)",
      "Bipolar"
    ];
    const relationships = [
      "Solteiro(a)",
      "Casado(a)",
      "Ficando",
      "Enrolado(a)",
      "Sozinho(a) para sempre 😖"
    ];
    const hobbys = [
      "Jogar",
      "Ir no banheiro fazer coisas 😈",
      "Matar pessoas",
      "Iludir pessoas",
      "Jogar pessoas de prédio",
      "Comer",
      "Dormir",
      "Se apaixonar por pessoas",
      "Se apaixonar fácil",
      "Ser iludido",
      "Pensar Demais"
    ];
    const genres = [
      "Maconha",
      "Cocaína",
      "Sangue",
      "Hamburguer",
      "Animais",
      "Drogas",
      "Fumar",
      "Jogar Free-Fire",
      "Jogos",
      "Ser iludido",
      "Vampiros",
      "Jogar Fortnite"
    ];

    const type = types[Math.floor(Math.random() * types.length)];
    const relationship =
      relationships[Math.floor(Math.random() * relationships.length)];
    const hobby = hobbys[Math.floor(Math.random() * hobbys.length)];
    const genre = genres[Math.floor(Math.random() * genres.length)];

    const member =
      message.mentions.users.first() ||
      client.users.get(args.join(" ")) ||
      message.author;
    const user = member.user || member;
    let url =
      user.avatarURL || "https://loritta.website/assets/img/unknown.png";

    message.channel.send({
      embed: {
        title: "Personalidade",
        thumbnail: {
          url: `${url}${user.avatarURL ? "?size=2048" : ""}`
        },
        fields: [
          {
            value: `${member.username}`,
            name: "Usuário:",
            inline: false
          },
          {
            value: `${type}`,
            name: "Personalidade:",
            inline: true
          },
          {
            value: `${relationship}`,
            name: "Relacionamento:",
            inline: true
          },
          {
            value: `${hobby}`,
            name: "Hobby:",
            inline: true
          },
          {
            value: `${genre}`,
            name: "Gosta de:",
            inline: true
          }
        ]
      }
    });
  }
};
