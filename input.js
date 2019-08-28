const { 
  SPEED_NORMAL_UD, 
  SPEED_NORMAL_LR, 
  SPEED_TURBO_UD, 
  SPEED_TURBO_LR,
  UP,
  DOWN,
  LEFT,
  RIGHT
} = require('./constants');
// Stores the active TCP connection object.
let connection;
let clearVal;
let boost = false;
let delay;
let currDirection = '';

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
      delay = boost ? SPEED_TURBO_UD : SPEED_NORMAL_UD;
      move(UP);
      break;
    case 'a':
      delay = boost ? SPEED_TURBO_LR : SPEED_NORMAL_LR;

      move(LEFT);
      break;
    case 's':
      delay = boost ? SPEED_TURBO_UD : SPEED_NORMAL_UD;

      move(DOWN);
      break;
    case 'd':
      delay = boost ? SPEED_TURBO_LR : SPEED_NORMAL_LR;

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
        delay = boost ? SPEED_TURBO_UD : SPEED_NORMAL_UD;
      } else if (currDirection === LEFT || currDirection === RIGHT) {
        delay = boost ? SPEED_TURBO_LR : SPEED_NORMAL_LR;
      }
      // Set new delay
      move(currDirection);
      break;

    case '\u0003':
      process.exit();
  }
};

module.exports = { setupInput };