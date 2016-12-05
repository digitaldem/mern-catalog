import fetch from 'isomorphic-fetch';
import { jsdom } from 'jsdom';


/**
* Shallow rendering currently throws an error if setState is called.
* React seems to expect that, if you use setState, the DOM is available.
* To work around the issue, we use jsdom so React doesn’t throw the exception
* when the DOM isn’t available.
*
* http://rackt.org/redux/docs/recipes/WritingTests.html#fixing-broken-setstate
*/

global.document = jsdom('<!doctype><html><body></body></html>');
global.window = document.defaultView;
global.navigator = global.window.navigator;
global.fetch = fetch;
global.console.info = () => { };
global.console.debug = () => { };
global.File = () => false;
