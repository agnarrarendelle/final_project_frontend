import axios from ".."
import { ApiResponse, UserResponse } from "../response_types";

export const login = async (name: string, password: string):Promise<ApiResponse<UserResponse>> => {
    const res = await axios.post("/user/login", {name, password})
    return res.data
};

export const searchUsers = async(groupId:number, name:string):Promise<ApiResponse<UserResponse[]>>=>{
    const res = await axios.get(`/user?groupId=${groupId}&name=${name}`)
    return res.data
}