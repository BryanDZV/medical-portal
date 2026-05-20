"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const PROFILE_IMAGE_UPDATED_EVENT = "profile-image-updated";

type ProfileAvatarProps = {
  name: string;
  profileKey: string;
  className?: string;
};

export function ProfileAvatar({ name, profileKey, className = "" }: ProfileAvatarProps) {
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    const readImage = () => {
      setImage(localStorage.getItem(profileKey));
    };

    readImage();

    const handleProfileImageUpdate = () => {
      readImage();
    };

    window.addEventListener(PROFILE_IMAGE_UPDATED_EVENT, handleProfileImageUpdate);
    window.addEventListener("storage", handleProfileImageUpdate);

    return () => {
      window.removeEventListener(PROFILE_IMAGE_UPDATED_EVENT, handleProfileImageUpdate);
      window.removeEventListener("storage", handleProfileImageUpdate);
    };
  }, [profileKey]);

  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className={`relative flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-slate-200 text-slate-700 shadow-sm ring-4 ring-white ${className}`}
      aria-label="Foto de perfil"
    >
      {image ? (
        <Image src={image} alt="Foto de perfil" fill sizes="128px" className="object-cover" />
      ) : (
        <span className="text-lg font-bold sm:text-xl">{initials}</span>
      )}
    </div>
  );
}