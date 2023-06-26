const schedule = require('node-schedule');
const { runAsyncTask } = require('./muteQuery')

function setAsyncTimer(delay) {
    const targetDate = new Date(Date.now() + delay);
    console.log(Date.now())
    const job = schedule.scheduleJob(targetDate, async () => {
    console.log('Таймер завершен');
    await runAsyncTask();
    });

    console.log(`Таймер установлен на ${targetDate}`);

    return job;
}

module.exports = {
    setAsyncTimer
};
