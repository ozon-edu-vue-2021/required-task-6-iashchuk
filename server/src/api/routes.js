const { Router } = require(`express`);
const { getStaticData } = require("./handlers/getStaticData");
const { getDynamicData } = require("./handlers/getDynamicData");

const initApiRouter = (appData) => {
  const router = new Router();

  router.get("/pagination/static", getStaticData(appData));
  router.get("/pagination/dynamic", getDynamicData(appData));

  return router;
};

module.exports = { initApiRouter };
