// Establish connection with game server
const { connect } = require('./client');
const { setupInput } = require('./input');

console.log('Connecting ...');
try {
  setupInput(connect());
} catch (error) {
  console.log(error);
}