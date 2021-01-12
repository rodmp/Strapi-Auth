const { setupStrapi } = require("./../utils/helper");
const request = require("supertest");
const _ = require("lodash");

let strapi; //Global Strapi Instance

describe("Users =>", () => {
  beforeAll(async (done) => {
    strapi = await setupStrapi();
    done();
  });

  it("should be passed", async () => {
    const users = strapi.config.get("initialContent.users") || [];

    for (let i = 0; i < users.length; i++) {
      const { email, password } = users[i];
      const jwt = await loginStrapi(strapi)(email, password);
      strapi.log.info(`Got JWT(${email}) => ${jwt}`);
    }
  });
});

/**
 * Test login API
 * Returns valid JWT token for authenticated
 *
 * @param {*} email
 * @param {*} password
 */
const loginStrapi = (strapi) => async (email, password) => {
  const mutation = `mutation {
    login(input: { identifier: "${email}", password: "${password}" }) {
      jwt,
      user{
        email,
        username,
      }
    }
  }`;

  const res = await request(strapi.server)
    .post("/graphql")
    .set("Content-Type", "application/json")
    .set("Accept", "application/json")
    .send({ query: mutation });
  const { jwt, user } = _.get(res, "body.data.login", {});
  expect(user.email).toEqual(email);
  return jwt;
};
