"use client";

import React from "react";
import { auth } from "~/lib/auth/react";
import AuthDialog from "../auth/auth-dialog";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function GetStarted() {
  const { data: session } = auth.useSession();

  return (
    <>
      {!session?.user ? (
        <AuthDialog mode="sign-up">
          <Button size="lg" className="">
            Get started <ArrowRight className="size-4" />
          </Button>
        </AuthDialog>
      ) : (
        <Button size="lg" asChild>
          <Link href="/dashboard">
            Get started <ArrowRight />
          </Link>
        </Button>
      )}
    </>
  );
}
