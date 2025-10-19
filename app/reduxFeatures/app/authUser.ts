import { RootState } from "@/app/redux/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// declaring the types for our state
export type serverAuthUser = {
  user: {
    first_name: string;
    last_name: string;
    email: string;
  } | null;
};

const initialState: serverAuthUser = {
  user: null,
};

export const serverAuthUser = createSlice({
  name: "serverAuthUserState",
  initialState,
  reducers: {
    setServerUser: (state, action: PayloadAction<serverAuthUser["user"]>) => {
      state.user = action.payload;
    },
  },
});

// Here we are just exporting the actions from this slice, so that we can call them anywhere in our app.
export const { setServerUser } = serverAuthUser.actions;

// calling the above actions would be useless if we could not access the data in the state. So, we use something called a selector which allows us to select a value from the state.
export const selectServerUser = (state: RootState) => state.serverAuthUser.user;

// exporting the reducer here, as we need to add this to the store
export default serverAuthUser.reducer;
