Organizations.allow({
  insert(userId, doc) {
    return (userId && doc.ownerId === userId);
  },

  update(userId, doc) {
    return (userId && doc.ownerId === userId);
  }
});

Meteor.methods({
  'organizations/join'(organizationId) {
    check(organizationId, String);
    var organization = Organizations.findOne(organizationId);
    organization.addMember(this.userId);
  },

  'organizations/leave'(organizationId) {
    check(organizationId, String);
    var organization = Organizations.findOne(organizationId);
    organization.removeMember(this.userId);
  }
});

Meteor.publish('my-organizations', function () {
  var currentUser = Meteor.users.findOne(this.userId);
  if(!currentUser) return this.ready();

  return Organizations.find(
    {
      $or: [
        {ownerId: this.userId},
        {_id: {$in: currentUser.organizationIds}}
      ]
    },
    {
      fields: {memberIds: 0}
    }
  );
});

Meteor.publish('joinable-organizations', function (searchTerm) {
  var currentUser, selector, regex;

  if (currentUser = Meteor.users.findOne(this.userId)) {
    selector = {
      ownerId: {$ne: this.userId},
      _id: {$nin: currentUser.organizationIds}
    };
    if (searchTerm) {
      regex = new RegExp(searchTerm, 'i');
      _.extend(selector, {name: {$regex: regex}});
    }

    return Organizations.find(selector, {limit: 10});
  } else {
    return this.ready();
  }
});
