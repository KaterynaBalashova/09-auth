
import { User } from "@/types/user";
import { Note, NoteHttpRespond, Tags } from "../../types/note";
import { nextServer } from "./api";

export const fetchNotes = async (searchQuery: string, currentPage: number, tag?: Tags | string): Promise<NoteHttpRespond> => {
    const response = await nextServer.get<NoteHttpRespond>("/notes",
        {
            params: {
                search: searchQuery,
                page: currentPage,
                perPage: 12,
                tag,
            },
        }
    );
    
    return response.data;
};

export const deleteNote = async (noteId: Note["id"]): Promise<Note> => {
    const response = await nextServer.delete<Note>(`/notes/${noteId}`);
    return response.data;
};

export interface CreateNewNote {
    title: string,
    content: string,
    tag?: string | undefined,
};

export const createNote = async (newTask: CreateNewNote): Promise<Note> => {
    const response = await nextServer.post<Note>("/notes/", newTask);
  return response.data;
};

export type RegisterRequest = {
    email: string,
    password: string,
    username: string,
};

export const register = async (data: RegisterRequest) => {
  const response = await nextServer.post<User>("/auth/register", data);
  return response.data;
};

export type LoginRequest = {
    email: string,
    password: string,
};

export const login = async (data: LoginRequest) => {
    const response = await nextServer.post<User>("/auth/login", data);
    return response.data;
};

export const logout = async (): Promise<void> => {
    await nextServer.post("/auth/logout");
};

export type EditProfile = {
    username: string,
};

export const editUser = async (data: EditProfile) => {
    const response = await nextServer.patch<User>("/users/me", data);
    return response.data;
}

type CheckSessionRequest = {
    success: boolean,
};

export const checkSession = async () => {
    const response = await nextServer.get<CheckSessionRequest>("/auth/session");
    return response.data.success;
};

export const getMe = async () => {
    const { data } = await nextServer.get<User>("/users/me");
    return data;
};

export const fetchNoteById = async (noteId: string): Promise<Note> => {
    const response = await nextServer.get<Note>(`/notes/${noteId}`);
    return response.data;
};