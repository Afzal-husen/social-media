import Image from "next/image";
import React from "react";
import placeholderImage from "@/assets/avatar-placeholder.png";
import { cn } from "@/lib/utils";

type userAvatartProps = {
  avatarUrl: string | null;
  size?: number;
  className?: string;
};
const UserAvatar = (props: userAvatartProps) => {
  return (
    <Image
      src={props.avatarUrl || placeholderImage}
      width={props.size ?? 40}
      height={props.size ?? 40}
      alt="user avatar"
      className={cn(
        "aspect-square h-fit flex-none rounded-full bg-secondary object-cover",
        props.className,
      )}
    />
  );
};

export default UserAvatar;
