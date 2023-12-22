import React from "react";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { fetchUser, getUserActivity } from "@/lib/actions/user.actions";
import Link from "next/link";
import Image from "next/image";
import UserCard from "@/components/cards/UserCard";

const Activity = async () => {
  const user = await currentUser();

  if (!user) return null;

  const userInfo: any = await fetchUser(user.id);

  if (!userInfo?.onboarded) redirect("/onboarding");

  const activity: any = await getUserActivity(userInfo._id);

  return (
    <section>
      <h1 className="head-text mb-10">Activity</h1>

      <section className="mt-10 flex flex-col gap-5">
        {activity.length > 0 ? (
          <>
            {activity?.map((act: any) => {
              return (
                <Link href={`/thread/${act.parentId}`}>
                  <article className="activity-card">
                    <Image
                      src={act.author.image}
                      width={20}
                      height={20}
                      alt="logo"
                      className="rounded-full object-cover"
                    ></Image>
                    <p className="!text-small-regular text-light-1">
                      <span className="mr-1 text-primary-500">
                        {act.author.name}
                      </span>{" "}
                      replied to your thread
                    </p>
                  </article>
                </Link>
              );
            })}
          </>
        ) : (
          <p className="!text-base-regular text-light-1">No Activity yet</p>
        )}
      </section>
    </section>
  );
};

export default Activity;
