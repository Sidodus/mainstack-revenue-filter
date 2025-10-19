import { RootState } from "@/app/redux/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// declaring the types for our state
export type WalletState = {
  wallet: {
    balance: number;
    total_payout: number;
    total_revenue: number;
    pending_payout: number;
    ledger_balance: number;
  } | null;
};

const initialState: WalletState = {
  wallet: null,
};

export const walletSlice = createSlice({
  name: "walletState",
  initialState,
  reducers: {
    setWallet: (state, action: PayloadAction<WalletState["wallet"]>) => {
      state.wallet = action.payload;
    },
  },
});

// Here we are just exporting the actions from this slice, so that we can call them anywhere in our app.
export const { setWallet } = walletSlice.actions;

// calling the above actions would be useless if we could not access the data in the state. So, we use something called a selector which allows us to select a value from the state.
export const selectWallet = (state: RootState) => state.wallet.wallet;

// exporting the reducer here, as we need to add this to the store
export default walletSlice.reducer;
