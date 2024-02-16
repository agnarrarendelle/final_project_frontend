import { GetterTree } from "vuex";
import { State } from "./state";
import {
  CategoryResponse,
  TaskResponse,
  UserResponse,
  GroupResponse,
} from "../service/response_types";
import { Client } from "@stomp/stompjs";
import { ChatMessage } from "../service/request_types";

export type Getters = {
  jwtAuthToken(state: State): string | null;
  userId(state: State): number;
  groups(state: State): GroupResponse[];
  groupName(state: State): (groupId: number) => string | undefined;
  groupCategories(state: State): (groupId: number) => CategoryResponse[];
  groupTask(state: State): (groupId: number, taskId: number) => TaskResponse;
  groupTasks(state: State): (groupId: number) => TaskResponse[];
  groupUsers(state: State): (groupId: number) => UserResponse[];
  groupChatMessages(state: State): (groupId: number) => ChatMessage[];
  isGroupExist(state: State): (groupId: number) => boolean;
  wsClient(state: State): Client | null;
};

export const getters: GetterTree<State, State> & Getters = {
  jwtAuthToken: (state) => state.user.token,
  userId: (state) => state.user.id,
  groups: (state) =>
    Array.from(state.groupDetails, ([groupId, groupDetail]) => ({
      id: groupId,
      name: groupDetail.name,
    })),
  groupName: (state) => (groupId) => state.groupDetails.get(groupId)!.name,
  groupCategories: (state) => (groupId) =>
    state.groupDetails.get(groupId)!.categories,
  groupTask: (state) => (groupId, taskId) =>
    state.groupDetails.get(groupId)!.tasks.find((t) => t.id === taskId)!,
  groupTasks: (state) => (groupId) => state.groupDetails.get(groupId)?.tasks ?? [],
  groupUsers: (state) => (groupId) => state.groupDetails.get(groupId)?.users ?? [],
  groupChatMessages: (state) => (groupId) =>
    state.groupDetails.get(groupId)!.chatMessages,
  isGroupExist: (state) => (groupId) => state.groupDetails.has(groupId),
  wsClient: (state) => state.websocket,
};
