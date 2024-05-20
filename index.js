const { helloKb } = require('./keyboards.js')
const { OpenAI } = require('openai') 
require('dotenv').config()
const { generateUpdateMiddleware } = require("telegraf-middleware-console-time") 
const { Bot, InlineKeyboard, session } = require('grammy')
const { conversations, createConversation } = require("@grammyjs/conversations")
const fs = require("fs")

const bot = new Bot(process.env.MPTLECTUTES)

const openai = new OpenAI({
    apiKey: process.env.OPENAI,
})

async function GenerateTargetOrTotal(conversation, ctx) {
    await ctx.reply("Введите ваше ТЗ:")
    const { message } = await conversation.wait()
    await ctx.reply(`Создаю цель и вывод исходя из:\n${message.text}!`)
    const answer = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: message }],
    });
    await ctx.reply(answer.choices[0])
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
    const data = fs.readFile("Queue.json", "utf8", (err, data) => {
        if (err) {
            console.error('Error reading file:', err)
        }
    })

    let queues

    try {
        queues = JSON.parse(data)
        queues.forEach(async item => {
            if (item.chatId === ctx.chatId) {
                await bot.api.deleteMessage(item.chatId, item.messageId)
            }
        })
        console.log("AHAHAHAHAHAHHHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHHHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHHHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHHHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHAHHHAHAHAHAHAHAHAHAHAHAHAHAHAH")
        console.log(queues)
    }
    catch (e) {

        console.error("AHAHAHAHAHAHHHAHAHAHAHAHAHAHAHAHAHAHAHAH", e)
        queues = []
    }

    const queueKeyboard = new InlineKeyboard()
    .text("Текущая очередь: \n", "q#join")
    const message = await ctx.reply('Давайте создадим очередь: ', {
        reply_markup: queueKeyboard,
    })
    
    const messageInfo = {
        chatId: message.chat.id,
        messageId: message.message_id
    }

    queues.push(messageInfo)

    fs.writeFile("Queue.json", JSON.stringify(queues, null, 2), (err) => {
        if (err) {
            console.error("errore:", err);
        } else {
            console.log("File succsefly writen");
        }})
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
