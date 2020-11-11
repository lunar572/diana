module.exports = {
  async execute(client, message, args) {
    message.channel.send("Calculando...").then(m => {
      m.edit(
        `📡 | Latência: **${Math.floor(
          m.createdTimestamp - message.createdTimestamp
        )}**ms`
      );
    });
  }
};
