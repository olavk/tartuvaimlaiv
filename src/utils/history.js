import createHistory from 'history/createBrowserHistory';

const routerBasename = window.routerBasename || undefined;

export default createHistory({basename: routerBasename});
