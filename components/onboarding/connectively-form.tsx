import Link from "next/link"

import { Label } from "@/components/ui/label"

import { FormDescription } from "../ui/form"
import { Input } from "../ui/input"
import FormWrapper from "./form-wrapper"
import { FormItems } from "./index"

type StepProps = Partial<FormItems> & {
  updateForm: (fieldToUpdate: Partial<FormItems>) => void
  errors: Partial<FormItems>
}

const ConnectivelyForm = ({
  connectivelyUsername,
  connectivelyPassword,
  errors,
  updateForm,
}: StepProps) => {
  return (
    <FormWrapper
      title="Provide Connectively Login Info"
      description="We submit your AI-generated pitches for you to this platform so you don't have to."
    >
      <div className="flex flex-col w-full gap-5 max-h-[300px] px-3 overflow-scroll">
        <p className="text-sm text">
          Click{" "}
          <Link
            target="_blank"
            href="https://connectively.us/#/signup"
            className="text-blue-500 underline hover:text-blue-600"
          >
            here
          </Link>{" "}
          to signup for a Connectively account.
        </p>
        <div className="flex flex-col gap-2">
          <Label htmlFor="name">Connectively Email</Label>
          <Input
            autoFocus
            type="text"
            name="connectivelyUsername"
            id="connectivelyUsername"
            placeholder="e.g. Stephen King"
            value={connectivelyUsername}
            onChange={(e) =>
              updateForm({ connectivelyUsername: e.target.value })
            }
            className="w-full"
            required
          />
          {errors.name && (
            <p className="text-sm text-red-500">
              {errors.connectivelyUsername}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="connectivelyPassword">Connectively Password</Label>
          <Input
            type="password"
            name="connectivelyPassword"
            id="connectivelyPassword"
            placeholder="**********"
            value={connectivelyPassword}
            className="w-full"
            onChange={(e) =>
              updateForm({ connectivelyPassword: e.target.value })
            }
            required
          />
          <p className="text-sm text-gray-400 text">
            Don&apos;t worry, this value is encrypted when saved.
          </p>
          {errors.connectivelyPassword && (
            <p className="text-sm text-red-500">
              {errors.connectivelyPassword}
            </p>
          )}
        </div>
      </div>
    </FormWrapper>
  )
}

export default ConnectivelyForm
