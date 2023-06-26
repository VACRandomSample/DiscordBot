const client = require('../events/client/clientReady')
const { ActivityType } = require('discord.js')

function executeInInterval(dataArray, interval, command) {
    let index = 0;
  
    // const intervalId = 
    setInterval(() => {
        const data = dataArray[index];
        console.log(data); // Выполнение операций над данными

        client.user.setActivity(data, { type: ActivityType.Watching  });
    
        index++;
        if (index >= dataArray.length) {
            index = 0; // Начать сначала, если массив кончился
        }
    }, interval);
  
    // Остановить интервал после необходимого времени
    // setTimeout(() => {
    //     clearInterval(intervalId);
    // }, dataArray.length * interval); // Умножаем длину массива на интервал, чтобы установить общее время выполнения
}
  
// Пример использования


module.exports = {
    executeInInterval
}