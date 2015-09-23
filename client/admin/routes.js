Router.configure({
  notFoundTemplate: 'NotFound',
  loadingTemplate: 'Loading'
});

AdminController = RouteController.extend({
  layoutTemplate: 'AdminLayout',

  waitOn: function () {
    return Meteor.subscribe('userData');
  },

  onBeforeAction: function () {
    if (Meteor.userId()) {
      this.next();
    } else {
      this.render('AccessDenied');
      this.layout('ErrorLayout');
    }
  }
});
