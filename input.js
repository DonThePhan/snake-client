let connection;
let keepMoving;
let speed = 100;
const { moveKeys, msgKeys } = require('./constants');

// setup interface to handle user input from stdin
const setupInput = function(conn) {
  connection = conn;
  const stdin = process.stdin;
  stdin.setRawMode(true);
  stdin.setEncoding('utf8');
  stdin.resume();

  stdin.on('data', handleUserInput);

  return stdin;
};

const handleUserInput = function(data) {
  if (data === '\u0003') {
    console.log('EXITING');
    process.exit();
  }
  for (const [ key, value ] of Object.entries(msgKeys)) {
    if (data === key) connection.write(value);
  }
  for (const [ key, value ] of Object.entries(moveKeys)) {
    if (data === key) {
      clearInterval(keepMoving);
      keepMoving = setInterval(() => {
        connection.write(value);
      }, speed);
    }
  }
  if (data === '=') {
    connection.write(`Say: speed: ${Math.round(1000 / speed * 10) / 10} sq/s`);
    speed -= 10;
  }
  if (data === '-') {
    speed += 10;
    connection.write(`Say: speed: ${Math.round(1000 / speed * 10) / 10} sq/s`);
  }
};

module.exports = { setupInput };
