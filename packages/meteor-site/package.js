Package.describe({
  name: 'meteor-site',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.0.1');
  api.use('ecmascript');

  api.use([
    'tauruscolvin:meteor-react-bootstrap'
  ]);

  api.addFiles([
    'client/compatibility/metisMenu.js',
    'client/meteor-site.js',
    'client/lib/nav.jsx'
  ], 'client');

  api.export('MeteorSite', 'client');
});
