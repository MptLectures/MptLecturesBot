const { helloKb } = require('./keyboards.js')
const { OpenAI } = require('openai') 
require('dotenv').config()
const { generateUpdateMiddleware } = require("telegraf-middleware-console-time") 
const { Bot, InlineKeyboard, session } = require('grammy')
const { conversations, createConversation } = require("@grammyjs/conversations");

const bot = new Bot(process.env.MPTLECTUTES)

const openai = new OpenAI({
    apiKey: process.env.OPENAI,
})

async function GenerateTargetOrTotal(conversation, ctx) {
    await ctx.reply("Type your technical task:");
    const { message } = await conversation.wait();
    await ctx.reply(`Creating new total, ${message.text}!`);
    const answer = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'system', content: message }],
    });
    await ctx.reply(answer.choices[0]);
}

bot.use(session({
    initial() {
      return {};
    },
}));
  
bot.use(conversations());
bot.use(createConversation(GenerateTargetOrTotal));
bot.use(generateUpdateMiddleware())

bot.api.setMyCommands([
    {
        command: "start", description: "Начальная команда",
    },
    {
        command: "queue_start", description: "Запустить очередь",
    },
    {
        command: "create_target_and_total", description: "Сгенерировать цель и вывод для практической работы"
    }
])

bot.command("create_target_and_total", async (ctx) => {
    await ctx.conversation.enter("GenerateTargetOrTotal");
});

bot.command('start', async (ctx) => {
    await ctx.reply("Привет!❤️\nЭто бот в котором будут собраны лекции 2 курса📚, а так он способен создавать очереди, на сдачу каких либо работ!)", { reply_markup: helloKb })
})

bot.command("queue_start", async (ctx) => {
    const queueKeyboard = new InlineKeyboard()
    .text("Текущая очередь: \n", "q#join")
    await ctx.reply('Давайте создадим очередь: ', {
        reply_markup: queueKeyboard,
    })
})

bot.callbackQuery('q#join', async (ctx) => {
    await ctx.answerCallbackQuery({
        text: "Вы вступили в очередь",
    })

    const queueKeyboard = new InlineKeyboard()
    .text("Текущая очередь: \n", "q#join")

    const newText = `${ctx.callbackQuery.message.text}\n${ctx.callbackQuery.message.text.split('\n').length}. @${ctx.callbackQuery.message.chat.username}`

    await ctx.editMessageText(newText, {
        reply_markup: queueKeyboard,
    })

    console.log(ctx.callbackQuery)
})

bot.start()
