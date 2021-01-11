const { createUser } = require("./helper");

/**
 * Setup Default Users
 */
module.exports = async () => {
  const users = strapi.config.get("initialContent.users") || [];
  let newUsers = [];

  for (let i = 0; i < users.length; i++) {
    const newUser = await createUser(users[i]);
    if (newUser) {
      newUsers.push(newUser);
    }
  }

  return newUsers;
};
