Router.configure({
  notFoundTemplate: 'NotFound',
  loadingTemplate: 'Loading'
});

AdminController = RouteController.extend({
  layoutTemplate: 'AdminLayout',

  waitOn() {
    return Meteor.subscribe('userData');
  },

  onBeforeAction() {
    if (Meteor.userId()) {
      this.next();
    } else {
      this.render('AccessDenied');
      this.layout('ErrorLayout');
    }
  }
});
