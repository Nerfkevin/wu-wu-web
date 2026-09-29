import { NextRequest, NextResponse } from "next/server";
import { innerCircleConfig } from "@/lib/inner-circle/config";
import { isHttpUrl, resolveEnrollment } from "@/lib/inner-circle/enrollment";

export const dynamic = "force-dynamic";

export function GET(request: NextRequest) {
  const enrollment = resolveEnrollment(Date.now(), innerCircleConfig);
  if (isHttpUrl(innerCircleConfig.checkoutUrl)) {
    return NextResponse.redirect(innerCircleConfig.checkoutUrl, 302);
  }

  const back = new URL("/yunmeisinnercircle", request.url);
  back.searchParams.set("enrollment", enrollment.status);
  back.hash = "invitation";
  return NextResponse.redirect(back, 302);
}
