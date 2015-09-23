ReactMeteor.createClass({
  templateName: 'CurrentOrganizationSelector',
  displayName: 'CurrentOrganizationSelector',

  getInitialState() {
    return {
      isOpen: false
    }
  },

  getMeteorState() {
    var currentOrganization = Meteor.user().currentOrganization() || {};

    return {
      organizations: Organizations.find().fetch(),
      currentOrganizationName: currentOrganization.name
    }
  },

  open() {
    this.setState({
      isOpen: true
    });
  },

  close() {
    this.setState({
      isOpen: false
    })
  },

  setCurrent(organizationId) {
    Meteor.call('users/switchToOrganization', organizationId);
  },

  render() {
    var modalContent, classes, currentOrganizationName,
        btnDisabled = false, setCurrentCtrl;

    if (_.size(this.state.organizations) > 0) {
      modalContent = (
        <ReactBootstrap.Table
          className="table table-bordered table-striped table-hover">
          <thead>
            <tr>
              <td>Organization</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {_.map(this.state.organizations, (organization, i) => {
              if (organization._id === Meteor.user().currentOrganizationId) {
                setCurrentCtrl = (<i>Current</i>);
              } else {
                setCurrentCtrl = (
                  <ReactBootstrap.Button
                    bsStyle='success'
                    onClick={this.setCurrent.bind(this, organization._id)}>
                    Set Current
                  </ReactBootstrap.Button>
                )
              }

              return (
                <tr key={i}>
                  <td>{organization.name}</td>
                  <td>
                    {setCurrentCtrl}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </ReactBootstrap.Table>
      );
    } else {
      modalContent = (
        <ReactBootstrap.Alert bsStyle='info'>
          <h4>There aren't any organizations available.</h4>
          <p>
            Check back soon or create the first one!
          </p>
        </ReactBootstrap.Alert>
      );
    }

    return (
      <span className='pull-right'>
        <ReactBootstrap.Button
          bsStyle='success'
          onClick={this.open}
          disable={btnDisabled}>
          {this.state.currentOrganizationName || 'Set Current Organization'}
        </ReactBootstrap.Button>

        <ReactBootstrap.Modal show={this.state.isOpen} onHide={this.close}>
          <ReactBootstrap.Modal.Header closeButton>
            Set Current Organization
          </ReactBootstrap.Modal.Header>
          <ReactBootstrap.Modal.Body>
            {modalContent}
          </ReactBootstrap.Modal.Body>
          <ReactBootstrap.Modal.Footer>
            <ReactBootstrap.Button onClick={this.close}>
              Done
            </ReactBootstrap.Button>
          </ReactBootstrap.Modal.Footer>
        </ReactBootstrap.Modal>
      </span>
    );
  }
});
