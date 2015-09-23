Tracker.autorun(function () {
  Meteor.subscribe('my-organizations', Meteor.user());
});
