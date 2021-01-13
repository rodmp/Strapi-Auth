const {
  setupStrapi,
  getReqInstance,
  getReqInstanceWithJWT,
} = require("../utils/helper");
const { getFormsQuery, getLoginQuery } = require("../utils/queries.js");
const _ = require("lodash");

let strapi; //Global Strapi Instance

let users = [
  {
    username: "doctor_test",
    password: "Test!234",
    email: "doctor_test@gmail.com",
  },
  {
    username: "staff_test",
    password: "Test!234",
    email: "staff_test@gmail.com",
  },
  {
    username: "patient_test",
    password: "Test!234",
    email: "patient_test@gmail.com",
  },
];

describe("Forms =>", () => {
  beforeAll(async (done) => {
    strapi = await setupStrapi();

    //Get jwt tokens for users
    for (let [i, user] of users.entries()) {
      const mutation = getLoginQuery(user.email, user.password);
      const res = await getReqInstance(strapi)(mutation);
      const { jwt } = _.get(res, "body.data.login", {});
      users[i]["jwt"] = jwt;
    }

    done();
  });

  /**
   * should respond with 401
   */
  it("It responds with 401 status code because of invaid jwt token", async () => {
    const mutation = getFormsQuery();
    const res = await getReqInstanceWithJWT(strapi)("test")(mutation).expect(
      200
    );

    const { statusCode } = _.get(
      res,
      "body.errors[0].extensions.exception.output",
      {}
    );
    expect(statusCode).toEqual(401);
  });

  describe("Forms By User", () => {
    for (let i = 0; i < users.length; i++) {
      it(`It responds with 200 status code by ${users[i].username}`, async () => {
        const mutation = getFormsQuery();
        const res = await getReqInstanceWithJWT(strapi)(users[i].jwt)(
          mutation
        ).expect(200);
        const { forms } = _.get(res, "body.data", {});
        expect(forms).toBeDefined();
        strapi.log.info(
          `Forms Response with ${users[i].username}(${users[i].email}) =>`,
          JSON.stringify(forms)
        );
      });
    }
  });
});
