import { State } from "./state";
import { MutationTypes } from "./mutation-types";
import { MutationTree } from "vuex";


export type Mutations<S = State> = {
  [MutationTypes.SET_JWT_AUTH_TOKEN](state: S, newToken: string | null): void
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.SET_JWT_AUTH_TOKEN](state, newToken: string | null) {
    state.jwtAuthToken = newToken;
  }
};
