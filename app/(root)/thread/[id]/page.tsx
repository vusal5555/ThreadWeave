import React from "react";
import ThreadCard from "@/components/cards/ThreadCard";
import { fetchThreadById } from "@/lib/actions/thread.actions";
import { currentUser } from "@clerk/nextjs";
import { fetchUser } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import Comment from "@/components/forms/Comment";

const Thread = async ({ params }: { params: { id: string } }) => {
  if (!params.id) return null;

  const user = await currentUser();
  if (!user) return null;

  const post = await fetchThreadById(params.id);

  const userInfo = await fetchUser(user?.id);

  if (!userInfo?.onboarded) redirect("/onboarding");

  return (
    <section className="relative">
      <div>
        <ThreadCard
          key={post._id}
          id={post._id}
          currentUserId={user?.id}
          parentId={post.parentId}
          content={post.text}
          author={post.author}
          community={post.community}
          createdAt={post.createdAt}
          comments={post.comments}
        ></ThreadCard>
      </div>

      <div className="mt-7">
        <Comment
          postId={post._id.toJSON()}
          currentUserImg={userInfo.image}
          currentUserId={JSON.stringify(userInfo._id)}
        ></Comment>
      </div>

      <div className="mt-7">
        {post.children.map((child: any) => {
          return (
            <ThreadCard
              key={child._id}
              id={child._id}
              currentUserId={user?.id}
              parentId={child.parentId}
              content={child.text}
              author={child.author}
              community={child.community}
              createdAt={child.createdAt}
              comments={child.comments}
              isComment={true}
            ></ThreadCard>
          );
        })}
      </div>
    </section>
  );
};

export default Thread;
