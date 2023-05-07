import { combineReducers, configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import {
    FLUSH,
    PAUSE,
    PERSIST,
    persistReducer,
    persistStore,
    PURGE,
    REGISTER,
    REHYDRATE
  } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 

const userPresistConfig = {
    key:'auth',
    storage,
}
const moviesPersistConfig = {
    key:"movies",
    storage,
}
const modalPersistConfig = {
    key:'modal',
    storage,
}

const persistedReducer = combineReducers({
    ...rootReducer,
    auth: persistReducer(userPresistConfig,rootReducer.auth),
    movies:persistReducer(moviesPersistConfig,rootReducer.movies),
    modal:persistReducer(modalPersistConfig,rootReducer.modal),
})

export const store = configureStore({
    reducer:persistedReducer,
    middleware: getDefaultMiddelware =>
    getDefaultMiddelware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
})
export const persistor = persistStore(store);