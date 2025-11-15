"use client";

import React from "react";
import { AuthTypes } from "~/types/auth.types";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as FieldComponent from "../ui/field";
import { Input } from "../ui/input";
import { auth } from "~/lib/auth/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { logger } from "@clio/logger";

export default function AuthForm({
  mode,
  setIsSubmittingAction,
}: {
  mode: AuthTypes.TAuthModes;
  setIsSubmittingAction: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const router = useRouter();
  const form = useForm<AuthTypes.TAuthSchema>({
    defaultValues: { email: "", password: "" },
    resolver: zodResolver(AuthTypes.SAuthSchema),
    mode: "onChange",
  });

  async function handleSubmit({ email, password }: AuthTypes.TAuthSchema) {
    setIsSubmittingAction(true);

    const toastID = toast.loading(
      mode === "sign-in" ? "Signing in..." : "Signing up...",
      { richColors: true },
    );

    try {
      switch (mode) {
        case "sign-in":
          const { error: signInError } = await auth.signIn.email({
            email,
            password,
          });

          if (signInError) {
            setIsSubmittingAction(false);
            throw new Error(signInError.message);
          }

          toast.success("Signed in successfully!", { id: toastID });

          router.push("/dashboard");

          break;

        case "sign-up":
          const { error: signUpError } = await auth.signUp.email({
            email,
            password,
            name: "",
          });

          if (signUpError) {
            setIsSubmittingAction(false);
            throw new Error(signUpError.message);
          }

          toast.success("Signed up successfully!", { id: toastID });

          router.push("/onboarding");

          break;

        default:
          break;
      }

      setIsSubmittingAction(false);
    } catch (error) {
      logger.error(error);

      toast.error("Failed to sign in", {
        description:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred!",
        id: toastID,
      });
    }
  }

  return (
    <form id="form-auth" onSubmit={form.handleSubmit(handleSubmit)}>
      <FieldComponent.FieldGroup>
        <Controller
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <FieldComponent.Field data-invalid={fieldState.invalid}>
              <FieldComponent.FieldLabel htmlFor="form-auth-email">
                Email
              </FieldComponent.FieldLabel>
              <Input
                {...field}
                id="form-auth-email"
                autoComplete="off"
                type="email"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && (
                <FieldComponent.FieldError errors={[fieldState.error]} />
              )}
            </FieldComponent.Field>
          )}
        />
        <Controller
          control={form.control}
          name="password"
          render={({ field, fieldState }) => (
            <FieldComponent.Field data-invalid={fieldState.invalid}>
              <FieldComponent.FieldLabel htmlFor="form-auth-password">
                Password
              </FieldComponent.FieldLabel>
              <Input
                {...field}
                id="form-auth-password"
                type="password"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && (
                <FieldComponent.FieldError errors={[fieldState.error]} />
              )}
            </FieldComponent.Field>
          )}
        />
      </FieldComponent.FieldGroup>
    </form>
  );
}
