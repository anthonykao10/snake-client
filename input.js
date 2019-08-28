const { SPEEDNORMALUD, SPEEDNORMALLR, SPEEDTURBOUD, SPEEDTURBOLR } = require('./constants');
// Stores the active TCP connection object.
let connection;

// Setup User Interface, to handle user input via stdin
const setupInput = function(conn) {
  connection = conn;
  const stdin = process.stdin;
  stdin.setRawMode(true);
  stdin.setEncoding('utf8');
  stdin.resume();
  stdin.on('data', handleUserInput);
  return stdin;
};

let clearVal;
let boost = false;
let delay;
let currDirection = '';

const handleUserInput = function(key) {
  switch (key) {
    case 'w':
      delay = boost ? SPEEDTURBOUD : SPEEDNORMALUD;

      clearInterval(clearVal);
      clearVal = setInterval(() => {
        connection.write('Move: up');
        currDirection = 'Move: up';
      }, delay);
      break;
    case 'a':
      delay = boost ? SPEEDTURBOLR : SPEEDNORMALLR;

      clearInterval(clearVal);
      clearVal = setInterval(() => {
        connection.write('Move: left');
        currDirection = 'Move: left';
      }, delay);
      break;
    case 's':
      delay = boost ? SPEEDTURBOUD : SPEEDNORMALUD;

      clearInterval(clearVal);
      clearVal = setInterval(() => {
        connection.write('Move: down');
        currDirection = 'Move: down';
      }, delay);
      break;
    case 'd':
      delay = boost ? SPEEDTURBOLR : SPEEDNORMALLR;

      clearInterval(clearVal);
      clearVal = setInterval(() => {
        connection.write('Move: right');
        currDirection = 'Move: right';
      }, delay);
      break;

    case 'm':
      connection.write('Say: hello');
      break;
    case 'n':
      connection.write('Say: bye');
      break;

    case 'p':
      boost = !boost;
      // Update delay speed
      if (currDirection === 'Move: up' || currDirection === 'Move: down') {
        delay = boost ? SPEEDTURBOUD : SPEEDNORMALUD;
      } else if (currDirection === 'Move: left' || currDirection === 'Move: right') {
        delay = boost ? SPEEDTURBOLR : SPEEDNORMALLR;
      }
      // Set new delay
      clearInterval(clearVal);
      clearVal = setInterval(() => {
        connection.write(currDirection);
      }, delay);
      break;

    case '\u0003':
      process.exit();
  }
};

module.exports = { setupInput };