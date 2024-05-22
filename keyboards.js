const { Keyboard } = require('grammy') 

const helloKb = new Keyboard().text("Создать очередь").row().text("Придумать цель и вывод работы")


module.exports = {
    helloKb
}