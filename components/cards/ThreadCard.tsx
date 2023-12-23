import Link from "next/link";
import React from "react";
import Image from "next/image";
import { formatDateString } from "@/lib/utils";

interface Props {
  id: string;
  currentUserId: string | undefined;
  parentId: string;
  content: string;
  author: {
    name: string;
    image: string;
    id: string;
  };
  community: {
    id: string;
    name: string;
    image: string;
  } | null;
  createdAt: string;
  comments: {
    author: {
      image: string;
    };
  }[];
  isComment?: Boolean;
}

const ThreadCard = ({
  id,
  currentUserId,
  parentId,
  content,
  author,
  community,
  createdAt,
  comments,
  isComment,
}: Props) => {
  return (
    <article
      className={`flex w-full flex-col rounded-xl mb-4 ${
        isComment ? "px-0 xs:px-7" : "bg-dark-2 p-7"
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex w-full flex-1 flex-row gap-4">
          <div className="flex flex-col items-center">
            <Link href={`/profile/${author.id}`} className="relative w-11 h-11">
              <Image
                src={author.image}
                fill
                alt="Profile Image"
                className="cursor-pointer rounded-full"
              ></Image>
            </Link>

            <div className="thread-card_bar"></div>
          </div>
          <div className="flex w-full flex-col">
            <Link href={`/profile/${author.id}`} className="w-fit">
              <h4 className="cursor-pointer text-light-1 text-base-semibold">
                {author.name}
              </h4>
            </Link>

            <p className="mt-2 text-small-regular text-light-2">{content}</p>

            <div className="mt-5 flex flex-col gap-3">
              <div className="flex gap-3.5">
                <Image
                  src="/assets/heart-gray.svg"
                  alt="heart"
                  width={24}
                  height={24}
                  className="cursor-pointer object-contain"
                ></Image>
                <Link href={`/thread/${id}`}>
                  <Image
                    src="/assets/reply.svg"
                    alt="reply"
                    width={24}
                    height={24}
                    className="cursor-pointer object-contain"
                  ></Image>
                </Link>

                <Image
                  src="/assets/repost.svg"
                  alt="repost"
                  width={24}
                  height={24}
                  className="cursor-pointer object-contain"
                ></Image>
                <Image
                  src="/assets/share.svg"
                  alt="shared"
                  width={24}
                  height={24}
                  className="cursor-pointer object-contain"
                ></Image>
              </div>
              {/* {isComment && comments.length < 0 && (
                <Link href={`/thread/${id}`}>
                  <p className="mt-1 text-subtle-media text-gray-1">
                    {comments.length} replies
                  </p>
                </Link>
              )} */}
            </div>
          </div>
        </div>

        {!isComment && community && (
          <Link
            href={`/communities/${community.id}`}
            className="mt-5 flex items-center"
          >
            <p className="text-subtle-medium text-gray-1">
              {formatDateString(createdAt)} - {community.name} Community
            </p>
            <Image
              src={community.image}
              alt={community.name}
              width={14}
              height={14}
              className="ml-1 rounded-full object-cover"
            ></Image>
          </Link>
        )}
      </div>
    </article>
  );
};

export default ThreadCard;
