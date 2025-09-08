const { Telegraf, Markup } = require('telegraf');
const express = require('express');

const app = express();
const bot = new Telegraf(process.env.BOT_TOKEN);

// Set webhook
const webhookPath = '/bot';
const webhookUrl = `https://${process.env.RENDER_EXTERNAL_HOSTNAME}${webhookPath}`;
bot.telegram.setWebhook(webhookUrl);

// Middleware to handle Telegram webhook
app.use(bot.webhookCallback(webhookPath));

// Start command and other bot logic (same as above)
bot.start((ctx) => {
    const keyboard = Markup.inlineKeyboard([
        [Markup.button.callback('Send Compliment', 'compliment')],
        [Markup.button.callback('Drop a Pickup Line', 'pickup')],
        [Markup.button.callback('Flirty Message', 'flirty')]
    ]);
    ctx.reply('Hey there! 😎 Ready to turn on the charm? Choose an option:', keyboard);
});

// ... (rest of the bot actions: compliment, pickup, flirty, error handling - same as above)

// Start Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`Webhook set to ${webhookUrl}`);
});

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
