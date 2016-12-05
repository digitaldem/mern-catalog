import React from 'react';
import expect from 'expect';
import { getRenderedComponent } from '../../../../tests';
import { __VERSION__ } from '../../../../app/constants';
import Footer from '../../../../app/components/common/footer';


const defaultProps = {
  currentYear: new Date().getFullYear()
};

describe('components.footer', function() {
  describe('render', function() {
    const content = getRenderedComponent(<Footer {...defaultProps } />).textContent;

    it('should have the correct year.', function() {
      const otherYear = defaultProps.currentYear + 1;

      expect(content.includes(otherYear)).toBe(false);
      expect(content.includes(defaultProps.currentYear)).toBe(true);
    });

    it('should have the correct version.', function() {
      const otherVersion = '0.0.0';

      expect(content.includes(otherVersion)).toBe(false);
      expect(content.includes(__VERSION__)).toBe(true);
    });

  });
});
