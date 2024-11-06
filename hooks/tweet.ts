import { graphQLClient } from "@/clients/api";
import { CreateTweetData } from "@/gql/graphql";
import { createTweetMutation } from "@/graphql/mutation/tweet";
import { getAllTweetsQuery } from "@/graphql/query/tweet";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";


export const useCreateTweet = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
      mutationFn: (payload: CreateTweetData) => 
          graphQLClient.request(createTweetMutation, {payload}),
          onMutate: () => toast.loading("Creating Post", {id: "1"}),
      onSuccess: async() => {
        await queryClient.invalidateQueries({queryKey: ["tweets"]});
        toast.success("Post created", {id: "1"});
      },
      onError: (error) => toast.error(error.response.errors[0].message),
  });

  return mutation;
};

export const useGetAllTweets = () => {
  const query = useQuery({
    queryKey: ["tweets"],
    queryFn: () => graphQLClient.request(getAllTweetsQuery),
  });

  return { ...query, tweets: query.data?.getAllTweets };
};