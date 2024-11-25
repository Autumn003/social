"use client"

import { graphQLClient } from "@/clients/api";
import { followUserMutation, unfollowUserMutation } from "@/graphql/mutation/user";
import { useCurrentUser, useGetUserById } from "@/hooks/user"
import { useQueryClient } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";
import {Button} from "@/components/Button"


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
            <Button placeholder={`${amIFollowing? "Unfollow" : "Follow"}`}
                onClick={amIFollowing ? handleUnfollowUser : handleFollowUser}
            />
            
        </>
    )
}