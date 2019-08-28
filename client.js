const net = require('net');

const connect = function() {
  const conn = net.createConnection({ 
    host: 'localhost',
    port: 50541
  });
  // interpret incoming data as text
  conn.setEncoding('utf8'); 

  conn.on('connect', () => {
    console.log('connected to game server...');
    conn.write('Name: SPX');
  });

  conn.on('data', (data) => {
    console.log('msg from server: ', data);
  });

  return conn;
}

module.exports = {connect};