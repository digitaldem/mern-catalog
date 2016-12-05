import expect from 'expect';
import fetchMock from 'fetch-mock';
import { __API_URL__ } from '../../app/constants';
import { ActionTypes } from '../../app/constants/actiontypes';
import { searchItems } from '../../app/actions/search';
import mockStore from '../../mocks/store';
import items from '../../mocks/items.json';
import error from '../../mocks/error.json';


describe('actions.search', () => {
  describe('SEARCH_ITEMS', function() {
    afterEach(() => {
      fetchMock.restore();
    });

    const initialState = { search: { isSearching: false, items: [] } }

    it('creates RECEIVE_SEARCH_ITEMS_SUCCESS when searchItems fetch returns HTTP_200.', (done) => {
      const expectedActionChain = [
        {type: ActionTypes.REQUEST_SEARCH_ITEMS},
        {type: ActionTypes.RECEIVE_SEARCH_ITEMS_SUCCESS}
      ];
      const store = mockStore(expectedActionChain, initialState);

      fetchMock.mock(`${__API_URL__}items.json`, { status: 200, body: items });

      store.dispatch(searchItems())
        .then((r) => {
          expect(r.response.results.length).toEqual(r.response.totalCount);
          expect(r.response.totalCount).toEqual(items.totalCount);
        }).then(x => done()).catch(x => done(x));
    });

    it('creates RECEIVE_SEARCH_ITEMS_ERROR when searchItems fetch returns HTTP_500.', (done) => {
      const expectedActionChain = [
        {type: ActionTypes.REQUEST_SEARCH_ITEMS},
        {type: ActionTypes.RECEIVE_SEARCH_ITEMS_ERROR}
      ];
      const store = mockStore(expectedActionChain, initialState);

      fetchMock.mock(`${__API_URL__}items.json`, { status: 500, body: error });

      store.dispatch(searchItems())
        .then((r) => {
          expect(r.response.results.length).toEqual(r.response.totalCount);
          expect(r.response.totalCount).toEqual(0);
        }).then(x => done()).catch(x => done(x));
    });

  });
});
