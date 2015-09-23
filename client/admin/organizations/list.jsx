var SwitchToAction = React.createClass({
  switchTo(organizationId) {
    Meteor.call('users/switchToOrganization', organizationId);
    this.props.onHide();
  },

  render() {
    var organization = this.props.item;

    return (
      <ReactBootstrap.Modal
        show={this.props.show}
        onHide={this.props.onHide}>
        <ReactBootstrap.Modal.Header closeButton>
          {this.props.title}
        </ReactBootstrap.Modal.Header>
        <ReactBootstrap.Modal.Body>
          <ReactBootstrap.Button
            bsStyle='danger'
            onClick={this.switchTo.bind(this, organization._id)}>
            Switch to {organization.name}
          </ReactBootstrap.Button>
        </ReactBootstrap.Modal.Body>
      </ReactBootstrap.Modal>
    );
  }
});

var LeaveAction = React.createClass({
  leave(organizationId) {
    Meteor.call('organizations/leave', organizationId);
    this.props.onHide();
  },

  render() {
    var organization = this.props.item;

    return (
      <ReactBootstrap.Modal show={this.props.show} onHide={this.props.onHide}>
        <ReactBootstrap.Modal.Header closeButton>
          Leave Organization
        </ReactBootstrap.Modal.Header>
        <ReactBootstrap.Modal.Body>
          <p>Really leave {organization.name}?</p>
        </ReactBootstrap.Modal.Body>
        <ReactBootstrap.Modal.Footer>
          <ReactBootstrap.Button onClick={this.props.onHide}>
            Cancel
          </ReactBootstrap.Button>
          <ReactBootstrap.Button bsStyle='danger' onClick={this.leave.bind(this, organization._id)}>
            Yes, Leave
          </ReactBootstrap.Button>
        </ReactBootstrap.Modal.Footer>
      </ReactBootstrap.Modal>
    );
  }
});

var JoinAction = ReactMeteor.createClass({
  startMeteorSubscriptions() {
    Meteor.subscribe(
      'joinable-organizations',
      Session.get('joinableOrganizationsSearchTerm')
    );
  },

  getMeteorState() {
    var user = Meteor.user() || {};

    return {
      joinableOrganizations: Organizations.find(
        {
          ownerId: {$ne: user._id},
          _id: {$nin: user.organizationIds || []}
        }
      ).fetch()
    };
  },

  join(organizationId) {
    Meteor.call('organizations/join', organizationId);
  },

  searchTermChanged(event) {
    Session.set(
      'joinableOrganizationsSearchTerm',
      event.target.value
    );
  },

  render() {
    var item = this.props.item, tableBody;

    if (_.size(this.state.joinableOrganizations) > 0) {
      tableBody = (
        <tbody>
          {_.map(this.state.joinableOrganizations, (organization, i) => {
            return (
              <tr key={i}>
                <td>{organization.name}</td>
                <td>
                  <ReactBootstrap.Button
                    bsStyle='success'
                    onClick={this.join.bind(this, organization._id)}>
                    Join
                  </ReactBootstrap.Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      );
    } else {
      tableBody = (
        <tbody>
          <tr>
            <td>
              <ReactBootstrap.Alert bsStyle='info'>
                <h4>No more available organizations</h4>
                <p>
                  There aren't any more organizations available to join at this time.
                  Check back soon or create your own organization and invite others to join!
                </p>
              </ReactBootstrap.Alert>
            </td>
            <td></td>
          </tr>
        </tbody>
      );
    }

    return (
      <ReactBootstrap.Modal show={this.props.show} onHide={this.props.onHide}>
        <ReactBootstrap.Modal.Header closeButton>
          Join an organization
        </ReactBootstrap.Modal.Header>
        <ReactBootstrap.Modal.Body>
          <ReactBootstrap.Table
            className="table table-bordered table-striped table-hover">
            <thead>
              <tr>
                <td>
                  <ReactBootstrap.Input
                    type='text'
                    placeholder='Search for organizations to join'
                    onChange={this.searchTermChanged}/>
                </td>
                <td></td>
              </tr>
            </thead>
            {tableBody}
          </ReactBootstrap.Table>
        </ReactBootstrap.Modal.Body>
        <ReactBootstrap.Modal.Footer>
          <ReactBootstrap.Button onClick={this.props.onHide}>
            Done
          </ReactBootstrap.Button>
        </ReactBootstrap.Modal.Footer>
      </ReactBootstrap.Modal>
    );
  }
});

var selector = () => {
  if (Meteor.user()) {
    return {
      $or: [
        {ownerId: Meteor.userId()},
        {_id: {$in: Meteor.user().organizationIds}}
      ]
    }
  } else {
    return {};
  }
}

CollectionManager.compose(Organizations, {
  templateName: 'OrganizationsManager',
  selector: selector,

  itemActions: {
    switchTo: {
      title: "Switch to this organization",
      modal: SwitchToAction
    },
    leave: {
      title: "Leave this organization",
      modal: LeaveAction
    }
  },

  collectionActions: {
    join: {
      title: "Join",
      modal: JoinAction
    }
  }
});
