const { createAdminUser } = require("./helper");

/**
 * Setup Init Default User when environments is `development` mode or DEV_ADMIN_ALLOW is true
 */
module.exports = async () => {
  const adminUser = strapi.config.get("initialContent.adminUser");
  if (adminUser) {
    await createAdminUser(adminUser);
  }
};
