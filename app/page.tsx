import { redirect } from "next/navigation";

import { detectPreferredLocale } from "@/lib/server-locale";

export default async function RootPage() {
  const locale = await detectPreferredLocale();
  redirect(`/${locale}`);
}
