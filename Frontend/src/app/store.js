import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import createFilter from "redux-persist-transform-filter";
import storage from "redux-persist/lib/storage";
import userSlice from "../features/userSlice";


const saveUserOnlyFilter = createFilter("user", ["user"]);

//user persist defining only this user thing would be persisted , whitelist is things you want to persisit and there is also a blacklist which is used for things you not want to persist
const persistConfig = {
  key: "user",
  storage,
  whitelist: ["user"],
  transforms: [saveUserOnlyFilter],
};

const rootReducer = combineReducers({
  user: userSlice,
  
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
//   middlewares mangta hi hai configurestore if nhi do to apne se default middlewares set kr deta hai ye code likh k apn middleware apne mn ka add kr skte hai to bs add kia hai uska ek middleware serializability check false , to ab kya hoga only this middleware would be includeed nothing else ;
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: true,
});

export const persistor = persistStore(store);
