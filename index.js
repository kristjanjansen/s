#!/usr/bin/env node

const express = require("express");
const cors = require("cors");
const open = require("open");
const getPort = require("get-port");
const ip = require("ip");

const path = require("path");

(async () => {
  const port = await getPort({ port: getPort.makeRange(3000, 3100) });
  const url = `http://localhost:${port}`;
  const localUrl = `http://${ip.address()}:${port}`;

  const app = express();

  app.use(express.static(process.cwd()));

  app.use(cors());

  app.get("*", function(req, res) {
    const file = path.join(process.cwd(), "index.html");
    res.sendFile(file);
  });

  app.listen(port);

  console.log(`\x1B[32m${url}\x1B[0m ${localUrl}`);

  await open(url);
})();
