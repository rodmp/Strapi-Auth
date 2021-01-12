const { filterUsersByUserName } = require("./helper");

module.exports = async () => {
  const forms = strapi.config.get("initialContent.forms") || [];

  for (let i = 0; i < forms.length; i++) {
    let form = forms[i];
    form = {
      ...form,
      assigned_to: (await filterUsersByUserName(form.assigned_to))[0],
      assigned_by: (await filterUsersByUserName(form.assigned_by))[0],
    };

    let formEntity = await strapi.services.form.findOne({ title: form.title });
    if (formEntity) {
      strapi.log.info(`Form is existing =>`, formEntity.title);
      return;
    }

    return await strapi.services.form.create(form);
  }
};
