import React from "react";
import OnboardingForm from "~/components/auth/onboarding-form";
import { auth } from "~/lib/auth/server";
import { headers as getHeaders } from "next/headers";
import { redirect } from "next/navigation";

export default async function OnboardingPage() {
  const session = await auth.api.getSession({ headers: await getHeaders() });

  if (!session) return redirect("/");

  if (session.user.onboarded) return redirect("/dashboard");

  return (
    <div className="max-w-md mx-auto space-y-8 min-h-screen flex flex-col items-center justify-center">
      <div className="space-y-4">
        <h1 className="text-4xl text-center font-semibold">Welcome to Clio!</h1>
        <p className="text-muted-foreground text-center">
          Complete this quick onboarding process to get you started.
        </p>
      </div>
      <OnboardingForm />
    </div>
  );
}
