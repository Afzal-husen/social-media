"use client";

import { useSession } from "@/lib/session-provider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

import UserAvatar from "./user-avatar";
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import Link from "next/link";
import { LogOut, UserIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { logout } from "@/app/(auth)/action";

type UserButtonProps = {
  className?: string;
};

const UserButton = (props: UserButtonProps) => {
  const { user } = useSession();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className={cn("flex-none rounded-full", props.className)}>
          <UserAvatar avatarUrl={user.avatarUrl} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="cursor-pointer">
          logged in as: {user.username}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <Link href={`/users/${user.username}`}>
          <DropdownMenuItem className="flex cursor-pointer items-center gap-1">
            <UserIcon className="size-5 shrink-0 text-muted-foreground" />
            {"Profile"}
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={async () => await logout()}
        >
          <LogOut className="size-5 shrink-0 text-muted-foreground" />
          {"Logout"}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
