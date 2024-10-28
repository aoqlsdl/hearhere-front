import { atom } from "recoil";

export const isOnState = atom<boolean>({
    key: "isOnState",
    default: false,
});
