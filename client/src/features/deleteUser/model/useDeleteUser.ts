import { useDeleteUserMutation } from './mutations';

export const useDeleteUser = () => {
    const mutataion = useDeleteUserMutation();

    const deleteUser = (id: string) => {
        try {
            mutataion.mutate(id);
        } catch (error) {
            console.log(error);
        }
    };

    return { deleteUser };
};
