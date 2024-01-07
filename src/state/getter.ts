import { GetterTree } from "vuex";
import { State } from "./state";
import {
  CategoryResponse,
  TaskResponse,
  UserResponse,
  GroupResponse,
} from "../service/response_types";

export type Getters = {
  jwtAuthToken(state: State): string | null;
  groups(state: State): GroupResponse[];
  groupName(state: State): (groupId: number) => string | undefined;
  groupCategories(state: State): (groupId: number) => CategoryResponse[];
  groupTasks(state: State): (groupId: number) => TaskResponse[];
  groupUsers(state: State): (groupId: number) => UserResponse[];
  isGroupExist(state: State): (groupId: number) => boolean;
};

export const getters: GetterTree<State, State> & Getters = {
  jwtAuthToken: (state) => state.jwtAuthToken,
  groups: (state) =>
    Array.from(state.groupDetails, ([groupId, groupDetail]) => ({
      id: groupId,
      name: groupDetail.name,
    })),
  groupName: (state) => (groupId) => state.groupDetails.get(groupId)!.name,
  groupCategories: (state) => (groupId) =>
    state.groupDetails.get(groupId)!.categories,
  groupTasks: (state) => (groupId) => state.groupDetails.get(groupId)!.tasks,
  groupUsers: (state) => (groupId) => state.groupDetails.get(groupId)!.users,
  isGroupExist: (state) => (groupId) => state.groupDetails.has(groupId),
};
