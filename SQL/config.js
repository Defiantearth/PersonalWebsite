const config = {
  user: "Gavin",
  password: "Gavin",
  driver: "msnodesqlv8",
  server: "localhost\\SQLEXPRESS", // e.g., 'localhost\\SQLEXPRESS'
  database: "nodeJs",
  options: {
    trustedConnection: true, // Use trusted connection for Windows Authentication
    encrypt: true, // Use this if you're on Windows Azure
    trustServerCertificate: true, // Change to true for local dev / self-signed certs
  },
};

module.exports = config;
