import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import { bindActionCreators } from 'redux';
import { isEmpty } from 'lodash';
import { isEqual } from '../../utilities';
import { initItem, setItemProperty, loadItem, saveItem } from '../../actions/item';


function Heading(props) {
  if (props.id) {
    return <div>Item {props.id}</div>;
  }
  else {
    return <div>Create new Item</div>;
  }
}

class Item extends React.Component {
  constructor() {
    super();
    this.setName = this.setName.bind(this);
    this.saveItem = this.saveItem.bind(this);
  }

  componentWillMount() {
    if (this.props.id) {
      this.props.actions.loadItem(this.props.id);
    }
    else {
      this.props.actions.initItem();
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !isEqual(this.props, nextProps) || !isEqual(this.state, nextState);
  }

  setName(e) {
    this.props.actions.setItemProperty('name', e.target.value);
  }

  saveItem() {
    this.props.actions.saveItem(this.props.id).then(() => {
      this.props.router.push(`/item/${this.props.original._id}`);
    })
  }

  render() {
    console.info('render Item');
    const itemName = this.props.revision.name || this.props.original.name || '';

    return (
      <div className="main">
        <Heading id={this.props.id} />
        <br/>
        <div>
          Name: <input type="text" value={itemName} onChange={this.setName} />
        </div>
        <div>
          &nbsp;
        </div>
        <div>
          <input type="submit" onClick={this.saveItem} disabled={isEmpty(this.props.revision)}/>
        </div>
      </div>
    );
  }
}

Item.propTypes = {
  router: React.PropTypes.object.isRequired,
  actions: React.PropTypes.object.isRequired,
  original: React.PropTypes.object.isRequired,
  revision: React.PropTypes.object.isRequired,
  id: React.PropTypes.string
};

function mapStateToProps(state) {
  return {
    original: state.item.original,
    revision: state.item.revision
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      initItem,
      setItemProperty,
      loadItem,
      saveItem
    }, dispatch)
  };
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  return Object.assign({}, dispatchProps, ownProps, stateProps, { id: ownProps.params.id || null });
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps, { withRef: true })(withRouter(Item, { withRef: true }));
