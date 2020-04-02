const app = require('./app')
const serverConfig = require('./src/config/server');

app.get("/", (req, res) => {
  res.send("Invalid endpoint");
});

app.listen(
  serverConfig.localhostPort,
  serverConfig.localhostServerAddress,
  res => {
    console.log("Server started successfully in " + serverConfig.localhostPort);
  }
);