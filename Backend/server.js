require("dotenv").config();
const app = require("./src/app");
const PORT = process.env.PORT;
const connectToDB = require("./src/config/database");
const cron = require("node-cron");
const http = require("http");

connectToDB();

const server = app.listen(PORT, () => {
  console.log(`Server started at PORT: ${PORT}`);
});

// Keep server alive - ping every 10 minutes to prevent Render free tier sleep
cron.schedule("*/10 * * * *", () => {
  const options = {
    hostname: "localhost",
    port: PORT,
    path: "/",
    method: "GET",
  };

  const req = http.request(options, (res) => {
    console.log(`[KEEPALIVE] Ping successful - ${new Date().toISOString()}`);
  });

  req.on("error", (e) => {
    console.error(`[KEEPALIVE] Ping failed: ${e.message}`);
  });

  req.end();
});
