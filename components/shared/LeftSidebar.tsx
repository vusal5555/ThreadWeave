"use client";

import React from "react";
import { sidebarLinks } from "@/constants";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { SignedIn, SignOutButton, useAuth } from "@clerk/nextjs";

const LeftSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const { userId } = useAuth();

  return (
    <section className="custom-scrollbar leftsidebar">
      <div className="flex w-full flex-1 flex-col gap-6 px-6 text-light-1">
        {sidebarLinks.map((link) => {
          if (link.route === "/profile") link.route = `${link.route}/${userId}`;
          return (
            <Link
              href={link.route}
              key={link.label}
              className={`leftsidebar_link ${
                pathname === link.route && "bg-primary-500"
              }`}
            >
              <Image
                src={link.imgURL}
                width={24}
                alt={link.label}
                height={24}
              ></Image>
              <p className="max-lg:hidden">{link.label}</p>
            </Link>
          );
        })}
      </div>

      <div className="mt-10 px-6">
        <SignedIn>
          <SignOutButton signOutCallback={() => router.push("/")}>
            <div className="flex cursort-pointer gap-3">
              <Image
                src="/assets/logout.svg"
                alt="logoout"
                width={24}
                height={24}
              ></Image>
              <p className="text-light-1 max-lg:hidden">Log Out</p>
            </div>
          </SignOutButton>
        </SignedIn>
      </div>
    </section>
  );
};

export default LeftSidebar;
