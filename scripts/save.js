const fs = require("fs");

const INFO_PATH = "./deploy/info.json";

module.exports = function (network, value) {
  let info = {};

  if (fs.existsSync(INFO_PATH)) {
    try {
      const old = JSON.parse(fs.readFileSync(INFO_PATH));
      info = { ...old };
    } catch (error) {}
  }

  info[network] = value;

  fs.writeFileSync(INFO_PATH, JSON.stringify(info));
};
