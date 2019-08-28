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
}

let clearVal;
let boost = false;
let delay; 

const handleUserInput = function(key) {
  switch (key) {
    case 'w':
      delay = boost ? SPEEDTURBOUD : SPEEDNORMALUD;

      clearInterval(clearVal);
      clearVal = setInterval(() => {
        connection.write('Move: up');
      }, delay);
      // connection.write('Move: up');
      break;
    case 'a':
      delay = boost ? SPEEDTURBOLR : SPEEDNORMALLR;

        clearInterval(clearVal);
        clearVal = setInterval(() => {
          connection.write('Move: left');
        }, delay);
      // connection.write('Move: left');
      break;
    case 's':
      delay = boost ? SPEEDTURBOUD : SPEEDNORMALUD;

      clearInterval(clearVal);
      clearVal = setInterval(() => {
        connection.write('Move: down');
      }, delay);
      // connection.write('Move: down');
      break;
    case 'd':
      delay = boost ? SPEEDTURBOLR : SPEEDNORMALLR;

      clearInterval(clearVal);
      clearVal = setInterval(() => {
        connection.write('Move: right');
      }, delay);
      // connection.write('Move: right');
      break;

    case 'm':
      connection.write('Say: hello');  
      break; 
    case 'n':
      connection.write('Say: bye');
      break;   

    case 'p':
      boost = !boost;
      break;

    case '\u0003':
      process.exit();
  }
}

module.exports = {setupInput};