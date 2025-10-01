import { cookies } from "next/headers";
import { nextServer } from "./api";
import { User } from "@/types/user";
// import { Note, NoteHttpRespond, Tags } from "@/types/note";

// export const fetchServerNotes = async (searchQuery: string, currentPage: number, tag?: Tags | string): Promise<NoteHttpRespond> => {
//     const response = await nextServer.get<NoteHttpRespond>("/notes",
//         {
//             params: {
//                 search: searchQuery,
//                 page: currentPage,
//                 perPage: 12,
//                 tag,
//             },
//             headers: {
//             Cookie: cookieStore.toString(),
//         },
//         }
//     );
    
//     return response.data;
// };

export const checkServerSession = async () => {
    const cookieStore = await cookies();
    const response = await nextServer.get("/auth/session", {
        headers: {
            Cookie: cookieStore.toString(),
        },
    });
    return response;
};

export const getServerMe = async (): Promise<User> => {
    const cookieStore = await cookies();
    const { data } = await nextServer.get("/users/me", {
        headers: {
            Cookie: cookieStore.toString(),
        },
    });
    return data;
};

