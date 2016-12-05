import React from 'react';
import expect, { createSpy } from 'expect';
import Item from '../../../app/components/item';
import { renderComponent, getRenderedComponent, routerSpy } from '../../../tests';
import item from '../../../mocks/item.json';


const state = {
  item: {
    original: item.results[0],
    revision: {}
  }
};

const defaultProps = {
  router: routerSpy,
  actions: {
    initItem: createSpy(),
    setItemProperty: createSpy(),
    loadItem: createSpy(),
    saveItem: createSpy()
  },
  params: {},
  location: {},
  routes: {},
  original: item.results[0],
  revision: {},
  id: null
};

describe('components.item', function() {
  describe('shouldComponentUpdate', function() {
    const component = renderComponent(<Item {...defaultProps} />, state);

    it('should not need to update by default.', function() {
      expect(component.shouldComponentUpdate(defaultProps, null)).toEqual(false);
    });

    it('should update if there is a change to component state.', function() {
      expect(component.shouldComponentUpdate(defaultProps, { change: true })).toEqual(true);
    });

    it('should update if there is a change in props.', function() {
      const newProps = Object.assign({}, defaultProps, { revision: { name: 'update' } });
      expect(component.shouldComponentUpdate(newProps, null)).toEqual(true);
    });

  });

  describe('componentWillMount (create)', function() {
    beforeEach(function() {
      defaultProps.actions.initItem.reset();
      defaultProps.actions.loadItem.reset();
      renderComponent(<Item {...defaultProps} />, state);
    });

    it('should dispatch the initItem action.', function() {
      expect(defaultProps.actions.initItem).toHaveBeenCalled();
      expect(defaultProps.actions.initItem.calls.length).toEqual(1);
      expect(defaultProps.actions.loadItem).toNotHaveBeenCalled();
      expect(defaultProps.actions.loadItem.calls.length).toEqual(0);
    });

  });

  describe('componentWillMount (edit)', function() {
    beforeEach(function() {
      defaultProps.actions.initItem.reset();
      defaultProps.actions.loadItem.reset();
      renderComponent(<Item {...defaultProps} params={{id: 'id'}} />, state);
    });

    it('should dispatch the loadItem action.', function() {
      expect(defaultProps.actions.loadItem).toHaveBeenCalled();
      expect(defaultProps.actions.loadItem.calls.length).toEqual(1);
      expect(defaultProps.actions.initItem).toNotHaveBeenCalled();
      expect(defaultProps.actions.initItem.calls.length).toEqual(0);
    });

  });

  describe('render', function() {
    const content = getRenderedComponent(<Item {...defaultProps} params={{id: null}} />, state).textContent;

    it('should have the correct name.', function() {
      const otherName = 'Error Page';
      const correctName = 'Name';

      expect(content.includes(otherName)).toBe(false);
      expect(content.includes(correctName)).toBe(true);
    });

  });
});
