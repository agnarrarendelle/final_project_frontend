import { Client } from "@stomp/stompjs";
import {
  CategoryResponse,
  TaskResponse,
  UserResponse,
} from "../service/response_types";
import { ChatMessage } from "../service/request_types";

export type State = {
  user: UserResponse;
  groupDetails: Map<
    number,
    {
      id: number;
      name: string;
      categories: CategoryResponse[];
      tasks: TaskResponse[];
      users: UserResponse[];
      chatMessages: ChatMessage[]
    }
  >;
  websocket: Client | null;
};

export const state: State = {
  user: { name: "", token: "", id: -1 },
  groupDetails: new Map(),
  websocket: null,
};
