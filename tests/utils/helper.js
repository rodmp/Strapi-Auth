const Strapi = require("strapi");
const http = require("http");
const request = require("supertest");

/**
 * Setup Strapi
 */
let instance;

const setupStrapi = async () => {
  if (!instance) {
    await Strapi().load();
    instance = strapi;
    await instance.app
      .use(instance.router.routes()) // populate KOA routes
      .use(instance.router.allowedMethods()); // populate KOA methods

    instance.server = http.createServer(instance.app.callback());
  }
  return instance;
};

/**
 * Create Request Instance
 *
 * @param {*} strapi
 */
const getReqInstance = (strapi) => (mutation) =>
  request(strapi.server)
    .post("/graphql")
    .set("Content-Type", "application/json")
    .set("Accept", "application/json")
    .send({ query: mutation });

/**
 * Create Request Instance
 *
 * @param {*} strapi
 */
const getReqInstanceWithJWT = (strapi) => (jwt) => (mutation) =>
  request(strapi.server)
    .post("/graphql")
    .set("Content-Type", "application/json")
    .set("Accept", "application/json")
    .set("Authorization", `Bearer ${jwt}`)
    .send({ query: mutation });

module.exports = { setupStrapi, getReqInstance, getReqInstanceWithJWT };
