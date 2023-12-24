import Link from "next/link";
import React from "react";
import Image from "next/image";
import { SignedIn, SignOutButton, OrganizationSwitcher } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

const TopBar = () => {
  return (
    <nav className="topbar">
      <Link href="/" className="flex items-center gap-4">
        <Image src="/assets/logo.svg" alt="Logo" width={28} height={28}></Image>
        <p className="text-heading3-bold text-light-1 hidden md:block">
          ThreadWeave
        </p>
      </Link>
      <div className="flex items-center gap-3">
        <div className="block md:hidden">
          <SignedIn>
            <SignOutButton>
              <div className="flex cursort-pointer">
                <Image
                  src="/assets/logout.svg"
                  alt="logoout"
                  width={24}
                  height={24}
                ></Image>
              </div>
            </SignOutButton>
          </SignedIn>
        </div>

        <OrganizationSwitcher
          appearance={{
            baseTheme: dark,
            elements: {
              organizationSwitcherTrigger: "py-2 px-4",
            },
          }}
        ></OrganizationSwitcher>
      </div>
    </nav>
  );
};

export default TopBar;
