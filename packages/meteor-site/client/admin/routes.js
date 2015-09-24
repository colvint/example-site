Router.route('/admin/settings', {
  controller: 'AdminController',
  template: 'OrganizationsSettings',
  title: 'Settings',
  name: 'organization.settings',
  parent: 'dashboard',

  data: {
    title: 'Settings'
  },

  action() {
    this.render();
    this.render('CurrentOrganizationSelector', {
      to: 'page-header-right'
    });
  }
});
