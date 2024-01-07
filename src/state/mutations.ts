import { State } from "./state";
import { MutationTypes } from "./mutation-types";
import { MutationTree } from "vuex";
import {
  CategoryResponse,
  TaskResponse,
  UserResponse,
} from "../service/response_types";

export type Mutations<S = State> = {
  [MutationTypes.SET_JWT_AUTH_TOKEN](state: S, newToken: string | null): void;
  [MutationTypes.ADD_GROUP_ID_AND_NAME](
    state: S,
    { groupId, name }: { groupId: number; name: string }
  ): void;
  [MutationTypes.INIT_GROUP_DETAILS](state: S, groupId: number): void;
  [MutationTypes.ADD_GROUP_CATEGORY](
    states: S,
    { groupId, category }: { groupId: number; category: CategoryResponse }
  ): void;
  [MutationTypes.ADD_GROUP_TASK](
    states: S,
    { groupId, task }: { groupId: number; task: TaskResponse }
  ): void;
  [MutationTypes.ADD_GROUP_USER](
    states: S,
    { groupId, user }: { groupId: number; user: UserResponse }
  ): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.SET_JWT_AUTH_TOKEN](state, newToken: string | null) {
    state.jwtAuthToken = newToken;
  },
  [MutationTypes.ADD_GROUP_ID_AND_NAME](
    state,
    { groupId, name }: { groupId: number; name: string }
  ): void {
    const groupDetail = state.groupDetails.get(groupId)!;
    groupDetail.name = name
    groupDetail.id = groupId

  },
  [MutationTypes.INIT_GROUP_DETAILS](state, group: number): void {
    state.groupDetails.set(group, {
      name: "",
      id:group,
      categories: [],
      tasks: [],
      users: [],
    });
  },
  [MutationTypes.ADD_GROUP_CATEGORY](
    state,
    { groupId, category }: { groupId: number; category: CategoryResponse }
  ): void {
    state.groupDetails.get(groupId)?.categories.push(category);
  },
  [MutationTypes.ADD_GROUP_TASK](
    state,
    { groupId, task }: { groupId: number; task: TaskResponse }
  ): void {
    state.groupDetails.get(groupId)?.tasks.push(task);
  },
  [MutationTypes.ADD_GROUP_USER](
    state,
    { groupId, user }: { groupId: number; user: UserResponse }
  ): void {
    state.groupDetails.get(groupId)?.users.push(user);
  },
};
