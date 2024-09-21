const { response } = require("express");
const { Client } = require("pg");
async function databaseRequest(userQuery) {
  // Set up the connection configuration
  const client = new Client({
    user: "postgres", // Database username
    host: "localhost", // Database host
    database: "nodeJs", // Database name
    password: "BoTi3005$$$", // Database password
    port: 5432, // PostgreSQL port (default is 5432)
  });

  try {
    // Connect to the database
    await client.connect();
    console.log("connected to PostgreSQL");

    // Query example
    let response = await client.query(userQuery);

    return response.rows;
  } catch (err) {
    console.error("Error executing query", err.stack);
  } finally {
    await client.end();
  }
}
module.exports = databaseRequest;
