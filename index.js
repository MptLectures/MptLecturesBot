const kb  = require('./keyboards.js')
const { OpenAI } = require('openai') 
require('dotenv').config()
const { generateUpdateMiddleware } = require("telegraf-middleware-console-time") 
const { Bot, InlineKeyboard, session, webhookCallback } = require('grammy')
const { conversations, createConversation } = require("@grammyjs/conversations")
const fs = require("fs")
const express = require('express')

const bot = new Bot(process.env.MPTLECTUTES)

const app = express()
app.use(express.json())
app.use(webhookCallback(bot, 'express'))

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
        command: "how_to_use", description: "как пользоваться",
    },
    {
        command: "create_target_and_total", description: "Сгенерировать цель и вывод для практической работы"
    }
])

bot.command("create_target_and_total", async (ctx) => {
    await ctx.conversation.enter("GenerateTargetOrTotal");
});

bot.command('start', async (ctx) => {
    await ctx.reply("Привет!❤️\nЭто бот в котором будут собраны лекции 2 курса📚, а так он способен создавать очереди, на сдачу каких либо работ!)", { reply_markup: kb.helloKb })
})

bot.command("how_to_use", async (ctx) => {

})

bot.command("queue_start", async (ctx) => {
    let queues
    try {
        queues = fs.existsSync('Queue.json') ? JSON.parse(fs.readFileSync('Queue.json')) : [];
        console.info("queues res")
        console.log(queues)
        queues.forEach(async (item, index) => {
            try {
                if (item.chatId === ctx.chatId) {
                    await bot.api.deleteMessage(item.chatId, item.messageId)
                    if (index !== -1) {
                        queues.splice(index, 1)
                        console.log(`Data successfully delete from json data obejct. ${item} deleted from ${queues}`)
                    }
                    console.log(`Message ${item.messageId} deleted successfully`)
                }
            } catch (e) {
                console.error(`Failed to delete message ${item.messageId}:`, e.description);
            }
        })
    }
    catch (e) {console.error("Errore", e)}

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
