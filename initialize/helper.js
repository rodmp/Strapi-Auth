/**
 * Create Admin User
 *
 * @param {{ username: string, password: string, firstname: string, lastname: string, email: string, blocked: boolean, isActive: boolean }} params
 */
const createAdminUser = async (params) => {
  try {
    const tempPass = params.password;

    //Check if Admin Role exists
    const verifyRole = await strapi.query("role", "admin").findOne({
      code: "strapi-super-admin",
    });
    if (!verifyRole) {
      verifyRole = await strapi.query("role", "admin").create({
        name: "Super Admin",
        code: "strapi-super-admin",
        description:
          "Super Admins can access and manage all features and settings.",
      });
    }

    //Check if admin user exists
    const existingUser = await strapi.query("user", "admin").findOne({
      email: params.email,
    });
    if (existingUser) {
      strapi.log.info(`Admin is existing =>`, params.email);
      return;
    }

    params.roles = [verifyRole.id];
    params.password = await strapi.admin.services.auth.hashPassword(
      params.password
    );

    await strapi.query("user", "admin").create({
      ...params,
    });
    strapi.log.info("Admin account was successfully created.");
    strapi.log.info(`Email => ${params.email}`);
    strapi.log.info(`Password => ${tempPass}`);
  } catch (error) {
    strapi.log.error(`Couldn't create Admin account during bootstrap: `, error);
  }
};

/**
 *
 *
 * @param {*} params
 */
const createUser = async (params) => {
  const advanced = await strapi
    .store({
      environment: "",
      type: "plugin",
      name: "users-permissions",
      key: "advanced",
    })
    .get();

  const { email, username, password, role } = params || {};
  if (!email || !username || !password) {
    strapi.log.error(`Missing Field: =>`, params);
    return null;
  }

  //Check if duplicated username
  const userWithSameUsername = await strapi
    .query("user", "users-permissions")
    .findOne({ username });

  if (userWithSameUsername) {
    strapi.log.info(`The same username is existing: =>`, username);
    return null;
  }

  //Check if duplicated email
  if (advanced.unique_email) {
    const userWithSameEmail = await strapi
      .query("user", "users-permissions")
      .findOne({ email: email.toLowerCase() });

    if (userWithSameEmail) {
      strapi.log.error(`The same email is existing: =>`, email);
      return null;
    }
  }

  const user = {
    ...params,
    provider: "local",
  };
  user.email = user.email.toLowerCase();

  if (!role) {
    const defaultRole = await strapi
      .query("role", "users-permissions")
      .findOne({ type: advanced.default_role }, []);

    user.role = defaultRole.id;
  }

  try {
    const data = await strapi.plugins["users-permissions"].services.user.add(
      user
    );

    strapi.log.info(`Created New User => `, data.username);
    return data;
  } catch (error) {
    strapi.log.error(`Could not create New User => `, username);
    return null;
  }
};

/**
 *
 * @param {Array<string>} usernames
 */
const filterUsersByUserName = async (...usernames) => {
  const allUsers = await strapi.plugins[
    "users-permissions"
  ].services.user.fetchAll();

  return usernames
    .map((username) => {
      const { id } = allUsers.find((user) => user.username === username) || {};
      return id;
    })
    .filter((item) => item);
};

module.exports = {
  createAdminUser,
  createUser,
  filterUsersByUserName,
};
