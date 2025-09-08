const { Telegraf, Markup } = require('telegraf');

// Initialize the bot with your API token
const bot = new Telegraf('8266266158:AAFIgaxdSn1zbm4TObfg2P5gExEb0hLw8iI');

// Start command with buttons
bot.start((ctx) => {
    const keyboard = Markup.inlineKeyboard([
        [Markup.button.callback('Send Compliment', 'compliment')],
        [Markup.button.callback('Drop a Pickup Line', 'pickup')],
        [Markup.button.callback('Flirty Message', 'flirty')]
    ]);

    ctx.reply('Hey there! 😎 Ready to turn on the charm? Choose an option:', keyboard);
});

// Handle button clicks
bot.action('compliment', (ctx) => {
    const compliments = [
        'You have an amazing vibe! 🌟',
        'Your smile could light up the whole chat! 😄',
        'You’re one of a kind, for real! 💫'
    ];
    const randomCompliment = compliments[Math.floor(Math.random() * compliments.length)];
    ctx.reply(randomCompliment);
    ctx.answerCbQuery(); // Acknowledge the callback
});

bot.action('pickup', (ctx) => {
    const pickupLines = [
        'Are you a magician? Because whenever you\'re around, everyone else disappears! 🎩',
        'Do you have a map? Because I keep getting lost in your eyes! 🗺️',
        'Is your name Wi-Fi? Because I’m feeling a strong connection! 📶'
    ];
    const randomPickup = pickupLines[Math.floor(Math.random() * pickupLines.length)];
    ctx.reply(randomPickup);
    ctx.answerCbQuery();
});

bot.action('flirty', (ctx) => {
    const flirtyMessages = [
        'Just saying, you’d make my day even better if we chatted more! 😉',
        'I bet you’re trouble, and I’m here for it! 😏',
        'You’ve got my attention—now what are you gonna do about it? 🔥'
    ];
    const randomFlirty = flirtyMessages[Math.floor(Math.random() * flirtyMessages.length)];
    ctx.reply(randomFlirty);
    ctx.answerCbQuery();
});

// Error handling
bot.catch((err, ctx) => {
    console.log(`Error for ${ctx.updateType}`, err);
});

// Start the bot
bot.launch()
    .then(() => console.log('Rizz Bot is running...'))
    .catch((err) => console.error('Failed to start bot:', err));

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
