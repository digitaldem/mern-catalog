import React from 'react';
import expect, { createSpy } from 'expect';
import Landing from '../../../app/components/landing';
import { renderComponent, getRenderedComponent, routerSpy } from '../../../tests';
import items from '../../../mocks/items.json';


const state = {
  search: {
    items: items.results
  }
};

const defaultProps = {
  router: routerSpy,
  actions: {
    searchItems: createSpy()
  },
  params: {},
  location: {},
  routes: {},
  items: items.results
};

describe('components.landing', function() {
  describe('shouldComponentUpdate', function() {
    const component = renderComponent(<Landing {...defaultProps} />, state);

    it('should not need to update by default.', function() {
      expect(component.shouldComponentUpdate(defaultProps, { sortKey: 'name', sortDir: 1 })).toEqual(false);
    });

    it('should update if there is a change to component state.', function() {
      expect(component.shouldComponentUpdate(defaultProps, { sortKey: 'name', sortDir: 0 })).toEqual(true);
    });

    it('should update if there is a change in props.', function() {
      const newProps = Object.assign({}, defaultProps, { items: [] });
      expect(component.shouldComponentUpdate(newProps, null)).toEqual(true);
    });

  });

  describe('componentWillMount', function() {
    beforeEach(function() {
      defaultProps.actions.searchItems.reset();
      renderComponent(<Landing {...defaultProps} />, state);
    });

    it('should dispatch the searchItems action.', function() {
      expect(defaultProps.actions.searchItems).toHaveBeenCalled();
      expect(defaultProps.actions.searchItems.calls.length).toEqual(1);
    });

  });

  describe('render', function() {
    const content = getRenderedComponent(<Landing {...defaultProps} />, state).textContent;

    it('should have the correct name.', function() {
      const otherName = 'Error Page';
      const correctName = 'Name';

      expect(content.includes(otherName)).toBe(false);
      expect(content.includes(correctName)).toBe(true);
    });

  });
});
