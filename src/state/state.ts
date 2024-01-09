import {
  CategoryResponse,
  TaskResponse,
  UserResponse,
} from "../service/response_types";

export type State = {
  user: UserResponse;
  groupDetails: Map<
    number,
    {
      id:number
      name:string;
      categories: CategoryResponse[];
      tasks: TaskResponse[];
      users: UserResponse[];
    }
  >;
};

export const state: State = {
  user: { name: "", token: "", id: -1 },
  groupDetails: new Map(),
};
