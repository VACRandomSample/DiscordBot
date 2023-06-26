async function runAsyncTask() {
    // Асинхронная функция, которую нужно выполнить
    return new Promise((resolve, reject) => {
      // Логика выполнения задачи
      setTimeout(() => {
        console.log('Асинхронная задача выполнена');
        resolve();
      }, 2000); // Пример асинхронной задержки в 2 секунды
    });
}

module.exports = {
    runAsyncTask
}