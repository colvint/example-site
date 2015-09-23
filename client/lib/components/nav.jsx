MeteorSite.Nav = {
  compose(navItems, navName, options) {
    if (typeof options === 'undefined') options = {};

    var Component = ReactMeteor.createClass({
      templateName: navName,
      displayName: navName,

      componentDidMount() {
        this._metisMenufy();
      },

      componentDidUpdate() {
        this._metisMenufy();
      },

      _metisMenufy() {
        $('#side-menu').metisMenu();
      },

      getMeteorState() {
        return {
          currentUser: Meteor.user()
        };
      },

      _navItemPermitted(navItem) {
        if (typeof navItem.permittedRole === 'undefined') return true;

        var user = this.state.currentUser;

        return Roles.userIsInRole(
          user,
          navItem.permittedRole,
          user.currentOrganizationId
        );
      },

      render() {
        var self = this;

        return (
          <ul className="nav" id="side-menu">
            {_.map(navItems, (navItem, i) => {
              if (self._navItemPermitted(navItem)) {
                return (
                  <li key={i}>
                    <a href={navItem.href}>
                      <i className={classNames('fa', navItem.faClass, 'fa-fw')}></i> {navItem.title}
                    </a>
                  </li>
                );
              }
            })}
          </ul>
        );
      }
    });
  }
};
