import { Menu, PersonStanding, Plus, User } from "lucide-react";

import { Comfortaa } from "next/font/google";
import * as context from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { getSession, getUser } from "@/lib/auth/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

const display = Comfortaa({ subsets: ["latin"] });

async function AuthNav() {
  const session = await getSession(context);

  if (session) {
    const user = await getUser(context);

    return (
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar>
            <AvatarImage
              src={user?.profilePicture!}
              alt="Your profile picture"
            />
            <AvatarFallback>{user?.username.charAt(0)}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuGroup>
            <p className="px-2 pt-1 text-sm font-semibold">
              {user?.displayName}
            </p>
            <p className="px-2 pb-1 text-sm text-muted-foreground">
              @{user?.username}
            </p>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Link href={`/user/${user?.id}`}>
                <div className="flex items-center">
                  <User className="mr-1.5 w-4 h-4" />
                  <span>Your channel</span>
                </div>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Link href="/sign-in">
      <Button>Sign in</Button>
    </Link>
  );
}

export async function Navbar() {
  return (
    <nav className="sticky top-0 z-10">
      <div className="flex justify-between items-center p-3 bg-background border-b">
        <div className="flex items-center gap-1.5">
          <Button className="max-sm:hidden" variant="ghost" size="icon">
            <Menu size={22} />
          </Button>
          <Link href="/">
            <div className="flex items-center gap-1">
              <Image
                src="/distra.svg"
                alt="distra Logo"
                width={24}
                height={24}
                priority
              />
              <p className={`${display.className} max-sm:hidden`}>distra</p>
            </div>
          </Link>
        </div>
        <div className="flex items-center gap-1.5">
          <Link href="/upload">
            <Button variant="ghost" size="icon">
              <Plus />
            </Button>
          </Link>
          <AuthNav />
        </div>
      </div>
    </nav>
  );
}
