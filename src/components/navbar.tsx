import { Menu, Plus } from "lucide-react";

import { Comfortaa } from "next/font/google";
import * as context from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { getSession, getUser } from "@/lib/auth/utils";

const display = Comfortaa({ subsets: ["latin"] });

async function AuthNav() {
  const session = await getSession(context);

  if (session) {
    const user = await getUser(context);

    return <p className="text-sm">{user?.username}</p>;
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
      <div className="flex justify-between items-center p-3.5 bg-background border-b">
        <div className="flex items-center gap-1.5">
          <button className="max-sm:hidden hover:bg-accent transition p-1.5 rounded-md">
            <Menu size={22} />
          </button>
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
