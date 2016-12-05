import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router'
import { bindActionCreators } from 'redux';
import { isString } from 'lodash';
import { initItem } from '../../../actions/item';
import { __NAME__ } from '../../../constants';


class Header extends React.Component {
  constructor() {
    super();
    this.navigateTo = this.navigateTo.bind(this);
    this.createNewItem = this.createNewItem.bind(this);
  }

  navigateTo(route) {
    if (isString(route)) {
      this.props.router.push(route);
    }
    else {
      this.props.router.push('/');
    }
  }

  createNewItem() {
    return this.props.actions.initItem().then(() => {
      this.navigateTo('/item/');
    });
  }

  render() {
    console.info('render Header');

    return (
      <div className="header">
        <div className="headerLeft">
          <h3 className="pointer" onClick={this.navigateTo}>{ __NAME__ }</h3>
        </div>
        <div className="headerRight">
          <Link className="pointer" onClick={this.createNewItem}>Create new item</Link>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  router: React.PropTypes.object.isRequired,
  actions: React.PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return { };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      initItem
    }, dispatch)
  };
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  return Object.assign({}, dispatchProps, ownProps, stateProps);
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps, { withRef: true })(withRouter(Header, { withRef: true }));
