Package.describe({
  name: 'meteor-site',
  version: '0.0.1',
  summary: '',
  git: '',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.0.1');
  api.use('ecmascript');

  api.use([
    'tauruscolvin:meteor-react-bootstrap',
    'iron:router'
  ]);

  api.addFiles([
    'client/compatibility/metisMenu.js',
    'client/meteor-site.js',
    'client/lib/nav.jsx',
    'client/lib/components/current-organization-selector.jsx',
    'client/admin/routes.js'
  ], 'client');

  api.export('MeteorSite', 'client');
});
