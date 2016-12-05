import expect from 'expect';
import { ActionTypes } from '../../app/constants/actiontypes';
import reducers from '../../app/reducers';
import reducer from '../../app/reducers/item';
import item from '../../mocks/item.json';


describe('reducers.item', () => {
  it('should return the initial state.', () => {
    expect(reducer(undefined, {}))
      .toEqual({
        isLoading: false,
        isSaving: false,
        original: {},
        revision: {}});
  });

  describe('INIT_ITEM', function() {
    it('should handle INIT_ITEM.', () => {
      expect(reducer({}, { type: ActionTypes.INIT_ITEM }))
        .toEqual({
          original: {},
          revision: {}});
    });

  });

  describe('SET_ITEM_PROPERTY', function() {
    it('should handle SET_ITEM_PROPERTY.', () => {
      expect(reducer({}, { type: ActionTypes.SET_ITEM_PROPERTY, property: 'prop', value: 'test' }))
        .toEqual({
          revision: {
            prop: 'test'}});
    });

  });

  describe('REQUEST_LOAD_ITEM', function() {
    it('should handle REQUEST_LOAD_ITEM.', () => {
      expect(reducer({}, { type: ActionTypes.REQUEST_LOAD_ITEM }))
        .toEqual({
          isLoading: true});
    });

    it('should handle RECEIVE_LOAD_ITEM_SUCCESS.', () => {
      expect(reducer({}, { type: ActionTypes.RECEIVE_LOAD_ITEM_SUCCESS, response: item }))
        .toEqual({
          isLoading: false,
          original: item.results[0],
          revision: {}});
    });

    it('should handle RECEIVE_LOAD_ITEM_ERROR.', () => {
      expect(reducer({}, { type: ActionTypes.RECEIVE_LOAD_ITEM_ERROR }))
        .toEqual({
          isLoading: false,
          original: {},
          revision: {}});
    });

  });

  describe('REQUEST_SAVE_ITEM', function() {
    it('should handle REQUEST_SAVE_ITEM.', () => {
      expect(reducer({}, { type: ActionTypes.REQUEST_SAVE_ITEM }))
        .toEqual({
          isSaving: true});
    });

    it('should handle RECEIVE_SAVE_ITEM_SUCCESS.', () => {
      expect(reducer({}, { type: ActionTypes.RECEIVE_SAVE_ITEM_SUCCESS, response: item }))
        .toEqual({
          isSaving: false,
          original: item.results[0],
          revision: {}});
    });

    it('should handle RECEIVE_SAVE_ITEM_ERROR.', () => {
      expect(reducer({}, { type: ActionTypes.RECEIVE_SAVE_ITEM_ERROR }))
        .toEqual({
          isSaving: false});
    });

  });

});
