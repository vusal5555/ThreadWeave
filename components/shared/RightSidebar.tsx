import React from "react";

import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { fetchUser } from "@/lib/actions/user.actions";

import { fetchCommunities } from "@/lib/actions/community.actions";
import CommunityCard from "@/components/cards/CommunityCard";

const RightSidebar = async () => {
  const user = await currentUser();

  if (!user) return null;

  const userInfo: any = await fetchUser(user.id);

  if (!userInfo?.onboarded) redirect("/onboarding");

  const result = await fetchCommunities({
    searchString: "",
    pageNumber: 1,
    pageSize: 10,
  });

  return (
    <section className="custom-scrollbar rightsidebar">
      <div className="flex flex-1 flex-col justify-start">
        <h3 className="text-heading4-medium text-light-1 mb-5">
          Suggested communities
        </h3>
        {result.communities.length === 0 ? (
          <p className="no-result">No Communities</p>
        ) : (
          result.communities.map((community) => {
            return (
              <CommunityCard
                key={user.id}
                id={community.id}
                name={community.name}
                username={community.username}
                imgUrl={community.image}
                bio={community.bio}
                members={community.members}
              ></CommunityCard>
            );
          })
        )}
      </div>
    </section>
  );
};

export default RightSidebar;
