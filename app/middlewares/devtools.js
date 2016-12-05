import DevTools from '../components/common/devtools';


export default (typeof DevTools === 'function') ? DevTools.instrument() : null;
