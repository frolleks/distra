import { Home, LucideIcon } from "lucide-react";
import Link from "next/link";

export function Sidebar() {
  return (
    <div className="max-sm:hidden flex flex-col fixed overflow-auto top-18 w-64 h-[93.1%] bg-background p-2 border-r">
      <SidebarItem href="/" icon={Home} name="Home" />
    </div>
  );
}

interface SidebarItemProps {
  href: string;
  icon: LucideIcon;
  name: string;
}

function SidebarItem({ href, icon, name }: SidebarItemProps) {
  const Icon = icon;

  return (
    <Link href={href}>
      <button className="flex gap-x-3 items-center hover:bg-accent w-full p-2 transition rounded-md">
        <Icon />
        <p className="text-sm">{name}</p>
      </button>
    </Link>
  );
}
