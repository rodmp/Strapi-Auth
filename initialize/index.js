const setupDefaultAdminUser = require("./setupDefaultAdminUser");
const setupDefaultUserRoles = require("./setupDefaultUserRoles");
const setupDefaultUsers = require("./setupDefaultUsers");
const setupDefaultForms = require("./setupDefaultForms");

const initialize = async () => {
  //Setup Default Admin User
  await setupDefaultAdminUser();

  //Setup Default Users
  await setupDefaultUsers();

  //Setup Default User Roles
  await setupDefaultUserRoles();

  //Setup Default Forms
  await setupDefaultForms();
};

module.exports = { initialize };
