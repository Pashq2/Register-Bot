module.exports = {

    // aspect.js userUpdate yerinde sunucu id gir dediğim yere sunucu id gir
    bot: {
        token: "", // token
        botOwner: ["469555917403324439"], // owner id
        botPrefix: ".", // prefix
        botStatus: "Developed By Aspect", // bot durum 
        footer: "Developed By Aspect", // footer
        botVoice: "914632005151490088", // botun gireceği ses kanalı
        mongoURL: "", // mongo url
    },
    roles: {
        registerStaff: ["907362289764667392"], // register rolü
        manRoles: ["907362246282342410", ""], // erkek rolleri
        womanRoles: ["914615675945898004", ""], // kız rolleri
        unregisterRoles: ["907362267421609985"], // unregister rolü
        tagRole: "907362580710977577",  // taglı rolü
        vipRole: "",  // vip rolü
        boosterRole: "",  // booster rolü
        suspecious: "907362462070898769" // şüpheli hesap rolü
    },

    channels: {
        registerChannel: "914615095387107459", // kayıt kanalı
        rulesChannel: "914615095387107459", // kurallar kanalı
        general: "914615095387107459", // chat kanalı
        tagLog: "914615095387107459", // tag log kanalı
    },
    guild: {
        minYas: "13", // BURAYA MİNUMUM YAŞI GİRİNİZ
        guildID: "907361426581098557",
        tag: "✯", // BURAYA İSMİN BAŞINA GELECEK TAG BİRDEN ÇOK TAGINIZ VARSA AŞŞAĞIYA GİRİN
        tagges: ["✯", ""], // BİRDEN ÇOK TAGINIZ VARSA BURAYA GİRİN ÖRNEK: #0001
        defaultTag: "•", // tag olmayanların simgesi 
        defaultName: "• İsim | Yaş", // tagsızların ismi
        suspeciousName: "• Şüpheli | Hesap", // şüpheli hesap ismi
    },
    emojis: {
        yes: "929510719630745631",
        no: "929510722675826778",
        // EMOJİLERİN ID GİRCEKSİNİZ SADECE ID
    }

};