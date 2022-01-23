const Discord = require("discord.js")
const client = new Discord.Client();
const ayar = require("./settings.js")
const fs = require("fs");
require('./util/Loader.js')(client);

const mongoose = require('mongoose');
mongoose.connect(ayar.bot.mongoURL, { useNewUrlParser: true, useUnifiedTopology: true }).then(m => setTimeout(() => { console.log('Database bağlandı!') }, 3000)).catch(err => setTimeout(() => { console.log('Database bağlanamadı!!') }, 3000));
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./Commands/', (err, files) => {
    if (err) console.error(err);
    console.log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./Commands/${f}`);
        console.log(`${props.config.name} komutu yüklendi.`);
        client.commands.set(props.config.name, props);
        props.config.aliases.forEach(alias => {
            client.aliases.set(alias, props.config.name);
        });
    });
})


client.login(ayar.bot.token).catch(err => { console.log('Bota giriş yapılırken başarısız olundu!!') })


//---------------------------------------OTO-CEVAP------------------------------------------\

client.on("message", message => {
  if (message.content.toLowerCase() == ".tag")
    return message.channel.send(ayar.guild.tag);
});
client.on("message", message => {
  if (message.content.toLowerCase() == "tag")
    return message.channel.send(ayar.guild.tag);
});
client.on("message", message => {
  if (message.content.toLowerCase() == "Tag")
    return message.channel.send(ayar.guild.tag);
});



//------------------------OTO-ROL-----------------------\\
client.on("guildMemberAdd", member => {
  member.roles.add(ayar.roles.unregisterRoles); // UNREGİSTER ROLÜNÜN İDSİNİ GİRİN
});


client.on("guildMemberAdd", member => {
  member.roles.add(ayar.roles.unregisterRoles); // UNREGİSTER ROLÜNÜN İDSİNİ GİRİN
});


//-----------------------TAG-ROL----------------------\\

client.on("userUpdate", async (stg, yeni) => {
  var sunucu = client.guilds.cache.get("907361426581098557"); // sunucu id gir
  var uye = sunucu.members.cache.get(yeni.id);
  var ekipTag = ayar.guild.tag;
  var ekipRolü = ayar.roles.tagRole;
  var logKanali = ayar.channels.tagLog;

  if (
    !sunucu.members.cache.has(yeni.id) ||
    yeni.bot ||
    stg.username === yeni.username
  )
    return;

  if (yeni.username.includes(ekipTag) && !uye.roles.cache.has(ekipRolü)) {
    try {
      await uye.roles.add(ekipRolü);
      await uye.send(`**Tagımızı aldığın için teşekkürler! Aramıza hoş geldin.**`);
      await client.channels.cache
        .get(logKanali)
        .send(
          new Discord.MessageEmbed()
            .setColor("GREEN")
            .setDescription(`**${yeni} adlı üye tagımızı alarak aramıza katıldı!**`)
        );
    } catch (err) {
      console.error(err);
    }
  }

  if (!yeni.username.includes(ekipTag) && uye.roles.cache.has(ekipRolü)) {
    try {
      await uye.roles.remove(
        uye.roles.cache.filter(
          rol => rol.position >= sunucu.roles.cache.get(ekipRolü).position
        )
      );
      await uye.send(`**Tagımızı bıraktığın için <@&${ayar.roles.tagRole}> rolün alındı! Tagımızı tekrar alıp aramıza katılmak istersen;\nTagımız: **${ekipTag}****`);
      await client.channels.cache
        .get(logKanali)
        .send(
          new Discord.MessageEmbed()
            .setColor("RED")
            .setDescription(`**${yeni} adlı üye tagımızı bırakarak aramızdan ayrıldı!**`)
        );
    } catch (err) {
      console.error(err);
    }
  }
});


