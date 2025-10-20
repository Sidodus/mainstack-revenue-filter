import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/app/redux/store";

export interface FilterState {
  dateRange: string;
  startDate: Date | null;
  endDate: Date | null;
  transactionType: string;
  transactionStatus: string;
}

const initialState: FilterState = {
  dateRange: "",
  startDate: null,
  endDate: null,
  transactionType: "",
  transactionStatus: "",
};

export const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<FilterState>) => {
      return { ...state, ...action.payload };
    },
    clearFilters: () => {
      return initialState;
    },
    setDateRange: (state, action: PayloadAction<string>) => {
      state.dateRange = action.payload;
      // Clear custom dates when selecting preset range
      state.startDate = null;
      state.endDate = null;
    },
    setCustomDateRange: (
      state,
      action: PayloadAction<{ startDate: Date | null; endDate: Date | null }>
    ) => {
      state.startDate = action.payload.startDate;
      state.endDate = action.payload.endDate;
      // Clear preset range when selecting custom dates
      state.dateRange = "";
    },
    setTransactionType: (state, action: PayloadAction<string>) => {
      state.transactionType = action.payload;
    },
    setTransactionStatus: (state, action: PayloadAction<string>) => {
      state.transactionStatus = action.payload;
    },
  },
});

export const {
  setFilters,
  clearFilters,
  setDateRange,
  setCustomDateRange,
  setTransactionType,
  setTransactionStatus,
} = filtersSlice.actions;

export const selectFilters = (state: RootState) => state.filters;

export default filtersSlice.reducer;
