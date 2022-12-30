import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import cookie from "js-cookie";

export interface stateInterface {
  loggedIn: boolean;
  user?: {
    name: string;
    email: string;
    phone: string;
  };
  mode: "light" | "dark" | "default";
  device: "mobile" | "tablet" | "desktop";
  info: {
    description: string;
    courier?: "car" | "truck";
  };
  loaded: boolean;
}

const initialState: stateInterface = {
  loggedIn: false,
  mode: "default",
  device: "mobile",
  user: {
    email: "oderindejames02@gmail.com",
    name: "Timi James",
    phone: "+2349017241037",
  },
  info: {
    description: "",
  },
  loaded: false,
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
    RESIZE: (state, actions: PayloadAction<stateInterface["device"]>) => {
      state.device = actions.payload;
      cookie.set("state", JSON.stringify(state));
    },
    MODE: (state, actions: PayloadAction<stateInterface["mode"]>) => {
      state.mode = actions.payload;
      cookie.set("state", JSON.stringify(state));
    },
    INFO: (state, actions: PayloadAction<stateInterface["info"]>) => {
      state.info = actions.payload;
      cookie.set("state", JSON.stringify(state));
    },
    LOADED: (state, actions: PayloadAction<stateInterface["info"]>) => {
      state.info = actions.payload;
      cookie.set("state", JSON.stringify(state));
    },
  },
});

export const { USER, RESIZE, MODE, INFO } = AppContext.actions;
export default AppContext.reducer;
