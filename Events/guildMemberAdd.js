const ayar = require('../settings.js');
const Discord = require('discord.js');
const moment = require('moment')
require('moment-duration-format');
const registerData = require('../models/register.js');
module.exports = async member => {
  



  
        let data = await registerData.findOne({ guildID: member.guild.id })
        let kurulus = member.user.createdTimestamp
        let süphe;
        if (Date.now() - kurulus < 1000 * 60 * 60 * 24 * 10 ? süphe = "Şüpheli" : süphe = "Güvenli");

        let olusturma = `(\`${moment.duration(Date.now() - kurulus).format('Y [yıl], M [Ay], D [Gün]')}\`)`
        let channel = member.guild.channels.cache.get(ayar.channels.registerChannel);
        let taglog = member.guild.channels.cache.get(ayar.channels.tagLog);
      
        if (süphe === "Güvenli") {
            await member.roles.add(ayar.roles.unregisterRoles).catch(e => {});
            await member.setNickname(ayar.guild.defaultName).catch(e => {});
            if (channel) channel.send(`
:tada: Sunucumuza hoş geldin ${member} (\`${member.id}\`)!
Seninle beraber **${member.guild.memberCount}** kişiyiz! İyi eğlenceler.        

Hesabın **${moment(kurulus).locale('tr').format('LLL')}** tarihinde ${olusturma} önce oluşturulmuş! ✅
        
Sunucumuza kayıt olmak için soldaki \`V.Confirmed\` odalarından birine geçip <@&${ayar.roles.registerStaff}> yetkilisine ${data ? data.tagMode === true ? `tagımızı alıp ses teyit vermelisin.` : `ses teyit vermelisin.` : `ses teyit vermelisin.`}
        
Sunucu kurallarımız ${member.guild.channels.cache.get(ayar.channels.rulesChannel)} kanalında belirtilmiştir. Unutma sunucu içerisinde ki cezai işlemlerin kuralları okuduğunu varsayarak gerçekleştirilecek.`);
    } else {
await member.roles.set([ayar.roles.suspecious]).catch(e => {});
await member.setNickname(ayar.guild.suspeciousName).catch(e => {});

if(channel) channel.send(`
${member}, Adlı kullanıcı sunucuya katıldı fakat hesabı yeni olduğu için şüpheli hesap rolünü verdim. ${olusturma}`);
    }

    if (member.user.username.includes(ayar.guild.tag)) {
        await member.roles.add(ayar.roles.tagRole)
        await member.roles.add(ayar.roles.unregisterRoles)
        taglog.send(`<@${member.id}> adlı kişi sunucumuza taglı şekilde katıldı, isminde ${ayar.guild.tag} sembolü bulunuyor.`);
     
      }

};

 
  
