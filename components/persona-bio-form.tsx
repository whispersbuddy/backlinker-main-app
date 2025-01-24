"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Persona, User } from "@prisma/client"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { userBioSchema } from "@/lib/validations/user"
import { buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { Icons } from "@/components/icons"

import { Textarea } from "./ui/textarea"

interface PersonaBioFormProps extends React.HTMLAttributes<HTMLFormElement> {
  persona: Pick<Persona, "id" | "bio">
  user: Pick<User, "id">
}

type FormData = z.infer<typeof userBioSchema>

export function PersonaBioForm({
  persona,
  user,
  className,
  ...props
}: PersonaBioFormProps) {
  const router = useRouter()
  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(userBioSchema),
    defaultValues: {
      bio: persona?.bio || "",
    },
  })
  const newBio = watch("bio")
  const [isSaving, setIsSaving] = React.useState<boolean>(false)

  async function onSubmit(data: FormData) {
    setIsSaving(true)

    const response = await fetch(
      `/api/users/${user.id}/persona/${persona.id}/bio`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bio: data.bio,
        }),
      }
    )

    setIsSaving(false)

    if (!response?.ok) {
      return toast({
        title: "Something went wrong.",
        description: "Persona bio was not updated. Please try again.",
        variant: "destructive",
      })
    }

    toast({
      description: "Persona bio has been updated.",
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
          <CardTitle>Bio</CardTitle>
          <CardDescription>
            Please enter a descriptive bio in the 1st person.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="bio">
              Bio
            </Label>
            <div className="flex flex-col items-end gap-2">
              <Textarea id="bio" className="w-full" {...register("bio")} />
              <button
                type="submit"
                className={cn(buttonVariants(), className)}
                disabled={isSaving || persona.bio === newBio}
              >
                {isSaving && (
                  <Icons.spinner className="w-4 h-4 mr-2 animate-spin" />
                )}
                <span>Save</span>
              </button>
            </div>
            {errors?.bio && (
              <p className="px-1 text-xs text-red-600">{errors.bio.message}</p>
            )}
          </div>
        </CardContent>
      </Card>
    </form>
  )
}
