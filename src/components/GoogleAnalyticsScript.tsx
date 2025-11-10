"use client";

import { GoogleAnalytics } from "@next/third-parties/google";
import { env } from "~/env";

export default function GoogleAnalyticsScript() {
  if (typeof window === "undefined") return null;

  if (env.NEXT_PUBLIC_MODE === "production") {
    return <GoogleAnalytics gaId={env.NEXT_PUBLIC_GOOGLE_ANALYTICS ?? ""} />;
  }

  return null;
}
