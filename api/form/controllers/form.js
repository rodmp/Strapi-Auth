"use strict";
const { sanitizeEntity } = require("strapi-utils");
const _ = require("lodash");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

/**
 * Filter entity by role
 *
 * @param {*} entity
 * @param {*} roleId
 */
const filterEntity = (permissions, entity) => {
  const newEntity = Object.keys(entity).reduce((acc, key) => {
    const isEnabled = _.get(permissions, `${key}.enabled`, false);
    if (isEnabled) {
      acc[key] = entity[key];
    }
    return acc;
  }, {});
  return newEntity;
};

const getPermissions = async (roleId) => {
  const lang = "en";

  const service = strapi.plugins["users-permissions"].services.userspermissions;

  const plugins = await service.getPlugins(lang);

  const { permissions } = (await service.getRole(roleId, plugins)) || {};
  return permissions;
};

/**
 * Get Form permissions
 *
 * @param {*} permissions
 */
const getFormFieldPermissions = (permissions) =>
  _.get(permissions, "application.controllers.form", {});

module.exports = {
  async find(ctx) {
    const roleId = _.get(ctx, "state.user.role.id");
    const permissions = getFormFieldPermissions(await getPermissions(roleId));
    if (!permissions) {
      return null;
    }

    let entities;
    if (ctx.query._q) {
      entities = await strapi.services.form.search(ctx.query);
    } else {
      entities = await strapi.services.form.find(ctx.query);
    }

    return entities.map((entity) =>
      sanitizeEntity(filterEntity(permissions, entity), {
        model: strapi.models.form,
      })
    );
  },

  async findOne(ctx) {
    const roleId = _.get(ctx, "state.user.role.id");
    const permissions = getFormFieldPermissions(await getPermissions(roleId));
    if (!permissions) {
      return null;
    }

    const { id } = ctx.params;
    let entity = await strapi.services.form.findOne({ id });

    return sanitizeEntity(filterEntity(permissions, entity), {
      model: strapi.models.form,
    });
  },

  async create(ctx) {
    let entity;

    const roleId = _.get(ctx, "state.user.role.id");
    const permissions = getFormFieldPermissions(await getPermissions(roleId));
    if (!permissions) {
      return null;
    }

    if (ctx.is("multipart")) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.form.create(
        filterEntity(permissions, data),
        {
          files,
        }
      );
    } else {
      entity = await strapi.services.form.create(
        filterEntity(permissions, ctx.request.body)
      );
    }

    return sanitizeEntity(entity, { model: strapi.models.form });
  },

  async update(ctx) {
    const { id } = ctx.params;

    const roleId = _.get(ctx, "state.user.role.id");
    const permissions = getFormFieldPermissions(await getPermissions(roleId));
    if (!permissions) {
      return null;
    }

    let entity;
    if (ctx.is("multipart")) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.form.update(
        { id },
        filterEntity(permissions, data),
        {
          files,
        }
      );
    } else {
      entity = await strapi.services.form.update(
        { id },
        filterEntity(permissions, ctx.request.body)
      );
    }

    return sanitizeEntity(entity, { model: strapi.models.form });
  },

  async delete(ctx) {
    const { id } = ctx.params;

    const entity = await strapi.services.form.delete({ id });

    return sanitizeEntity(entity, { model: strapi.models.form });
  },
};
