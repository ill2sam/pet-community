import {
  combineReducers,
  configureStore,
} from "@reduxjs/toolkit"
import {persistStore, persistReducer} from "redux-persist"
import storageSession from "redux-persist/lib/storage/session"
import loginReducer from "./loginSlice"

const persistConfig = {
  key : "root",
  storage: storageSession,
  version: 1,
}

const rootReducer = combineReducers({
  loginState: loginReducer,
})

const persistedReducer = persistReducer<any>(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: false,
  })
});

export type RootState = {
  loginState: {
    userId: string
    name: string
    email: string
    isLogin: boolean
  }
}




export const persistor = persistStore(store);

export default store;
