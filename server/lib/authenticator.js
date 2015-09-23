// this will be used to allow other meteor servers to authenticate
// themselves against the client of this app

// Meteor.methods({
//   "getUserByToken": function(loginToken) {
//     var hashedToken = loginToken && Accounts._hashLoginToken(loginToken);
//     var selector = {'services.resume.loginTokens.hashedToken': hashedToken};
//     var options = {fields: {_id: 1}};
//
//     var user = Meteor.users.findOne(selector, options);
//     return (user)? user._id : null;
//   }
// });
