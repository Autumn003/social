"use client"

import { graphQLClient } from "@/clients/api";
import { followUserMutation, unfollowUserMutation } from "@/graphql/mutation/user";
import { useCurrentUser, useGetUserById } from "@/hooks/user"
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";


export default function FollowBtn({id}: {id:string}) {
    const {user} = useGetUserById(id);
    const {user: currentUser} = useCurrentUser();
    const queryClient = useQueryClient();

    const amIFollowing = useMemo(() => {
        if (!user) return false;
        return (
          (currentUser?.followings?.findIndex(
            (el) => el?.id === user?.id
          ) ?? -1) >= 0
        );
      }, [currentUser?.followings, user]);

    const handleFollowUser = useCallback(async () => {
        if (!user?.id) return;

        await graphQLClient.request(followUserMutation, { to: user?.id });
        await queryClient.invalidateQueries({queryKey: ["curent-user"]})
    }, [user?.id, queryClient]);
    
    const handleUnfollowUser = useCallback(async () => {
        if (!user?.id) return;

        await graphQLClient.request(unfollowUserMutation, { to: user?.id });
        await queryClient.invalidateQueries({queryKey: ["curent-user"]})
    }, [user?.id, queryClient]);
    
    
    if(user?.id === currentUser?.id) return null;

    return (
        <>
            <button
            onClick={amIFollowing ? handleUnfollowUser : handleFollowUser}
            className="bg-white text-black px-3 py-1 rounded-full text-sm"
            >
                {
                    amIFollowing ? "Unfollow" : "Follow"
                }
            </button>
        </>
    )
}