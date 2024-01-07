import {
  CategoryResponse,
  TaskResponse,
  UserResponse,
} from "../service/response_types";

export type State = {
  jwtAuthToken: string | null;
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
  jwtAuthToken: "",
  groupDetails: new Map(),
};
