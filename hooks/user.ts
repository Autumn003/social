import { graphQLClient } from "@/clients/api";
import { createBookmarkMutaion, deleteBookmarkMutaion } from "@/graphql/mutation/user";
import { getCurrentUserQuery, getUserBookmarksQuery, getUserByIdQuery } from "@/graphql/query/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

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

export const useCreateBookmark = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (tweetId: string) => 
      graphQLClient.request(createBookmarkMutaion, { tweetId }),
    onSuccess: async() => {
      toast.success("Bookmark Added");
      await queryClient.invalidateQueries({queryKey: ["getUserBookmarks"]});
    },
    onError: () => toast.error("Failed to Add bookmark!"),
  });
};

export const useDeleteBookmark = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (tweetId: string) => 
      graphQLClient.request(deleteBookmarkMutaion, { tweetId }),
    onSuccess: async() => {
      await queryClient.invalidateQueries({queryKey: ["getUserBookmarks"]});
      toast.success("Bookmark removed");
    },
    onError: () => toast.error("Failed to remove bookmark!"),
  });
};
