const net = require('net');
const { IP, PORT } = require('./constants');

const connect = function() {
  const conn = net.createConnection({
    host: 'localhost',
    port: PORT
  });
  // interpret incoming data as text
  conn.setEncoding('utf8');

  // Send username upon successfully connecting to server
  conn.on('connect', () => {
    console.log('connected to game server...');
    conn.write('Name: AK');
  });

  conn.on('data', (data) => {
    console.log('msg from server: ', data);
  });

  return conn;
};

module.exports = {connect};