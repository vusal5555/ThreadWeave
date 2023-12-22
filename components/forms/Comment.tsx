"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { commentValidation } from "@/lib/validations/thread";
import {
  addCommentToThread,
  createThread,
  fetchThread,
} from "@/lib/actions/thread.actions";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { threadId } from "worker_threads";
import Thread from "@/lib/models/thread.model";

interface Props {
  postId: string;
  currentUserImg: string | undefined;
  currentUserId: string;
}

const Comment = ({ postId, currentUserImg, currentUserId }: Props) => {
  const pathname = usePathname();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(commentValidation),
    defaultValues: {
      thread: "",
    },
  });

  async function onSubmit(values: z.infer<typeof commentValidation>) {
    await addCommentToThread(
      postId,
      values.thread,
      JSON.parse(currentUserId),
      pathname
    );

    form.reset();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex items-center gap-4 flex-1 justfiy-start"
      >
        <FormField
          control={form.control}
          name="thread"
          render={({ field }) => (
            <FormItem className="flex items-center gap-3 w-full">
              <FormLabel>
                <Image
                  src={currentUserImg}
                  width={50}
                  height={50}
                  className="rounded-full"
                  alt="profile image"
                ></Image>
              </FormLabel>
              <FormControl className="no-focus border-none bg-transparent rounded-full text-light-1">
                <Input
                  type="text"
                  placeholder="Comment..."
                  className="no-focus text-light-1 outline-none"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" className="comment-form_btn">
          Reply
        </Button>
      </form>
    </Form>
  );
};

export default Comment;
