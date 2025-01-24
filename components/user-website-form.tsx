"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { User } from "@prisma/client"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { userWebsiteSchema } from "@/lib/validations/user"
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

interface UserNameFormProps extends React.HTMLAttributes<HTMLFormElement> {
  user: Pick<User, "id" | "website">
}

type FormData = z.infer<typeof userWebsiteSchema>

export function UserWebsiteForm({
  user,
  className,
  ...props
}: UserNameFormProps) {
  const router = useRouter()
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(userWebsiteSchema),
    defaultValues: {
      website: user?.website || "",
    },
  })
  const newWebsite = watch("website")
  const [isSaving, setIsSaving] = React.useState<boolean>(false)

  async function onSubmit(data: FormData) {
    setIsSaving(true)

    const response = await fetch(`/api/users/${user.id}/website`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        website: data.website,
      }),
    })

    setIsSaving(false)

    if (!response?.ok) {
      return toast({
        title: "Something went wrong.",
        description: "Your website was not updated. Please try again.",
        variant: "destructive",
      })
    }

    toast({
      description: "Your website has been updated.",
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
          <CardTitle>Website</CardTitle>
          <CardDescription>Please enter your website.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="website">
              Website
            </Label>
            <div className="flex flex-row gap-2">
              <Input
                type="text"
                id="website"
                placeholder="https://example.com"
                className="w-full"
                size={32}
                {...register("website")}
              />
              <button
                type="submit"
                className={cn(buttonVariants(), className)}
                disabled={isSaving || user.website === newWebsite}
              >
                {isSaving && (
                  <Icons.spinner className="w-4 h-4 mr-2 animate-spin" />
                )}
                <span>Save</span>
              </button>
            </div>
            {errors?.website && (
              <p className="px-1 text-xs text-red-600">
                {errors.website.message}
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </form>
  )
}
