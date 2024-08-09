import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { outlayAPI } from "../services/OutlayService";

const rootReducer = combineReducers({
  [outlayAPI.reducerPath]: outlayAPI.reducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(outlayAPI.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
