import React from "react"
import Link from "next/link"

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Progress } from "../ui/progress"
import { Skeleton } from "../ui/skeleton"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip"

export default function BacklinkCard({ link }: { link: any }) {
  let domainColor = "bg-slate-500"
  if (parseInt(link.source.domain_authority) <= 49) domainColor = "bg-red-500"
  if (
    parseInt(link.source.domain_authority) > 50 &&
    parseInt(link.source.domain_authority) <= 69
  )
    domainColor = "bg-yellow-500"
  if (parseInt(link.source.domain_authority) > 70) domainColor = "bg-green-500"

  return (
    <Card className="w-fill">
      <div className="flex flex-row items-center gap-2 px-2 pt-2">
        <Progress
          className={domainColor}
          value={link.source.domain_authority}
        />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="hover:cursor-help">
              {link.source.domain_authority}
            </TooltipTrigger>
            <TooltipContent>
              <p className="font-semibold">Domain Authority</p>
              <p>
                This sites domain authority is {link.source.domain_authority}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium">
          <a
            target="_blank"
            rel="noreferrer"
            href={`//${link.source.page}` || "#"}
          >
            {link.source.root_domain}
          </a>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{link.source.title}</div>
        <p className="text-base">Last Crawled: {link.source.last_crawled}</p>
      </CardContent>
    </Card>
  )
}

// eslint-disable-next-line react/display-name
BacklinkCard.Skeleton = function () {
  return (
    <Card className="w-[250px] md:w-fit">
      <div className="flex flex-row items-center gap-2 px-2 pt-2">
        <Skeleton className="w-full h-5" />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>DA</TooltipTrigger>
          </Tooltip>
        </TooltipProvider>
      </div>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium">
          <Skeleton className="w-1/2 h-5" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          <Skeleton className="w-3/4 h-5" />
        </div>
        <Skeleton className="w-full h-12" />
      </CardContent>
    </Card>
  )
}
