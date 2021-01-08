const fs = require("fs");
const { setupStrapi } = require("./helpers/strapi");
const path = require("path");

/**
 * this code is called once before any test is called
 */
beforeAll(async (done) => {
  const setup = await setupStrapi(); // singleton so it can be called many times
  Promise.all([setup]).then(() => {
    console.log("setup strapi");
    done();
  });
});

/**
 * this code is called once before all the tested are finished
 */
afterAll(async (done) => {
  const dbSettings = strapi.config.get("database.connections.default.settings");
  if (dbSettings && dbSettings.filename) {
    const tmpDbFile = path.join(__dirname, `../${dbSettings.filename}`);
    if (fs.existsSync(tmpDbFile)) {
      fs.unlinkSync(tmpDbFile);
    }
  }
  done();
});

it("strapi is defined", () => {
  expect(strapi).toBeDefined();
});
