"use client";

import React from "react";
import * as DialogComponent from "../ui/dialog";
import { AuthTypes } from "~/types/auth.types";
import AuthForm from "./auth-form";
import { Button } from "../ui/button";
import { Loader } from "lucide-react";

export default function AuthDialog({
  mode = "sign-up",
  children,
}: {
  mode: AuthTypes.TAuthModes;
  children: React.ReactNode;
}) {
  const [dialogMode, setDialogMode] = React.useState(mode);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  return (
    <DialogComponent.Dialog>
      <DialogComponent.DialogTrigger asChild>
        {children}
      </DialogComponent.DialogTrigger>
      <DialogComponent.DialogContent>
        <DialogComponent.DialogHeader>
          <DialogComponent.DialogTitle>
            {dialogMode === "sign-in" ? "Sign In" : "Sign Up"}
          </DialogComponent.DialogTitle>
          <DialogComponent.DialogDescription>
            {dialogMode === "sign-in" ? (
              <>
                Don't have an account?{" "}
                <span
                  onClick={() => setDialogMode("sign-up")}
                  className="cursor-pointer underline underline-offset-4"
                >
                  Sign up
                </span>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <span
                  onClick={() => setDialogMode("sign-in")}
                  className="cursor-pointer underline underline-offset-4"
                >
                  Sign in
                </span>
              </>
            )}
          </DialogComponent.DialogDescription>
        </DialogComponent.DialogHeader>
        <AuthForm mode={dialogMode} setIsSubmittingAction={setIsSubmitting} />
        <DialogComponent.DialogFooter>
          <Button disabled={isSubmitting} type="submit" form="form-auth">
            {isSubmitting ? (
              <>
                <Loader className="animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit"
            )}
          </Button>
        </DialogComponent.DialogFooter>
      </DialogComponent.DialogContent>
    </DialogComponent.Dialog>
  );
}
