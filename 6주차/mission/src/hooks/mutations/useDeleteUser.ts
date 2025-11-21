import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { deleteUser } from "../../apis/lp";
import { queryClient } from "../../App";

export function useDeleteUser(){
    const {logout} = useAuth();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: deleteUser,
        onSuccess: () => {
            logout();
            queryClient.clear();
            navigate("/login", {replace: true});
        }
    })
}