const { Worker } = require('worker_threads');
const path = require('path');
const requestTracker = require('./requestTracker');

const generateNewWorker = (workerName) => {
  let lastActiveTime = Date.now();
  let idleTimeout;

  const worker = new Worker(path.join(__dirname, '../workers', workerName));
  worker.on('message', (data) => {
    lastActiveTime = Date.now();
    const { response, requestId } = data;
    requestTracker[requestId](response);
    delete requestTracker[requestId];
  });

  const resetIdleTimeout = () => {
    if (idleTimeout) clearTimeout(idleTimeout);
    idleTimeout = setTimeout(() => {
        console.log(`${workerName} is idle. Terminating worker.`);
        worker.terminate();
      }, 15 * 60 * 1000); // 15 minutes
  };

  resetIdleTimeout();

  worker.on('error', () => {
    worker.terminate();
  });
  return worker;
}

module.exports = generateNewWorker;