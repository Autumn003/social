"use client"

import { graphQLClient } from "@/clients/api";
import { verifyUserGoogleTokenQuery } from "@/graphql/query/user";
import { useCurrentUser } from "@/hooks/user";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import toast from "react-hot-toast";
import UserRecommendationCard from "./UserRecommendationCard";



export const Rightbar = () => {
    const {user} = useCurrentUser();
    const queryClient = useQueryClient();


    const handleLoginWithGoogle = useCallback(
        async (cred: CredentialResponse) => {
          const googleToken = cred.credential;
          if(!googleToken) return toast.error("Google token not found");
    
          const { verifyGoogleToken } = await graphQLClient.request(verifyUserGoogleTokenQuery, {token: googleToken});
    
          toast.success("Verified Success");
          console.log(verifyGoogleToken);
          
          if(verifyGoogleToken){
            window.localStorage.setItem("social_token", verifyGoogleToken);
          }
          await queryClient.invalidateQueries({queryKey: ["curent-user"]})
          
        }, [queryClient]
      )

    return (
        <div className="sm:col-span-3 xl:block hidden h-screen p-4 text-center">
          <UserRecommendationCard />
        </div>
    )
}