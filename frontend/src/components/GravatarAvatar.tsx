"use client";
import Image from "next/image";
import md5 from "blueimp-md5";
import { useUser } from "@clerk/nextjs";

export default function GravatarAvatar({ size = 32 }: { size?: number }) {
  const { user } = useUser();
  if (!user) return null;

  const email = user.primaryEmailAddress?.emailAddress?.trim().toLowerCase() || "";
  const gravatar = email ? `https://www.gravatar.com/avatar/${md5(email)}?s=${size}&d=identicon` : "";
  const src = user.imageUrl || gravatar;

  return (
    <Image
      src={src}
      alt="Avatar"
      width={size}
      height={size}
      className="rounded-full"
    />
  );
}
