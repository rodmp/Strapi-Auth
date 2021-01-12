const { setupStrapi } = require("./utils/helper");

let strapi; //Global Strapi Instance

beforeAll(async (done) => {
  strapi = await setupStrapi();
  done();
});

it("strapi is defined", () => {
  expect(strapi).toBeDefined();
});
