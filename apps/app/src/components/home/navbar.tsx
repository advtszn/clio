"use client";

import Link from "next/link";
import React from "react";
import { auth } from "~/lib/auth/react";
import AuthDialog from "../auth/auth-dialog";
import { Button } from "../ui/button";
import {
  ArrowRight,
  ChevronDown,
  Cpu,
  LogOut,
  User2,
  UserCircle,
} from "lucide-react";
import { Skeleton } from "../ui/skeleton";
import * as DropdownComponent from "../ui/dropdown-menu";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function HomeNavbar() {
  const router = useRouter();
  const { data: session, isPending } = auth.useSession();

  return (
    <header className="supports-backdrop-filter:bg-background/40 sticky top-0 z-40 w-full border-b backdrop-blur-xs">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-primary text-primary-foreground grid size-8 place-items-center rounded-none font-bold">
            C
          </div>
          <span className="text-xl font-semibold tracking-tight">Clio</span>
        </Link>

        {isPending ? (
          <div className="flex items-center gap-2">
            <Skeleton className="h-9 w-28" />
          </div>
        ) : !session?.user ? (
          <div className="flex items-center gap-2">
            <AuthDialog mode="sign-in">
              <Button variant="outline">Sign in</Button>
            </AuthDialog>
            <AuthDialog mode="sign-up">
              <Button variant="default">Sign up</Button>
            </AuthDialog>
          </div>
        ) : (
          <DropdownComponent.DropdownMenu>
            <DropdownComponent.DropdownMenuTrigger asChild>
              <Button
                autoFocus={false}
                className="flex items-center gap-4"
                variant="outline"
              >
                <span className="flex items-center gap-1.5">
                  <UserCircle /> {session.user.name}
                </span>{" "}
                <ChevronDown />
              </Button>
            </DropdownComponent.DropdownMenuTrigger>
            <DropdownComponent.DropdownMenuContent className="w-48" align="end">
              <DropdownComponent.DropdownMenuItem asChild>
                <Link href="/dashboard">
                  <Cpu /> Dashboard
                </Link>
              </DropdownComponent.DropdownMenuItem>
              <DropdownComponent.DropdownMenuItem disabled>
                <User2 />
                Profile (coming soon)
              </DropdownComponent.DropdownMenuItem>
              <DropdownComponent.DropdownMenuSeparator />
              <DropdownComponent.DropdownMenuItem
                onClick={() =>
                  toast.promise(
                    async () => {
                      await auth.signOut();
                      router.refresh();
                    },
                    {
                      loading: "Signing out...",
                      success: "Signed out successfully!",
                      error: "Failed to sign out!",
                      richColors: true,
                    },
                  )
                }
                variant="destructive"
              >
                <LogOut />
                Sign Out
              </DropdownComponent.DropdownMenuItem>
            </DropdownComponent.DropdownMenuContent>
          </DropdownComponent.DropdownMenu>
        )}
      </div>
    </header>
  );
}
