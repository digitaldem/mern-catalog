import expect from 'expect';
import fetchMock from 'fetch-mock';
import { __API_URL__ } from '../../app/constants';
import { ActionTypes } from '../../app/constants/actiontypes';
import { initItem, setItemProperty, loadItem, saveItem } from '../../app/actions/item';
import mockStore from '../../mocks/store';
import item from '../../mocks/item.json';
import error from '../../mocks/error.json';


describe('actions.item', () => {
  describe('LOAD_ITEM', function() {
    afterEach(() => {
      fetchMock.restore();
    });

    const initialState = { item: { isLoading: false, isSaving: false, original: {}, revision: {} } }

    it('creates INIT_ITEM when initItem is called.', (done) => {
      const expectedActionChain = [
        {type: ActionTypes.INIT_ITEM}
      ];
      const store = mockStore(expectedActionChain, initialState);

      store.dispatch(initItem())
        .then((r) => {
          expect(r.type).toEqual(ActionTypes.INIT_ITEM);
        }).then(x => done()).catch(x => done(x));
    });

    it('creates SET_ITEM_PROPERTY when setItemProperty is called.', (done) => {
      const expectedActionChain = [
        {type: ActionTypes.SET_ITEM_PROPERTY}
      ];
      const store = mockStore(expectedActionChain, initialState);
      const prop = 'prop';
      const val = 'value';

      store.dispatch(setItemProperty(prop, val))
        .then((r) => {
          expect(r.type).toEqual(ActionTypes.SET_ITEM_PROPERTY);
          expect(r.property).toEqual(prop);
          expect(r.value).toEqual(val);
        }).then(x => done()).catch(x => done(x));
    });

    it('creates RECEIVE_LOAD_ITEM_SUCCESS when loadItem fetch returns HTTP_200.', (done) => {
      const expectedActionChain = [
        {type: ActionTypes.REQUEST_LOAD_ITEM},
        {type: ActionTypes.RECEIVE_LOAD_ITEM_SUCCESS}
      ];
      const store = mockStore(expectedActionChain, initialState);

      fetchMock.mock(`${__API_URL__}items/id.json`, { status: 200, body: item });

      store.dispatch(loadItem('id'))
        .then((r) => {
          expect(r.response.results.length).toEqual(r.response.totalCount);
          expect(r.response.results.length).toEqual(1);
        }).then(x => done()).catch(x => done(x));
    });

    it('creates RECEIVE_LOAD_ITEM_ERROR when loadItem fetch returns HTTP_500.', (done) => {
      const expectedActionChain = [
        {type: ActionTypes.REQUEST_LOAD_ITEM},
        {type: ActionTypes.RECEIVE_LOAD_ITEM_ERROR}
      ];
      const store = mockStore(expectedActionChain, initialState);

      fetchMock.mock(`${__API_URL__}items/id.json`, { status: 500, body: error });

      store.dispatch(loadItem('id'))
        .then((r) => {
          expect(r.response.results.length).toEqual(r.response.totalCount);
          expect(r.response.totalCount).toEqual(0);
        }).then(x => done()).catch(x => done(x));
    });

    it('creates RECEIVE_SAVE_ITEM_SUCCESS when saveItem fetch returns HTTP_200.', (done) => {
      const expectedActionChain = [
        {type: ActionTypes.REQUEST_SAVE_ITEM},
        {type: ActionTypes.RECEIVE_SAVE_ITEM_SUCCESS}
      ];
      const store = mockStore(expectedActionChain, initialState);

      fetchMock.mock(`${__API_URL__}items/id.json`, { status: 200, body: item });

      store.dispatch(saveItem('id'))
        .then((r) => {
          expect(r.response.results.length).toEqual(r.response.totalCount);
          expect(r.response.results.length).toEqual(1);
        }).then(x => done()).catch(x => done(x));
    });

    it('creates RECEIVE_SAVE_ITEM_ERROR when saveItem fetch returns HTTP_500.', (done) => {
      const expectedActionChain = [
        {type: ActionTypes.REQUEST_SAVE_ITEM},
        {type: ActionTypes.RECEIVE_SAVE_ITEM_ERROR}
      ];
      const store = mockStore(expectedActionChain, initialState);

      fetchMock.mock(`${__API_URL__}items/id.json`, { status: 500, body: error });

      store.dispatch(saveItem('id'))
        .then((r) => {
          expect(r.response.results.length).toEqual(r.response.totalCount);
          expect(r.response.totalCount).toEqual(0);
        }).then(x => done()).catch(x => done(x));
    });

  });
});
