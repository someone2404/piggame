const TelegramBot = require('node-telegram-bot-api');

// Bot tokenini o'zgartiring
const token = '7458433283:AAERBdFchFUbgjt6gP4SXjH2L0rClysdJn0'; 

// Botni yaratish va so'rovlarni ishlov berish
const bot = new TelegramBot(token, { polling: true });

// O'yin URL manzili
const gameUrl = 'https://piggame-sepia.vercel.app/'; // O'yin URL manzilingiz

// Foydalanuvchi /start buyrug'ini yuborganida
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, `Salom! O'yiningizni o'ynash uchun [bosing](${gameUrl})`, { parse_mode: 'Markdown' });
});
