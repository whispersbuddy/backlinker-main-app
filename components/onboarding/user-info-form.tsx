import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { Textarea } from "../ui/textarea"
import FormWrapper from "./form-wrapper"
import { FormItems } from "./index"

type StepProps = Partial<FormItems> & {
  updateForm: (fieldToUpdate: Partial<FormItems>) => void
  errors: Partial<FormItems>
}

const UserInfoForm = ({
  name,
  bio,
  website,
  errors,
  updateForm,
}: StepProps) => {
  return (
    <FormWrapper
      title="Personal info"
      description="Please provide your name, bio, and website."
    >
      <div className="flex flex-col w-full gap-5 max-h-[300px] px-3 overflow-scroll">
        <div className="flex flex-col gap-2">
          <Label htmlFor="name">Name</Label>
          <Input
            autoFocus
            type="text"
            name="name"
            id="name"
            placeholder="e.g. Stephen King"
            value={name}
            onChange={(e) => updateForm({ name: e.target.value })}
            className="w-full"
            required
          />
          {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea
            name="bio"
            id="bio"
            placeholder="Enter a short bio describing yourself and/or business"
            value={bio}
            className="w-full"
            onChange={(e) => updateForm({ bio: e.target.value })}
            rows={10}
            required
          />
          {errors.bio && (
            <p className="text-sm text-red-500">
              {errors.bio} - {`${bio ? bio.length : 0}/50`}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="website">Website</Label>
          <Input
            type="text"
            name="website"
            id="website"
            placeholder="www.example.com"
            value={website}
            prefix="https://"
            className="w-full"
            onChange={(e) => updateForm({ website: e.target.value })}
            required
          />
          {errors.website && (
            <p className="text-sm text-red-500">{errors.website}</p>
          )}
        </div>
      </div>
    </FormWrapper>
  )
}

export default UserInfoForm
