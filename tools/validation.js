const execSync = require('child_process').execSync;

const clientPath = './client';
const clientCommands = [
  'npm run lint',
  'npm run build'
];

const serverPath = './server';
const serverCommands = [
  'npm run lint',
  'npm run build'
];

function run(cmd) {
  const options = {stdio: 'inherit'}
  execSync(cmd, options);
}

function log(msg) {
  console.log('[PLAINLY]: ' + msg);
}

function validationCmd(path) {
  return (cmd) => {
    log('Command : ' + cmd);
    run('cd ' + path + ' && ' + cmd);
  }
}

function validateClient() {
  log('Validate client');
  clientCommands.forEach(validationCmd(clientPath));
}

function validateServer() {
  log('Validate server');
  serverCommands.forEach(validationCmd(serverPath));
}

// ------------START--------------------------------

const startTime = new Date().getTime();

log('Starting validation...');

validateClient();
validateServer();

const endTime = new Date().getTime();
const timeDiff = endTime - startTime;

log('Validation done in ' + (timeDiff/1000).toFixed(2) + 's.');

// -----------END-----------------------------------