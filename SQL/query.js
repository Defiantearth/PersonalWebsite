const sql = require("mssql");
const config = require("./config.js");

async function databaseRequest(userQuery) {
  try {
    // Connect to the database
    let pool = await sql.connect(config);

    // Execute a query
    let result = await pool.request().query(userQuery);

    //console.log(result);
    // Close the connection
    sql.close();
    return result;
    //result.recordset[1].ID;
  } catch (err) {
    console.error("SQL error", err);
  }

  // Execute the query function
  queryDatabase();
}

module.exports = databaseRequest;
