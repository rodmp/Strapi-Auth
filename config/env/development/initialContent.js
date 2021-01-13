module.exports = ({ env }) => ({
  adminUser: {
    username: process.env.DEV_ADMIN_USERNAME || "admin",
    password: process.env.DEV_ADMIN_PASSWORD || "admin",
    firstname: process.env.DEV_ADMIN_FIRSTNAME || "Admin",
    lastname: process.env.DEV_ADMIN_LASTNAME || "Admin",
    email: process.env.DEV_ADMIN_EMAIL || "admin@strapi.dev",
    blocked: false,
    isActive: true,
  },
  users: [
    {
      username: "doctor_test",
      password: "Test!234",
      email: "doctor_test@gmail.com",
      confirmed: false,
      blocked: false,
      created_by: 1,
      updated_by: 1,
    },
    {
      username: "staff_test",
      password: "Test!234",
      email: "staff_test@gmail.com",
      confirmed: false,
      blocked: false,
      created_by: 1,
      updated_by: 1,
    },
    {
      username: "patient_test",
      password: "Test!234",
      email: "patient_test@gmail.com",
      confirmed: false,
      blocked: false,
      created_by: 1,
      updated_by: 1,
    },
  ],
  usersRoles: [
    {
      name: "Doctor",
      description: "Doctor Role",
      permissions: {
        application: {
          controllers: {
            form: {
              find: {
                enabled: true,
                policy: "",
              },
              findOne: {
                enabled: true,
                policy: "",
              },
              count: {
                enabled: true,
                policy: "",
              },
              create: {
                enabled: true,
                policy: "",
              },
              update: {
                enabled: true,
                policy: "",
              },
              delete: {
                enabled: true,
                policy: "",
              },
              title: {
                enabled: true,
                policy: "",
              },
              assigned_to: {
                enabled: true,
                policy: "",
              },
              assigned_by: {
                enabled: true,
                policy: "",
              },
            },
          },
        },
      },
      users: ["doctor_test"],
    },
    {
      name: "Staff",
      description: "Staff Role",
      permissions: {
        application: {
          controllers: {
            form: {
              find: {
                enabled: true,
                policy: "",
              },
              findOne: {
                enabled: true,
                policy: "",
              },
              count: {
                enabled: true,
                policy: "",
              },
              create: {
                enabled: true,
                policy: "",
              },
              update: {
                enabled: true,
                policy: "",
              },
              delete: {
                enabled: true,
                policy: "",
              },
              title: {
                enabled: true,
                policy: "",
              },
              assigned_to: {
                enabled: true,
                policy: "",
              },
              assigned_by: {
                enabled: true,
                policy: "",
              },
            },
          },
        },
      },
      users: ["staff_test"],
    },
    {
      name: "Patient",
      description: "Patient Role",
      permissions: {
        application: {
          controllers: {
            form: {
              find: {
                enabled: true,
                policy: "",
              },
              findOne: {
                enabled: true,
                policy: "",
              },
              count: {
                enabled: true,
                policy: "",
              },
              create: {
                enabled: true,
                policy: "",
              },
              update: {
                enabled: true,
                policy: "",
              },
              delete: {
                enabled: true,
                policy: "",
              },
              title: {
                enabled: true,
                policy: "",
              },
              assigned_to: {
                enabled: true,
                policy: "",
              },
              assigned_by: {
                enabled: false,
                policy: "",
              },
            },
          },
        },
      },
      users: ["patient_test"],
    },
  ],
  forms: [
    {
      title: "test_form",
      assigned_to: "patient_test",
      assigned_by: "doctor_test",
    },
  ],
});
