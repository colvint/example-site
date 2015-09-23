Organizations = new Meteor.Collection("organizations");

Organizations.attachSchema(new SimpleSchema({
  ownerId: {
    type: String,
    denyUpdate: true,
    autoValue() {
      if (!this.isUpdate && !this.isSet){
        return this.userId;
      }
    }
  },

  name: {
    type: String,
    label: 'name',
    allowEdit: true,
    allowFilter: true
  },

  typeName: {
    type: String,
    label: 'type',
    allowedValues: ['SchoolGroup'],
    denyUpdate: true,
    allowEdit: true,
    allowFilter: true
  },

  memberIds: {
    type: [String],
    label: 'members',
    optional: true
  },

  memberCount: {
    type: Number,
    label: 'member count',
    defaultValue: 0,
    allowFilter: true
  }
}));

Organizations.helpers({
  type() {
    var typeConstructor = Meteor.isClient ? window[this.typeName] : global[this.typeName];

    return new typeConstructor(this);
  },

  owner() {
    return Meteor.users.findOne(this.ownerId);
  },

  members() {
    return Meteor.users.find()
  },

  addMember(userId) {
    check(userId, String);

    var user = Meteor.users.findOne(userId);

    if (_.contains(user.organizationIds, this._id)) {
      throw new Meteor.Error('duplicate-organization-membership',
        "User is already a member of the organization.");
    } else if (this.invitationOnly) {
      throw new Meteor.Error('invitation-only',
        "This organization is invitation only.");
    } else {
      Organizations.update(this._id, {
        $push: {memberIds: userId},
        $inc: {memberCount: 1}
      });
      Meteor.users.update(userId, {
        $push: {organizationIds: this._id},
        $set: {currentOrganizationId: this._id}
      });
    }
  },

  removeMember(userId) {
    check(userId, String);
    var user = Meteor.users.findOne(userId);

    Organizations.update(this._id, {
      $pullAll: {memberIds: [userId]},
      $inc: {memberCount: -1}
    });
    Meteor.users.update(userId, {
      $pullAll: {organizationIds: [this._id]},
      $unset: {currentOrganizationId: ''}
    });
  }
});
