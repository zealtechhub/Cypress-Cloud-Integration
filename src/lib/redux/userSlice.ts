import { Order, stateInterface } from "src/lib/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import cookie from "js-cookie";

let defaultState = JSON.stringify({
  loggedIn: false,
  mode: "default",
  device: "mobile",
  user: null,
  info: {
    description: "",
  },
  loaded: false,
  orders: [],
});

const initialState: stateInterface = JSON.parse(
  cookie.get("state") ?? defaultState
);

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
    INFO: (state, actions: PayloadAction<Partial<stateInterface["info"]>>) => {
      state.info = { ...state.info, ...actions.payload };
      cookie.set("state", JSON.stringify(state));
    },
    LOADED: (state, actions: PayloadAction<boolean>) => {
      state.loaded = actions.payload;
      cookie.set("state", JSON.stringify(state));
    },
    ADD_ORDER: (state, actions: PayloadAction<Order>) => {
      state.orders = [...state.orders, actions.payload];
      cookie.set("state", JSON.stringify(state));
    },
    CANCEL_ORDER: (state, actions: PayloadAction<string>) => {
      state.orders = state.orders.map((order) => {
        if (order.id !== actions.payload) {
          return { ...order, status: "cancelled" };
        }
        return order;
      });
      cookie.set("state", JSON.stringify(state));
    },
    UPDATE_ORDER: (state, actions: PayloadAction<Partial<Order>>) => {
      state.orders = state.orders.map((order) => {
        if (order.id !== actions.payload) {
          return { ...order, ...actions.payload };
        }
        return order;
      });
      cookie.set("state", JSON.stringify(state));
    },
  },
});

export const {
  USER,
  RESIZE,
  MODE,
  INFO,
  ADD_ORDER,
  CANCEL_ORDER,
  UPDATE_ORDER,
} = AppContext.actions;
export default AppContext.reducer;
