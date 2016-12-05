import isEmpty from 'lodash/isEmpty';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import TestUtils from 'react-addons-test-utils';
import { createSpy } from 'expect';
import { configureProdStore as configureStore } from '../app/middlewares';


export function getRenderedComponent(component = {}, state = {}) {
  return ReactDOM.findDOMNode(renderComponent(component, state));
}

export function renderComponent(component = {}, state = {}) {
  if (!isEmpty(state)) {
    const store = Object.assign({}, state);
    const provider = TestUtils.renderIntoDocument(<Provider store={ configureStore(store) }>{ component }</Provider>);
    let rendered = TestUtils.findRenderedComponentWithType(provider, component.type);
    while (typeof rendered.getWrappedInstance === 'function') {
      rendered = rendered.getWrappedInstance();
    }
    return rendered;
  }
  return TestUtils.renderIntoDocument(component);
};

export const routerSpy = {
  push: createSpy(),
  replace: createSpy(),
  go: createSpy(),
  goBack: createSpy(),
  goForward: createSpy(),
  setRouteLeaveHook: createSpy(),
  isActive: createSpy(),
  params: {},
  location: {},
  routes: {}
};
