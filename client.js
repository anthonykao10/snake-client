const net = require('net');
const { IP, PORT, NAME } = require('./constants');

const connect = function() {
  const conn = net.createConnection({
    host: IP,
    port: PORT
  });
  // interpret incoming data as text
  conn.setEncoding('utf8');

  // Send username upon successfully connecting to server
  conn.on('connect', () => {
    console.log('connected to game server...');
    conn.write(NAME);
  });

  conn.on('data', (data) => {
    console.log('msg from server: ', data);
  });

  conn.on('end', () => {
    process.exit();
  });

  conn.on('error', (error) => {
    console.log(error);
  });

  return conn;
};

module.exports = {connect};