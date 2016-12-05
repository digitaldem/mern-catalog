import React from 'react';
import { __VERSION__ } from '../../../constants';


class Footer extends React.Component {
  render() {
    console.info('render Footer');

    return (
      <div className="footer">
        &copy; Copyright { this.props.currentYear } { this.props.copyright }<br />
        Version { __VERSION__ }<br />
      </div>
    );
  }
}

Footer.propTypes = {
  currentYear: React.PropTypes.number.isRequired,
  copyright: React.PropTypes.string.isRequired
};

Footer.defaultProps = {
  currentYear: new Date().getFullYear(),
  copyright: ''
};

export default Footer;
