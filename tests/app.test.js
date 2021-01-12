const { setupStrapi } = require("./utils/helper");

let strapi; //Global Strapi Instance

beforeAll(async () => {
  strapi = await setupStrapi();
});

it("strapi is defined", () => {
  expect(strapi).toBeDefined();
});
