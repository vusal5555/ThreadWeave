import { fetchUserPosts } from "@/lib/actions/user.actions";
import React from "react";
import ThreadCard from "../cards/ThreadCard";
import { currentUser } from "@clerk/nextjs";
import { fetchCommunityPosts } from "@/lib/actions/community.actions";

interface Props {
  currentUserId: string;
  accountId: string;
  accountType: string;
}

const ThreadsTab = async ({ currentUserId, accountId, accountType }: Props) => {
  let posts: any;

  if (accountType === "Community") {
    posts = await fetchCommunityPosts(accountId);
  } else {
    posts = await fetchUserPosts(accountId);
  }

  const user = await currentUser();

  return (
    <section>
      {posts.threads.map((post: any) => {
        return (
          <ThreadCard
            key={post._id}
            id={post._id}
            currentUserId={user?.id}
            parentId={post.parentId}
            content={post.text}
            author={
              accountType === "User"
                ? { name: posts.name, image: posts.image, id: posts.id }
                : {
                    name: post.author.name,
                    image: post.author.image,
                    id: post.author.id,
                  }
            }
            community={post.community}
            createdAt={post.createdAt}
            comments={post.comments}
          ></ThreadCard>
        );
      })}
    </section>
  );
};

export default ThreadsTab;
