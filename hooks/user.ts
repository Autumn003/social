import { graphQLClient } from "@/clients/api";
import { getCurrentUserQuery, getUserBookmarksQuery, getUserByIdQuery } from "@/graphql/query/user";
import { useQuery } from "@tanstack/react-query";

export const useCurrentUser = () => {
  const query = useQuery({
    queryKey: ["curent-user"],
    queryFn: () => graphQLClient.request(getCurrentUserQuery),
  });

  return { ...query, user: query.data?.getCurrentUser };
};

export const useGetUserById = (id: string) => {
  const query = useQuery({
    queryKey: ["getUserById"],
    queryFn: () => graphQLClient.request(getUserByIdQuery, { id }),
  });
  return { ...query, user: query.data?.getUserById };
};

export const useGetUserBookmarks = () => {
  const query = useQuery({
    queryKey: ["getUserBookmarks"],
    queryFn: () => graphQLClient.request(getUserBookmarksQuery),
  });

  return {...query, bookmarks: query.data?.getUserBookmarks}
}
