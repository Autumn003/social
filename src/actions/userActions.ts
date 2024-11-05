"use server"

import { graphQLClient } from "@/clients/api";
import { User } from "@/gql/graphql";
import { getUserByIdQuery } from "@/graphql/query/user";
import { notFound } from "next/navigation";

export const fetchUserInfo = async (id: string) => {
    if(!id){
        return notFound();
    }
    try {
        const { getUserById } = await graphQLClient.request(getUserByIdQuery, { id });
        if(!getUserById){
            return notFound();
        }
        return getUserById as User;
    } catch (error) {
        console.error("Error fetching user data:", error);
        return notFound();
    }
};