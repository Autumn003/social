import { GraphQLClient } from "graphql-request"

const isClient = typeof window !== "undefined";

export const graphQLClient = new GraphQLClient(process.env.NEXT_PUBLIC_BACKEND_URL as string, {
    headers: () => ({
        "Authorization": isClient ? `Bearer ${window.localStorage.getItem("social_token")}` : ""
    })
});