import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import cookie from "js-cookie";

interface stateInterface {
  loggedIn: boolean;
  user?: {
    name: string;
    email: string;
    phone: string;
  };
  mode: "light" | "dark";
  device: "mobile" | "tablet" | "desktop";
}

const initialState: stateInterface = {
  loggedIn: false,
  mode: "light",
  device: "mobile",
};

const AppContext = createSlice({
  name: "appState",
  initialState,
  reducers: {
    USER: (
      state: stateInterface,
      actions: PayloadAction<stateInterface["user"]>
    ) => {
      state.user = actions.payload;
      state.loggedIn = true;

      let w = window.innerWidth;
      state.device = w < 500 ? "mobile" : w < 900 ? "tablet" : "desktop";
      cookie.set("state", JSON.stringify(state));
    },
    RESIZE: (state, actions: PayloadAction<typeof initialState["device"]>) => {
      state.device = actions.payload;
      cookie.set("state", JSON.stringify(state));
    },
  },
});

export const { USER, RESIZE } = AppContext.actions;
export default AppContext.reducer;
