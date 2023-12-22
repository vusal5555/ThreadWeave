import { fetchUserPosts } from "@/lib/actions/user.actions";
import React from "react";
import ThreadCard from "../cards/ThreadCard";
import { currentUser } from "@clerk/nextjs";

interface Props {
  currentUserId: string;
  accountId: string;
  accountType: string;
}

const ThreadsTab = async ({ currentUserId, accountId, accountType }: Props) => {
  const posts = await fetchUserPosts(accountId);

  console.log(posts);

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
                : { name: post.name, image: post.image, id: post.id }
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
