export const useOpenModal = (setIsOpen: React.Dispatch<React.SetStateAction<boolean>>) => {
    setIsOpen(true);
};

export const useCloseModal = (setIsOpen: React.Dispatch<React.SetStateAction<boolean>>) => {
    setIsOpen(false);
};

export const useBackgroundClick = (
    e: React.MouseEvent<HTMLDivElement>,
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
) => {
    if (e.target === e.currentTarget) {
        setIsOpen(false);
    }
};
