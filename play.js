// Establish connection with game server
const { connect } = require('./client');

console.log('Connecting ...');
connect();

// Setup User Interface, to handle user input via stdin
const setupInput = function() {
  const stdin = process.stdin;
  stdin.setRawMode(true);
  stdin.setEncoding('utf8');
  stdin.resume();
  return stdin;
}

const handleUserInput = function(key) {
  if (key === '\u0003') {
    process.exit();
  }
}

// Register handleUserInput on stdin
setupInput().on('data', handleUserInput);