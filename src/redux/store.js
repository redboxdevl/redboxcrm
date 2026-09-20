import { applyMiddleware, createStore } from "redux"
import thunk from "redux-thunk"
import rootReducer from "./reducers/rootReducer"
import {persistReducer,persistStore} from "redux-persist";
import storage from "redux-persist/lib/storage";
import {composeWithDevTools} from "redux-devtools-extension"

const persisConfig={
    key:'persist-store',
    storage
}

const persistedReducer =persistReducer(persisConfig,rootReducer);
const store = createStore(
        persistedReducer,
        composeWithDevTools(applyMiddleware(thunk))
    );
export const persistor = persistStore(store);


export default store