import React from 'react';
import Header from './common/header';
import Footer from './common/footer';
import DevTools from './common/devtools';


class Components extends React.Component {
  render() {
    console.info('render Components');

    return (
      <div>
        <Header />
        { this.props.children }
        <Footer />
        <DevTools />
      </div>
    );
  }
}

Components.propTypes = {
  children: React.PropTypes.element.isRequired
};

export default Components;
