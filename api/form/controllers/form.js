"use strict";
const { sanitizeEntity } = require("strapi-utils");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

const formPermissions = {
  title: [3, 4, 5],
  assigned_to: [3, 4, 5],
  assigned_by: [3],
};

/**
 * Filter entity by role
 *
 * @param {*} entity
 * @param {*} roleId
 */
const filterEntity = (entity, roleId) => {
  Object.keys(formPermissions).map((key) => {
    const permission = formPermissions[key];
    if (!permission.includes(roleId)) {
      delete entity[key];
    }
  });
  return entity;
};

module.exports = {
  async find(ctx) {
    const { id: roleId } = ctx?.state?.user?.role ?? {};
    let entities;
    if (ctx.query._q) {
      entities = await strapi.services.form.search(ctx.query);
    } else {
      entities = await strapi.services.form.find(ctx.query);
    }
    return entities.map((entity) =>
      sanitizeEntity(filterEntity(entity, roleId), {
        model: strapi.models.form,
      })
    );
  },
  async findOne(ctx) {
    const { id: roleId } = ctx?.state?.user?.role ?? {};
    const { id } = ctx.params;
    let entity = await strapi.services.form.findOne({ id });
    return sanitizeEntity(filterEntity(entity, roleId), {
      model: strapi.models.form,
    });
  },
};
