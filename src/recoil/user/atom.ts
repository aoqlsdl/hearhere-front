import { atom } from "recoil";

interface UserState {
    accessToken: string | null;
    refreshToken: string | null;
    username: string | null;
}

export const userState = atom<UserState>({
    key: "userState",
    default: {
        accessToken: localStorage.getItem("accessToken"),
        refreshToken: localStorage.getItem("refreshToken"),
        username: localStorage.getItem("username"),
    },
    effects: [
        ({ onSet }) => {
            onSet((newUserState) => {
                if (newUserState.accessToken) {
                    localStorage.setItem("accessToken", newUserState.accessToken);
                } else {
                    localStorage.removeItem("accessToken");
                }
                if (newUserState.refreshToken) {
                    localStorage.setItem("refreshToken", newUserState.refreshToken);
                } else {
                    localStorage.removeItem("refreshToken");
                }

                if (newUserState.username) {
                    localStorage.setItem("username", newUserState.username);
                } else {
                    localStorage.removeItem("username");
                }
            });
        },
    ],
});
