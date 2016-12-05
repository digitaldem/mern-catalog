import React from 'react';
import expect, { createSpy } from 'expect';
import { renderComponent, getRenderedComponent, routerSpy } from '../../../../tests';
import { __NAME__ } from '../../../../app/constants';
import Header from '../../../../app/components/common/header';


const state = {
  search: {}
};

const defaultProps = {
  router: routerSpy,
  actions: {
    initItem: createSpy().andReturn(Promise.resolve(true))
  }
};

describe('components.header', function() {
  beforeEach(function() {
    defaultProps.actions.initItem.reset();
    defaultProps.router.push.reset();
  });

  describe('createNewItem', function() {
    const component = renderComponent(<Header {...defaultProps} />, state);

    it('should dispatch the initItem action.', function() {
      component.createNewItem().then(() => {
        expect(defaultProps.actions.initItem).toHaveBeenCalled();
        expect(defaultProps.actions.initItem.calls.length).toEqual(1);
      })
    });

  });

  describe('navigateTo', function() {
    const component = renderComponent(<Header {...defaultProps} />, state);

    it('should push to the router.', function() {
      component.navigateTo();
      expect(defaultProps.router.push).toHaveBeenCalled();
      expect(defaultProps.router.push.calls.length).toEqual(1);
    });

  });

  describe('render', function() {
    const content = getRenderedComponent(<Header {...defaultProps} />, state).textContent;

    it('should have the correct app name.', function() {
      const otherName = 'Wrong Name';

      expect(content.includes(otherName)).toBe(false);
      expect(content.includes(__NAME__)).toBe(true);
    });

  });
});
