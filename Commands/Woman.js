const Discord = require("discord.js");
const ayar = require('../settings.js');
const { Register } = require('../helpers/functions.js');
const registerData = require('../models/register.js');
module.exports.run = async(client, message, args, embed) => {
if (!message.member.hasPermission("ADMINISTRATOR") && ayar.roles.registerStaff.some(s => !message.member.roles.cache.has(s))) return message.channel.send(embed.setDescription(`${message.member}, Bu komutu kullanmak için gerekli yetkiye sahip değilsin!`))
let member = message.guild.member(message.mentions.members.first() || message.guild.members.cache.get(args[0]))

args = args.filter(a => a !== "" && a !== " ").splice(1)
let isim = args.filter(arg => isNaN(arg)).map(arg => arg.charAt(0).replace('i', "İ").toUpperCase() + arg.slice(1)).join(" ");
let yaş = args.filter(arg => !isNaN(arg))[0] || undefined;


if (!member || !isim) return message.channel.send(embed.setDescription(`${message.member}, Geçerli bir üye ve isim belirtmelisin.`)).sil(7)
let fixTag = `${member.user.username.includes(ayar.guild.tag) ? ayar.guild.tag : ayar.guild.defaultTag}`
var name = Register.fixname(member, isim, yaş);

if (member.roles.highest.position >= message.member.roles.highest.position) return message.channel.send(embed.setDescription(`${message.member}, Bu kullanıcı sizden üst/aynı pozisyonda.`)).sil(7) && message.sil(7)
if (member.user.bot) return message.channel.send(embed.setDescription(`${message.member}, Kayıt ettiğin kullanıcı bir bot olamaz.`)).sil(7)
if (member.id === message.author.id) return message.channel.send(embed.setDescription(`${member}, Kendini kayıt edemezsin.`)).sil(7)
if (yaş < ayar.guild.minYas) return message.channel.send(embed.setDescription(`Kayıt ettiğin üyenin yaşı ${ayar.guild.minYas}'ten küçük olamaz`)).sil(7)
    
let data = await registerData.findOne({ guildID: message.guild.id })
if (data && data.tagMode === true) {
    if (ayar.guild.tagges.some(s => !member.user.tag.includes(s) || !member.user.username.includes(s)) && !member.roles.cache.has(ayar.roles.vipRole) && !member.roles.cache.has(ayar.roles.tagRole) && !member.roles.cache.has(ayar.roles.boosterRole)) return message.channel.send(embed.setDescription(`${member}, Adlı kullanıcıda tag bulunmadığı için işlem gerçekleştirilemedi.`)).sil(7);  
}
await Register.woman(member, message.member, name, message.channel)
message.react(ayar.emojis.yes).catch(e => {})
client.channels.cache.get(ayar.channels.general).send(embed.setDescription(`${member}, Aramıza Katıldı !`));
};
exports.config = {
    name: "kız",
    guildOnly: true,
    aliases: ["k", "kadın"],
    cooldown: 3000
};
