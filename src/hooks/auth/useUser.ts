// const useUser = (options?: Props['options']) => {
//     const { data: user, error } = useGetUserQuery({
//         initialData: getStoredUser,
//         options: {
//             ...options,
//             cacheTime: 1000 * 10, // 10 seconds
//         },
//     });

//     useEffect(() => {
//         if (!user) clearStoredUser();
//         else setStoredUser(user);

//         if (error) clearStoredUser();
//     }, [user, error]);

//     return {
//         user: user ?? null,
//     };
// };
