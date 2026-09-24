"use client";

import Image from "next/image";
import { itsYunmeiConfig } from "@/lib/itsyunmei/config";

export function BrandLockup() {
  return (
    <div className="mb-3 flex flex-col items-center sm:mb-5">
      <div className="h-11 w-11 overflow-hidden rounded-[10px] shadow-[0_8px_18px_rgba(129,21,229,0.28)] ring-1 ring-black/5 sm:h-14 sm:w-14 sm:rounded-[12px]">
        <Image
          src={itsYunmeiConfig.logoSrc}
          alt=""
          width={56}
          height={56}
          className="h-full w-full object-cover"
          priority
          fetchPriority="high"
          decoding="sync"
          unoptimized
        />
      </div>
      <p className="mt-2 text-[11px] font-semibold tracking-[0.08em] text-[#9428ff] sm:mt-3 sm:text-[12px]">
        {itsYunmeiConfig.copy.brand}
      </p>
    </div>
  );
}
