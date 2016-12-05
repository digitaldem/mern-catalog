import expect from 'expect';
import { ActionTypes } from '../../app/constants/actiontypes';
import reducers from '../../app/reducers';
import reducer from '../../app/reducers/search';
import items from '../../mocks/items.json';


describe('reducers.search', () => {
  it('should return the initial state.', () => {
    expect(reducer(undefined, {}))
      .toEqual({
        isSearching: false,
        items: []});
  });

  describe('SEARCH_ITEMS', function() {
    it('should handle REQUEST_SEARCH_ITEMS.', () => {
      expect(reducer({}, { type: ActionTypes.REQUEST_SEARCH_ITEMS }))
        .toEqual({
          isSearching: true});
    });

    it('should handle RECEIVE_SEARCH_ITEMS_SUCCESS.', () => {
      expect(reducer({}, { type: ActionTypes.RECEIVE_SEARCH_ITEMS_SUCCESS, response: items }))
        .toEqual({
          isSearching: false,
          items: items.results});
    });

    it('should handle RECEIVE_SEARCH_ITEMS_ERROR.', () => {
      expect(reducer({}, { type: ActionTypes.RECEIVE_SEARCH_ITEMS_ERROR }))
        .toEqual({
          isSearching: false,
          items: []
        });
    });

  });

});
