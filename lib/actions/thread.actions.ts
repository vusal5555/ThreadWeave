"use server";

import { connectDb } from "../mongoose";
import Thread from "../models/thread.model";
import User from "../models/user.model";
import { revalidatePath } from "next/cache";

interface Params {
  text: string;
  author: string;
  communityId: string | null;
  path: string;
}

export async function createThread({
  text,
  author,
  communityId,
  path,
}: Params) {
  connectDb();

  try {
    const createdThreads = await Thread.create({
      text,
      author,
      community: null,
    });

    await User.findByIdAndUpdate(author, {
      $push: { threads: createdThreads._id },
    });
  } catch (error: any) {
    throw new Error(error);
  }

  revalidatePath(path);
}

export async function fetchThreads(pageNum = 1, pageSize = 20) {
  connectDb();

  const skipAmount = (pageNum - 1) * pageSize;

  try {
    const postsQuery = Thread.find({
      parentId: { $in: [null, undefined] },
    })
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(pageSize)
      .populate({ path: "author", model: User })
      .populate({
        path: "children",
        populate: {
          path: "author",
          model: User,
          select: "_id name parentId image",
        },
      });

    const totalPostsCount = await Thread.countDocuments({
      parentId: { $in: [null, undefined] },
    });

    const posts = await postsQuery.exec();

    const isNext = totalPostsCount > skipAmount + posts.length;

    return { posts, isNext };
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function fetchThread(id: string) {
  connectDb();

  try {
    const postsQuery = Thread.findById({
      _id: id,
      parentId: { $in: [null, undefined] },
    })
      .populate({
        path: "author",
        model: User,
        select: "_id id name parentId image",
      })
      .populate({
        path: "children",
        populate: [
          {
            path: "author",
            model: User,
            select: "_id id name parentId image",
          },
          {
            path: "children",
            model: Thread,
            populate: {
              path: "author",
              model: User,
              select: "_id id name parentId image",
            },
          },
        ],
      });

    const posts = await postsQuery.exec();

    return posts;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function addCommentToThread(
  postId: string,
  comentText: string,
  userId: string,
  path: string
) {
  connectDb();

  const originalThread = await Thread.findById(postId);

  if (!originalThread) {
    throw new Error("Thread not found");
  }

  const commentThread = new Thread({
    text: comentText,
    author: userId,
    parentId: postId,
  });

  const savedCommentThread = await commentThread.save();

  originalThread.children.push(savedCommentThread._id);

  await originalThread.save();

  revalidatePath(path);

  try {
  } catch (error: any) {
    throw new Error(error.message);
  }
}
