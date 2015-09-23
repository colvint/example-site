Accounts.onCreateUser((options, user) => {
  user.organizationIds = [];
  if (options.profile) user.profile = options.profile;

  return user;
});

Meteor.publish("userData", function () {
  if (this.userId) {
    return Meteor.users.find(
      {_id: this.userId},
      {
        fields: {
          organizationIds: 1,
          currentOrganizationId: 1,
          currentSchoolId: 1
        }
      }
    );
  } else {
    this.ready();
  }
});

Meteor.methods({
  'users/switchToOrganization'(organizationId) {
    check(organizationId, String);

    if (!this.userId) throw new Meteor.Error('not-logged-in', "You must be logged in to switch organizations.");

    Meteor.users.findOne(this.userId).switchToOrganization(organizationId);
  },

  'users/setCurrentSchool'(schoolId) {
    check(schoolId, String);

    if (!this.userId) throw new Meteor.Error('not-logged-in', "You must be logged in to set your current school.");

    Meteor.users.findOne(this.userId).setCurrentSchool(schoolId);
  }
});
