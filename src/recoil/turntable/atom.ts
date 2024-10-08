import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const isOnState = atom<boolean>({
    key: "isOnState",
    default: false,
    effects_UNSTABLE: [persistAtom],
});

export const countState = atom<number>({
    key: "countState",
    default: 0,
    effects_UNSTABLE: [persistAtom],
});
