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

const handleUserInput = function(key) {
  switch (key) {
    case 'w':
      connection.write('Move: up');
      // console.log('up');
      break;
    case 'a':
      connection.write('Move: left');
      // console.log('left');
      break;
    case 's':
      connection.write('Move: down');
      // console.log('down');
      break;
    case 'd':
      connection.write('Move: right');
      // console.log('right');
      break;
    case '\u0003':
      process.exit();
  }
}

module.exports = {setupInput};