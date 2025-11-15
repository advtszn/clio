import React from "react";
import { auth } from "~/lib/auth/server";
import { headers as getHeaders } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: await getHeaders() });

  if (!session) return redirect("/");

  if (!session.user.onboarded) return redirect("/onboarding");

  return <div>DashboardPage</div>;
}
