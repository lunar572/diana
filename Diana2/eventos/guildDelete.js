module.exports = (client, guild) => {
  const firebase = require("firebase");
  const database = firebase.database();

  //PREFIXO DO SERVIDOR
  database.ref(`Servidores/Prefixo/${guild.id}`).remove();
};
