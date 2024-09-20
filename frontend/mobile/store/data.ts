import { create } from "zustand";

export type User = {
    name: string;
    age: string;
    height: string;
    weight: string;
    gender: string;
    level: string;
    objective: string;
};

type DataState = {
    user: User;
    setPageOne: (data: Omit<User, "gender" | "level" | "objective">) => void;
    setPageTwo: (data: Pick<User, "gender" | "level" | "objective">) => void;
};

export const useDataStore = create<DataState>((set) => ({
    user: {
        name: "",
        age: "",
        height: "",
        weight: "",
        gender: "",
        level: "",
        objective: "",
    },
    setPageOne: (data) =>
        set((state) => ({ user: { ...state.user, ...data } })),

    setPageTwo: (data) =>
        set((state) => ({ user: { ...state.user, ...data } })),
}));
