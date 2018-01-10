import { connectRoutes } from 'redux-first-router';
import createHistory from 'history/createBrowserHistory';

import { actionType } from '../actions/';

const history = createHistory();

const routesMap = {};
routesMap[actionType.GO_HOME] = '/';
routesMap[actionType.FOCUS_NOTE] = '/NOTE/:id';


const { reducer, middleware, enhancer } = connectRoutes(history, routesMap);
export { reducer, middleware, enhancer };
