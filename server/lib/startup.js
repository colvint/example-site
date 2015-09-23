Meteor.startup(() => {
  var ownerId, orgId, schoolId, user, gradeLevels, gradeLevelNames = [
    'PreK', 'KG', '1st', '2nd', '3rd', '4th', '5th',
    '6th', '7th', '8th', '9th', '10th', '11th', '12th'
  ],
  subjectNames = ['ELA', 'Math', 'Science'];

  // only generate fixture data in development
  if (process.env.NODE_ENV === 'development') {
    // users
    if (Meteor.users.find().count() === 0) {
      ownerId = Accounts.createUser({
        username: 'joe.owner',
        email: 'joe.owner@example.com',
        password: 'foobar'
      });

      // create a SchoolGroup organization
      orgId = Organizations.insert({
        ownerId: ownerId,
        name: 'Global Educational Excellence',
        typeName: 'SchoolGroup'
      });

      Roles.addUsersToRoles(ownerId, 'admin', orgId);

      // add a school to that school group
      // schoolId = Schools.insert({
      //   schoolGroupId: orgId,
      //   name: 'Central Academy'
      // });
      //
      // _.each(gradeLevelNames, function (name) {
      //   GradeLevels.insert({
      //     schoolGroupId: orgId,
      //     name: name
      //   });
      // });
      //
      // _.each(subjectNames, function (name) {
      //   Subjects.insert({
      //     schoolGroupId: orgId,
      //     name: name
      //   });
      // });
      //
      // gradeLevels = GradeLevels.find().fetch();
      //
      // // add 50 students to the school
      // _.each(_.range(50), function (i) {
      //   user = Fake.user({fields: ['name', 'surname']});
      //
      //   Students.insert({
      //     schoolGroupId: orgId,
      //     currentSchoolId: schoolId,
      //     gradeLevelId: _.sample(gradeLevels)._id,
      //     firstName: user.name,
      //     lastName: user.surname
      //   });
      // });

      Accounts.createUser({
        username: 'tomjoyner',
        email: 'tom.joyner@example.com',
        password: 'foobar'
      });
    }
  }
});
