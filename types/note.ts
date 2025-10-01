export interface Note {
    id: string,
    title: string,
    content: string,
    createdAt: string,
    updatedAt: string,
    tag: string
};

export interface NoteHttpRespond {
    notes: Note[],
    totalPages: number,
};

export type Tags = "Work" | "Personal" | "Meeting" | "Shopping" | "Todo";

export type NoteFormValues = {
    title: string,
    content: string,
    tag: Tags,
}

