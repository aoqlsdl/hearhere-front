import { atom } from "recoil";

const sessionStorageEffect =
    (key: string) =>
    ({ setSelf, onSet }: any) => {
        const savedValue = sessionStorage.getItem(key);
        if (savedValue != null) {
            setSelf(JSON.parse(savedValue)); // sessionStorage 값으로 초기화
        }

        onSet((newValue: any) => {
            sessionStorage.setItem(key, JSON.stringify(newValue)); // 상태가 변경될 때 sessionStorage에 저장
        });
    };

export const isOnState = atom<boolean>({
    key: "isOnState",
    default: false,
    effects_UNSTABLE: [sessionStorageEffect("isOnState")], // sessionStorage와 연동
});
