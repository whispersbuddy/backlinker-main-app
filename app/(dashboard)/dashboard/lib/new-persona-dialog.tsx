"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { newPersona } from "@/lib/validations/persona"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"

type NewPersonaFormData = z.infer<typeof newPersona>

export function AddPersonaDialog({ userId }: { userId: string }) {
  const router = useRouter()
  const [showDialog, setShowDialog] = React.useState(false)
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<NewPersonaFormData>({
    resolver: zodResolver(newPersona),
    defaultValues: {
      name: "",
    },
  })

  async function onSubmit(data: NewPersonaFormData) {
    const quantityResponse = await fetch(`/api/users/${userId}/quantity`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    const quantity = await quantityResponse.json()

    if (quantity.availablePersonas > 0) {
      const response = await fetch(`/api/users/${userId}/persona`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
        }),
      })

      if (!response?.ok) {
        setShowDialog(false)
        reset()
        return toast({
          title: "Something went wrong.",
          description: "Error creating user persona. Please try again.",
          variant: "destructive",
        })
      }

      toast({
        description: "New user persona created.",
      })
      setShowDialog(false)
      reset()

      router.refresh()
    } else {
      setShowDialog(false)
      reset()
      return toast({
        title: "No more personas available.",
        description:
          "Please upgrade your subscription quantity in Billing to add more personas.",
        variant: "destructive",
      })
    }
  }

  return (
    <form>
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogTrigger asChild>
          <Button>Add Persona</Button>
        </DialogTrigger>
        {showDialog && (
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>New Persona</DialogTitle>
              <DialogDescription>
                Add a new user persona for outreach for.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col items-start gap-2">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                className="w-full"
                id="name"
                placeholder="John Doe"
                {...register("name")}
              />
              {errors?.name && (
                <p className="px-1 text-xs text-red-600">
                  {errors.name.message || ""}
                </p>
              )}
            </div>
            <DialogFooter>
              <Button onClick={handleSubmit(onSubmit)}>Add Persona</Button>
            </DialogFooter>
          </DialogContent>
        )}
      </Dialog>
    </form>
  )
}
