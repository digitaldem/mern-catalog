import React from 'react';
import JsonTable from 'react-json-table';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { isEqual } from '../../utilities';
import { searchItems } from '../../actions/search';


class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.sortResults = this.sortResults.bind(this);
    this.state = { sortKey: 'name', sortDir: 1 };
  }

  componentWillMount() {
    this.props.actions.searchItems();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !isEqual(this.props, nextProps) || !isEqual(this.state, nextState);
  }

  sortResults(e, column) {
    if (this.state.sortKey == column) {
      this.setState({ sortDir: (this.state.sortDir) ? 0 : 1 });
    }
    else {
      this.setState({ sortKey: column, sortDir: 1 });
    }
  }

  render() {
    console.info('render Landing');

    const sortKey = this.state.sortKey;
    const sortDir = this.state.sortDir;
    const columns = [
      { key: 'name', label: 'Name' },
      { key: '_id', label: ' ', cell: (item, columnKey) => (<Link to={`/item/${item._id}`}>Edit</Link>) }
    ];
    const settings = {
      noRowsMessage: ''
    }
    const rows = (sortDir)
      ? this.props.items.sort((a, b) => a[sortKey] > b[sortKey] ? 1 : -1)
      : this.props.items.sort((a, b) => a[sortKey] < b[sortKey] ? 1 : -1);

    return (
      <div className="main">
        <JsonTable rows={rows} columns={columns} settings={settings} onClickHeader={this.sortResults} />
      </div>
    );
  }
}

Landing.propTypes = {
  router: React.PropTypes.object.isRequired,
  actions: React.PropTypes.object.isRequired,
  items: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
};

function mapStateToProps(state) {
  return {
    items: state.search.items
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      searchItems
    }, dispatch)
  };
}

function mergeProps(stateProps, dispatchProps, ownProps) {
  return Object.assign({}, dispatchProps, ownProps, stateProps);
}

export default connect(mapStateToProps, mapDispatchToProps, mergeProps, { withRef: true })(withRouter(Landing, { withRef: true }));
