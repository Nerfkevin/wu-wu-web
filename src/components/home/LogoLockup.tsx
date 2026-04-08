"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function LogoLockup({ className }: { className?: string }) {
  const [hideImg, setHideImg] = useState(false);

  return (
    <Link
      href="/"
      className={cn("flex items-center gap-2.5 shrink-0", className)}
    >
      {!hideImg ? (
        <Image
          src="/brand/logo.png"
          alt=""
          width={40}
          height={40}
          className="h-9 w-9 rounded-xl object-cover ring-1 ring-white/10"
          onError={() => setHideImg(true)}
          unoptimized
        />
      ) : null}
      <span className="font-instrument-serif bg-gradient-to-r from-violet-300 to-fuchsia-300 bg-clip-text text-lg font-normal tracking-tight text-transparent sm:text-xl">
        Wu-Wu
      </span>
    </Link>
  );
}
