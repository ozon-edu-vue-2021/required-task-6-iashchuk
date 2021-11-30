const express = require("express");
const cors = require("cors");

const { initData } = require("./initData");
const { initApiRouter } = require("./api/routes");

const PORT = 3000;

const initApp = (appData) => {
  const app = express();

  app.use(cors());
  app.use(express.json());

  const apiRouter = initApiRouter(appData);

  app.use("/api", apiRouter);

  app.listen(PORT, (err) => {
    if (err) {
      return console.error(`Server creation error`);
    }

    return console.log(`Server is running on http://localhost:${PORT}`);
  });
};

initData().then(initApp);
