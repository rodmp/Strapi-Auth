/**
 * Generate GraphQL Query
 *
 * @param {*} email
 * @param {*} password
 */
const getLoginQuery = (email, password) => `mutation {
  login(input: { identifier: "${email}", password: "${password}" }) {
    jwt,
    user{
      email,
      username,
    }
  }
}`;

/**
 * Generate Forms Query
 */
const getFormsQuery = () => `query {
  forms{
    title,
  	assigned_to{
      username,
      email
    }
  	assigned_by{
      username,
      email
    }
  }
}`;

module.exports = {
  getLoginQuery,
  getFormsQuery,
};
