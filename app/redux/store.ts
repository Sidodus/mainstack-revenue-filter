import { configureStore } from "@reduxjs/toolkit";
import serverAuthUserReducer from "@/app/reduxFeatures/app/authUser";
import walletReducer from "@/app/reduxFeatures/app/wallet";
import transactionsReducer from "@/app/reduxFeatures/app/transactions";

import {
  useDispatch as useDispatchBase,
  useSelector as useSelectorBase,
} from "react-redux";

/**
 * Creates a store and includes all the slices as reducers.
 */
export const store = configureStore({
  reducer: {
    serverAuthUser: serverAuthUserReducer,
    wallet: walletReducer,
    transactions: transactionsReducer,
  },
  devTools: process.env.NODE_ENV === "production" ? false : true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // Prevent Age (dateTime) from returning unSterilized error
      serializableCheck: false,
      // Prevent immutable-state-invariant Check in development mode as it's a deep check of your entire state. Now with the state already BIG, it will slow things down in development mode.
      immutableCheck: false,
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: { users: UsersState}
type AppDispatch = typeof store.dispatch;

// Since we use typescript, lets utilize `useDispatch`
export const useDispatch = () => useDispatchBase<AppDispatch>();

// And utilize `useSelector`
export const useSelector = <TSelected = unknown>(
  selector: (state: RootState) => TSelected
): TSelected => useSelectorBase<RootState, TSelected>(selector);
