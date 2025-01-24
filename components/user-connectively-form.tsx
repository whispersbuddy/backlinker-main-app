"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { User } from "@prisma/client"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { userConnectivelySchema } from "@/lib/validations/user"
import { buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"

interface UserConnectivelyFormProps
  extends React.HTMLAttributes<HTMLFormElement> {
  user: Pick<User, "id" | "connectivelyUsername" | "connectivelyPassword">
}

type FormData = z.infer<typeof userConnectivelySchema>

export function UserConnectivelyForm({
  user,
  className,
  ...props
}: UserConnectivelyFormProps) {
  const router = useRouter()
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(userConnectivelySchema),
    defaultValues: {
      connectivelyUsername: user?.connectivelyUsername || "",
      connectivelyPassword: user?.connectivelyPassword || "",
    },
  })
  const newUsername = watch("connectivelyUsername")
  const newPassword = watch("connectivelyPassword")
  const [isSaving, setIsSaving] = React.useState<boolean>(false)
  const [showPassword, setShowPassword] = React.useState<boolean>(false)

  async function onSubmit(data: FormData) {
    setIsSaving(true)

    const response = await fetch(`/api/users/${user.id}/connectively`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        connectivelyUsername: data.connectivelyUsername,
        connectivelyPassword: data.connectivelyPassword,
      }),
    })

    setIsSaving(false)

    if (!response?.ok) {
      return toast({
        title: "Something went wrong.",
        description:
          "Your connectively info was not updated. Please try again.",
        variant: "destructive",
      })
    }

    toast({
      description: "Your connectively info has been updated.",
    })

    router.refresh()
  }

  return (
    <form
      className={cn(className)}
      onSubmit={handleSubmit(onSubmit)}
      {...props}
    >
      <Card>
        <CardHeader className="flex flex-col items-start justify-between">
          <CardTitle>Your Connectively Info</CardTitle>
          <CardDescription>
            We use{" "}
            <Link
              target="_blank"
              className="text-blue-600 hover:underline"
              href="https://connectively-knowledge-base.notion.site/Connectively-Help-Center-38b9c8c82876478ea478cadad69d7dc1"
            >
              Connectively
            </Link>{" "}
            to discover relevant requests from Journalists for you and submit a
            pitch on your behalf.
            <br />
            Sign Up for a connectively account{" "}
            <Link
              target="_blank"
              className="text-blue-600 hover:underline"
              href="https://connectively.us/signup"
            >
              here
            </Link>{" "}
            and then enter your credentials below.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <Label htmlFor="connectivelyUsername">Email</Label>
            <Input
              id="connectivelyUsername"
              placeholder="example@email.com"
              className="w-full"
              size={32}
              {...register("connectivelyUsername")}
            />
            {errors?.connectivelyUsername && (
              <p className="px-1 text-xs text-red-600">
                {errors.connectivelyUsername.message}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <Label
              className="flex flex-row items-center gap-2"
              htmlFor="connectivelyPassword"
            >
              Password
              {showPassword ? (
                <Icons.eye
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="w-4 h-4"
                />
              ) : (
                <Icons.eyeOff
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="w-4 h-4"
                />
              )}
            </Label>
            <Input
              type={showPassword ? "text" : "password"}
              id="connectivelyPassword"
              placeholder="**********"
              className="w-full"
              size={32}
              {...register("connectivelyPassword")}
            />
            <p className="text-sm text-gray-400 text">
              This value is encrypted when saved.
            </p>
            {errors?.connectivelyPassword && (
              <p className="px-1 text-xs text-red-600">
                {errors.connectivelyPassword.message}
              </p>
            )}
            <button
              type="submit"
              className={cn(buttonVariants(), className)}
              disabled={
                isSaving ||
                (user.connectivelyUsername === newUsername &&
                  user.connectivelyPassword === newPassword)
              }
            >
              {isSaving && (
                <Icons.spinner className="w-4 h-4 mr-2 animate-spin" />
              )}
              <span>Save</span>
            </button>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}
