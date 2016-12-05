import React from 'react';
import expect from 'expect';
import { getRenderedComponent } from '../../../tests';
import Error from '../../../app/components/error';


const defaultProps = { };

describe('components.error', function() {
  describe('render', function() {
    const content = getRenderedComponent(<Error {...defaultProps } />).textContent;

    it('should have the correct name.', function() {
      const otherName = 'Landing Page';
      const correctName = 'Error Page';

      expect(content.includes(otherName)).toBe(false);
      expect(content.includes(correctName)).toBe(true);
    });

  });
});
