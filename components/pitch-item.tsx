import Link from "next/link"
import { Pitch } from "@prisma/client"

import { formatDate } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"

export function PitchItem({ pitch }: { pitch: Pitch }) {
  return (
    <div className="flex items-center justify-between p-4">
      <div className="grid gap-1">
        <Link
          href={`/editor/${pitch.id}`}
          className="font-semibold hover:underline"
        >
          {pitch.subject}
        </Link>
        <div>
          <p className="text-sm text-muted-foreground">
            {formatDate(pitch.createdAt?.toDateString())}
          </p>
        </div>
      </div>
    </div>
  )
}

PitchItem.Skeleton = function PitchItemSkeleton() {
  return (
    <div className="p-4">
      <div className="space-y-3">
        <Skeleton className="w-2/5 h-5" />
        <Skeleton className="w-4/5 h-4" />
      </div>
    </div>
  )
}
