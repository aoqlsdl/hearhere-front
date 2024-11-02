export const useRedirect = () => {
    return (url: string) => {
        window.location.href = url;
    };
};
