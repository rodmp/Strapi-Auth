const _ = require("lodash");
const { filterUsersByUserName } = require("./helper");

/**
 * Setup Default User Roles
 */
module.exports = async () => {
  const lang = "en";
  const service = strapi.plugins["users-permissions"].services.userspermissions;
  const plugins = await service.getPlugins(lang);

  const permissions = await service.getActions(plugins);

  const roles = await service.getRoles();

  const getRole = async (name) => {
    const { id } = _.find(roles, (x) => x.name === name) || {};
    if (!id) return null;
    return await service.getRole(id, plugins);
  };

  const usersRoles = strapi.config.get("initialContent.usersRoles") || [];
  for (let i = 0; i < usersRoles.length; i++) {
    const newRole = {
      ...usersRoles[i],
      permissions: {
        ...permissions,
        ...usersRoles[i].permissions,
      },
      users: await filterUsersByUserName(...usersRoles[i].users),
    };

    const existingRole = await getRole(newRole.name);
    if (existingRole) {
      continue;
    }
    await service.createRole(newRole);
  }
};
