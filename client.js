const net = require('net');

// establishes a connection with the game server
const connect = function() {
  const conn = net.createConnection({
    host: '165.227.47.243',
    port: 50541
  });

  // interpret incoming data as text
  conn.setEncoding('utf8');

  conn.on('connect', () => {
    console.log('Successfully connected to game server!');
    conn.write('Name: DON');
  });

  conn.on('data', (data) => {
    console.log('Server says: ', data);
  });

  // conn.on("connect", () => {
  //   // code that does something when the connection is first established
  // });

  // process.stdin.on('data', function(message) {
  //   conn.write('Move: up');
  // });

  return conn;
};

// setup interface to handle user input from stdin

const setupInput = function() {
  const stdin = process.stdin;
  stdin.setRawMode(true);
  stdin.setEncoding('utf8');
  stdin.resume();

  stdin.on('data', handleUserInput);

  return stdin;
};

const handleUserInput = function(data) {
  if (data === '\u0003') {
    console.log('EXITING')
    process.exit();
  }
};

module.exports = { connect, setupInput };
