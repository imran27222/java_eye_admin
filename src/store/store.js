import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Defaults to localStorage
import userReducer from "./user/userSlice"; // Ensure the correct path to the userReducer
import actionReducer from "./actions/actionSlice"; // Ensure the correct path to the userReducer
import adminReducer from "./admin/adminSlice"; // Ensure the correct path to the userReducer

// Persist Configuration
const persistConfig = {
  key: "root", // The key for localStorage/sessionStorage
  storage,
  //   blacklist: ['someReducer'], // Reducers to exclude
  // whitelist: ['user'], // Reducers to include
};

// Combine All Reducers
const rootReducer = combineReducers({
  user: userReducer, // Ensure userReducer is properly imported
  actions: actionReducer, // Ensure actionsReducer is properly imported
  admin: adminReducer, // Ensure adminReducer is properly imported
  // Add more reducers here as you create them, e.g.:
  // product: productReducer,
});

// Persisted Reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create Store
export const store = configureStore({
  reducer: persistedReducer, // Root reducer with persistence applied
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"], // ignore persist actions
        ignoredPaths: ["register"], // or any other path with non-serializable values
      },
    }),
});

export const persistor = persistStore(store);
