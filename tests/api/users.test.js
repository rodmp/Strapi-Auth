const { setupStrapi, getReqInstance } = require("./../utils/helper");
const { getLoginQuery } = require("./../utils/queries.js");
const _ = require("lodash");

let strapi; //Global Strapi Instance

describe("Users =>", () => {
  beforeAll(async (done) => {
    strapi = await setupStrapi();
    done();
  });

  /**
   * should respond with 200
   */
  it("It responds with 200 status code and JWT", async () => {
    const email = "andrescox111@gmail.com";
    const password = "Test!234";

    const mutation = getLoginQuery(email, password);
    const res = await getReqInstance(strapi)(mutation).expect(200);

    const { jwt, user } = _.get(res, "body.data.login", {});
    const { statusCode } = _.get(
      res,
      "body.errors[0].extensions.exception.data",
      {}
    );
    expect(statusCode).toBeUndefined();
    expect(jwt).toBeDefined();
    strapi.log.info(`JWT Token(${email}) => ${jwt}`);
    expect(user.email).toEqual(email);
  });

  /**
   * should respond with 400
   */
  it("It responds with 400 status code because of invaid credentials", async () => {
    const email = "test@gmail.com";
    const password = "Test!234";

    const mutation = getLoginQuery(email, password);
    const res = await getReqInstance(strapi)(mutation).expect(200);
    const { statusCode } = _.get(
      res,
      "body.errors[0].extensions.exception.data",
      {}
    );
    expect(statusCode).toEqual(400);
  });
});
