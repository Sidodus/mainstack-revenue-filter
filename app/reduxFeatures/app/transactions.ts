import { RootState } from "@/app/redux/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// declaring the types for our state
export type Transaction = {
  amount: number;
  metadata?: {
    name: string;
    type: string;
    email: string;
    quantity?: number;
    country?: string;
    product_name?: string;
  };
  payment_reference?: string;
  status: string;
  type: string;
  date: string;
};

export type TransactionsState = {
  transactions: Transaction[];
};

const initialState: TransactionsState = {
  transactions: [],
};

export const transactionsSlice = createSlice({
  name: "transactionsState",
  initialState,
  reducers: {
    setTransactions: (state, action: PayloadAction<Transaction[]>) => {
      state.transactions = action.payload;
    },
  },
});

// Here we are just exporting the actions from this slice, so that we can call them anywhere in our app.
export const { setTransactions } = transactionsSlice.actions;

// calling the above actions would be useless if we could not access the data in the state. So, we use something called a selector which allows us to select a value from the state.
export const selectTransactions = (state: RootState) =>
  state.transactions.transactions;

// exporting the reducer here, as we need to add this to the store
export default transactionsSlice.reducer;
