import { GetterTree } from "vuex";
import { State } from "./state";

export type Getters = {
  jwtAuthToken(state: State): string | null;
};

export const getters: GetterTree<State, State> & Getters = {
  jwtAuthToken: (state) => state.jwtAuthToken,
};
