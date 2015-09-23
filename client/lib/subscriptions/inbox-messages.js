Tracker.autorun(function () {
  Meteor.subscribe('unread-messages', Meteor.user());
});
