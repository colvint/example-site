Router.route('/admin/organizations', {
  controller: 'AdminController',
  template: 'OrganizationsList',
  title: 'My Organizations',
  name: 'my-organizations',
  parent: 'dashboard',

  data: {
    title: 'My Organizations'
  },

  action: function () {
    this.render();
  }
});

Router.route('/admin/organizations/:_id', {
  controller: 'AdminController',
  template: 'OrganizationsExtended',
  name: 'organizations-extended',
  parent: 'my-organizations',

  title: function () {
    return this.data().title;
  },

  data: function () {
    var organization = Organizations.findOne(this.params._id);

    return {
      title: organization.name
    };
  },

  action: function () {
    this.render();
  }
});
