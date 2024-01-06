export interface ApiResponse<T> {
  msg: string;
  data: T;
}

export interface GroupResponse {
  id: number;
  name: string;
}

export interface CategoryResponse {
  id: number;
  name: string;
}

export interface TaskResponse {
  id: number;
  name: string;
  status: string;
  priorityLevel: string;
  expiredAt: Date;
  categoryName:string
}

export interface UserResponse {
  id: number;
  name: string;
  token: string;
}
