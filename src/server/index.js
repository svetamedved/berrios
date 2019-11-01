const express = require('express');
const bodyParser = require('body-parser');
const TelegramBot = require('node-telegram-bot-api');
const app = express();

const token = '1041346658:AAESWqCoTXPcfJtMRGBozrA19kNfdp_BlxE';
const chat = '-362608791';
const bot = new TelegramBot(token, { polling: true });

function postMessage(chatId, message) {
    console.log(chatId);
    bot.sendMessage(chatId, message);
}

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    postMessage(chatId, 'Received your message');
});

app.use(express.static('dist'));
app.use(bodyParser.json());
app.post('/api/sendMessage', (req, res) =>
    postMessage(chat, req.body['message'])
);

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
