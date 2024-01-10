import { State } from "./state";
import { MutationTypes } from "./mutation-types";
import { MutationTree } from "vuex";
import {
  CategoryResponse,
  TaskResponse,
  TaskWsResponse,
  UserResponse,
} from "../service/response_types";
import { Client } from "@stomp/stompjs";
import { ChatMessage } from "../service/request_types";

export type Mutations<S = State> = {
  [MutationTypes.SET_USER](state: S, user: UserResponse): void;
  [MutationTypes.INIT_GROUP_DETAILS](
    state: S,
    { groupId, name }: { groupId: number; name: string }
  ): void;
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
  [MutationTypes.INIT_WS_CLIENT](state: S): void;
  [MutationTypes.ADD_WS_GROUP_CHAT_SUBSCRIPTION](
    state: S,
    groupId: number
  ): void;
  [MutationTypes.ADD_WS_GROUP_CHAT_MESSAGES](
    state: S,
    { groupId, messages }: { groupId: number; messages: ChatMessage[] }
  ): void;
  [MutationTypes.ADD_WS_GROUP_TASK_SUBSCRIPTION](
    state: S,
    groupId: number
  ): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.SET_USER](state, user: UserResponse) {
    state.user = user;
  },
  [MutationTypes.INIT_GROUP_DETAILS](
    state,
    { groupId, name }: { groupId: number; name: string }
  ): void {
    state.groupDetails.set(groupId, {
      name: name,
      id: groupId,
      categories: [],
      tasks: [],
      users: [],
      chatMessages: [],
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
  [MutationTypes.ADD_WS_GROUP_CHAT_MESSAGES](
    state,
    { groupId, messages }: { groupId: number; messages: ChatMessage[] }
  ): void {
    state.groupDetails.get(groupId)?.chatMessages.push(...messages);
  },
  [MutationTypes.INIT_WS_CLIENT](state): void {
    const client = new Client({
      brokerURL: "ws://localhost:7000/websocket",
      onConnect: () => {
        console.log("ws connected");
      },
      onWebSocketError: (e) => {
        console.error(e);
      },
      onStompError: async (e) => {
        console.log(e);
        alert("Failed to get order status. Please re-login again");
        await client.deactivate();
      },
    });

    window.onbeforeunload = async () => {
      await client.deactivate();
    };

    state.websocket = client;

    state.websocket.activate();
  },
  [MutationTypes.ADD_WS_GROUP_CHAT_SUBSCRIPTION](state, groupId: number): void {
    const client = state.websocket;
    if (client === null) {
      console.error("Ws not connected");
      return;
    }
    console.log("sub");
    client.subscribe(`/topic/group-messages/${groupId}`, (message) => {
      console.log(`Get message from group ${groupId}`);
      const newMessage: ChatMessage = JSON.parse(message.body);
      console.log(newMessage);
      state.groupDetails.get(groupId)?.chatMessages.push(newMessage);
    });
  },
  [MutationTypes.ADD_WS_GROUP_TASK_SUBSCRIPTION](state, groupId: number): void {
    const client = state.websocket;
    if (client === null) {
      console.error("Ws not connected");
      return;
    }
    client.subscribe(
      `/topic/group-messages/${groupId}/task`,
      async (message) => {
        const modifiedTask: TaskWsResponse = JSON.parse(message.body);
        const tasks = state.groupDetails.get(groupId)!.tasks;

        switch (modifiedTask.type) {
          case "Modified": {
            const oldTaskIndex = tasks.findIndex((t) => t.id === modifiedTask.task.id);
            tasks[oldTaskIndex] = modifiedTask.task;
            break;
          }
          case "Created": {
            console.log(modifiedTask.task)
            tasks.push(modifiedTask.task);
            break;
          }
        }
      }
    );
  },
};
