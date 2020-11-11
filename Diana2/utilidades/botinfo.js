module.exports = {
  name: "botinfo",
  aliases: ["botinfo", "infobot"],
  async execute(client, message, args) {
    let ms = client.uptime;
    let cd = 24 * 60 * 60 * 1000;
    let ch = 60 * 60 * 1000;
    let cm = 60 * 1000;
    let cs = 1000;
    let days = Math.floor(ms / cd);
    let dms = days * cd;
    let hours = Math.floor((ms - dms) / ch);
    let hms = hours * ch;
    let minutes = Math.floor((ms - dms - hms) / cm);
    let mms = minutes * cm;
    let seconds = Math.round((ms - dms - hms - mms) / cs);
    if (seconds === 60) {
      minutes++;
      seconds = 0;
    }
    if (minutes === 60) {
      hours++;
      minutes = 0;
    }
    if (hours === 24) {
      days++;
      hours = 0;
    }
    let dateStrings = [];

    if (days === 1) {
      dateStrings.push("**1** dia");
    } else if (days > 1) {
      dateStrings.push("**" + String(days) + "** dias");
    }

    if (hours === 1) {
      dateStrings.push("**1** hora");
    } else if (hours > 1) {
      dateStrings.push("**" + String(hours) + "** horas");
    }

    if (minutes === 1) {
      dateStrings.push("**1** minuto");
    } else if (minutes > 1) {
      dateStrings.push("**" + String(minutes) + "** minutos");
    }

    if (seconds === 1) {
      dateStrings.push("**1** segundo");
    } else if (seconds > 1) {
      dateStrings.push("**" + String(seconds) + "** segundos");
    }

    let dateString = "";
    for (let i = 0; i < dateStrings.length - 1; i++) {
      dateString += dateStrings[i];
      dateString += ", ";
    }
    if (dateStrings.length >= 2) {
      dateString =
        dateString.slice(0, dateString.length - 2) +
        dateString.slice(dateString.length - 1);
      dateString += "e ";
    }

    dateString += dateStrings[dateStrings.length - 1];

    const promises = [
      client.shard.broadcastEval("this.users.size"),
      client.shard.broadcastEval("this.guilds.size")
    ];

    Promise.all(promises).then(async results => {
      const totalmembros = results[0].reduce((a, b) => a + b, 0);
      const totalservidores = results[1].reduce((a, b) => a + b, 0);
      const Online = results[0].reduce((a, b) => a + b, 0);
      const Offline = results[0].reduce((a, b) => a + b, 0);


      const criador = client.users.get(require("../config.json").criador);

      let online = client.guilds.members.filter(a => a.presence.status == "online").size * client.shard.count
      let offline = client.guilds.members.filter(a => a.presence.status == "offline").size * client.shard.count

      message.channel.send({
        embed: {
          title: "Informações do Bot",
          thumbnail: {
            url: client.user.avatarURL
          },
          fields: [
            {
              value: `**${Math.floor(client.ping)}**ms`,
              name: "📡 | API:",
              inline: true
            },
            {
              value: `${dateString}`,
              name: "⏱ | Acordada há:",
              inline: true
            },
            {
              value: `\`\`\`md\n# ${criador.tag}\`\`\``,
              name: "👑 | Criador:"
            },
            {
              value: `**${require("currency-formatter").format(totalmembros, {
                code: "de-DE",
                precision: 0
              })}**`,
              name: "👥 | Membros:",
              inline: true
            },
            {
              value: `**${require("currency-formatter").format(
                totalservidores,
                { code: "de-DE", precision: 0 }
              )}**`,
              name: "🌍 | Servidores:",
              inline: true
            },
            {
              value: "**" + client.shard.count + "**",
              name: "🧪 | Shards:",
              inline: true
            },
            {
              value: "Online: **"+`${require("currency-formatter").format(online, { code: "de-DE", precision: 0 })}`+"** | Offline: **" + `${require("currency-formatter").format(
              offline, { code: "de-DE", precision: 0 })}**`,
              name: "Status:",
              inline: true
            }
          ]
        }
      });
    });
  }
};
