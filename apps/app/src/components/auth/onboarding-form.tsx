"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { AuthTypes } from "~/types/auth.types";
import * as FieldComponent from "../ui/field";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "../ui/field";
import { Button } from "../ui/button";
import { ArrowRight, Loader } from "../ui/icons";
import { useTRPC } from "~/server/api/client";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export default function OnboardingForm() {
  const api = useTRPC();
  const router = useRouter();
  const [toastID, setToastID] = React.useState<string | number>("");
  const form = useForm<AuthTypes.TOnboardUser>({
    resolver: zodResolver(AuthTypes.SOnboardUser),
    mode: "onChange",
    defaultValues: { name: "", role: "user" },
  });

  const { mutateAsync: onboard, isPending: isOnboarding } = useMutation(
    api.user.onboard.mutationOptions({
      onMutate: () =>
        setToastID(
          toast.loading(`Onboarding as ${form.getValues("role")}...`, {
            richColors: true,
          }),
        ),

      onSuccess: () => {
        toast.success(`Successfully onboarded as ${form.getValues("role")}`, {
          id: toastID,
        });
        router.push("/dashboard");
      },

      onError: () =>
        toast.error(`Failed to onboard as ${form.getValues("role")}`, {
          id: toastID,
        }),
    }),
  );

  async function handleSubmit({ name, role }: AuthTypes.TOnboardUser) {
    await onboard({ name, role });
  }

  return (
    <form
      id="form-onboarding"
      onSubmit={form.handleSubmit(handleSubmit)}
      className="w-full space-y-6"
    >
      <FieldComponent.FieldGroup>
        <Controller
          control={form.control}
          name="name"
          render={({ field, fieldState }) => (
            <FieldComponent.Field data-invalid={fieldState.invalid}>
              <FieldComponent.FieldLabel htmlFor="form-onboarding-name">
                Name
              </FieldComponent.FieldLabel>
              <Input
                {...field}
                id="form-onboarding-name"
                autoComplete="off"
                type="text"
                placeholder="Alan Turing"
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
          name="role"
          render={({ field, fieldState }) => (
            <FieldComponent.FieldSet>
              <FieldComponent.FieldLabel htmlFor="form-onboarding-role">
                Select your role
              </FieldComponent.FieldLabel>
              <FieldComponent.FieldDescription>
                How would you like to access the platform?
              </FieldComponent.FieldDescription>
              <RadioGroup
                value={field.value}
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={isOnboarding}
              >
                <FieldLabel htmlFor="form-onboarding-role-user">
                  <Field
                    orientation="horizontal"
                    className="flex items-center!"
                    data-invalid={fieldState.invalid}
                  >
                    <FieldContent>
                      <FieldTitle>User</FieldTitle>
                      <FieldDescription>
                        Access the platform as a user to store and contextualize
                        your medical records
                      </FieldDescription>
                    </FieldContent>
                    <RadioGroupItem
                      value="user"
                      id="form-onboarding-role-user"
                    />
                  </Field>
                </FieldLabel>

                <FieldLabel htmlFor="form-onboarding-role-doctor">
                  <Field
                    orientation="horizontal"
                    className="flex items-center!"
                    data-invalid={fieldState.invalid}
                  >
                    <FieldContent>
                      <FieldTitle>Doctor</FieldTitle>
                      <FieldDescription>
                        Access the platform as a doctor to manage your patients'
                        records
                      </FieldDescription>
                    </FieldContent>
                    <RadioGroupItem
                      value="doctor"
                      id="form-onboarding-role-doctor"
                    />
                  </Field>
                </FieldLabel>
              </RadioGroup>

              {fieldState.invalid && (
                <FieldComponent.FieldError errors={[fieldState.error]} />
              )}
            </FieldComponent.FieldSet>
          )}
        />
      </FieldComponent.FieldGroup>

      <Button disabled={isOnboarding} className="w-full">
        {isOnboarding ? (
          <span>
            <Loader className="size-4 animate-spin" />
          </span>
        ) : (
          <span className="flex items-center gap-1.5">
            Submit <ArrowRight />
          </span>
        )}
      </Button>
    </form>
  );
}
