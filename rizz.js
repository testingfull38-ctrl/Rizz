const { Telegraf, Markup } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.catch((err, ctx) => {
    if (err.response && err.response.error_code === 409) {
        console.error('Conflict: Another instance is handling getUpdates. Stopping this instance.');
        process.exit(0); // Exit gracefully to avoid conflict
    } else {
        console.error(`Error for ${ctx.updateType}`, err);
    }
});

bot.start((ctx) => {
    const keyboard = Markup.inlineKeyboard([
        [Markup.button.callback('Send Compliment', 'compliment')],
        [Markup.button.callback('Drop a Pickup Line', 'pickup')],
        [Markup.button.callback('Flirty Message', 'flirty')]
    ]);
    ctx.reply('Hey there! 😎 Ready to turn on the charm? Choose an option:', keyboard);
});

bot.action('compliment', (ctx) => {
    const compliments = ['You have an amazing vibe! 🌟', 'Your smile could light up the whole chat! 😄', 'You’re one of a kind, for real! 💫'];
    ctx.reply(compliments[Math.floor(Math.random() * compliments.length)]);
    ctx.answerCbQuery();
});

bot.action('pickup', (ctx) => {
    const pickupLines = ['Are you a magician? Because whenever you\'re around, everyone else disappears! 🎩', 'Do you have a map? Because I keep getting lost in your eyes! 🗺️', 'Is your name Wi-Fi? Because I’m feeling a strong connection! 📶'];
    ctx.reply(pickupLines[Math.floor(Math.random() * pickupLines.length)]);
    ctx.answerCbQuery();
});

bot.action('flirty', (ctx) => {
    const flirtyMessages = ['Just saying, you’d make my day even better if we chatted more! 😉', 'I bet you’re trouble, and I’m here for it! 😏', 'You’ve got my attention—now what are you gonna do about it? 🔥'];
    ctx.reply(flirtyMessages[Math.floor(Math.random() * flirtyMessages.length)]);
    ctx.answerCbQuery();
});

bot.launch()
    .then(() => console.log('Rizz Bot is running...'))
    .catch((err) => console.error('Failed to start bot:', err));

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
