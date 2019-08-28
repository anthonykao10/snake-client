// Establish connection with game server
const { connect } = require('./client');
const { setupInput } = require('./input');

setupInput(connect());
