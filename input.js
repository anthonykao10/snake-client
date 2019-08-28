const { 
  SPEEDNORMALUD, 
  SPEEDNORMALLR, 
  SPEEDTURBOUD, 
  SPEEDTURBOLR,
  UP,
  DOWN,
  LEFT,
  RIGHT
} = require('./constants');
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

const move = function(direction) {
  clearInterval(clearVal);
  clearVal = setInterval(() => {
    connection.write(direction);
    currDirection = direction;
  }, delay);
}

const handleUserInput = function(key) {
  switch (key) {
    // MOVEMENT
    case 'w':
      delay = boost ? SPEEDTURBOUD : SPEEDNORMALUD;
      move(UP);
      break;
    case 'a':
      delay = boost ? SPEEDTURBOLR : SPEEDNORMALLR;

      move(LEFT);
      break;
    case 's':
      delay = boost ? SPEEDTURBOUD : SPEEDNORMALUD;

      move(DOWN);
      break;
    case 'd':
      delay = boost ? SPEEDTURBOLR : SPEEDNORMALLR;

      move(RIGHT);
      break;

    // MESSAGING
    case 'm':
      connection.write('Say: hello');
      break;
    case 'n':
      connection.write('Say: bye');
      break;

    // BOOST
    case 'p':
      boost = !boost;
      // Update delay speed
      if (currDirection === UP || currDirection === DOWN) {
        delay = boost ? SPEEDTURBOUD : SPEEDNORMALUD;
      } else if (currDirection === LEFT || currDirection === RIGHT) {
        delay = boost ? SPEEDTURBOLR : SPEEDNORMALLR;
      }
      // Set new delay
      move(currDirection);
      break;

    case '\u0003':
      process.exit();
  }
};

module.exports = { setupInput };