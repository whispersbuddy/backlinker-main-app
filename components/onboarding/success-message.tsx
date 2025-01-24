import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { RefreshCcw } from "lucide-react"

import { cn } from "@/lib/utils"

import { Icons } from "../icons"
import { buttonVariants } from "../ui/button"

const successVariants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ease: "backIn",
      duration: 0.6,
    },
  },
}

const SuccessMessage = ({ stripeUrl }: { stripeUrl: string }) => {
  const goTotripe = () => (window.location.href = stripeUrl)
  return (
    <motion.section
      className="flex flex-col items-center justify-center w-full h-full gap-4 text-center md:gap-2"
      variants={successVariants}
      initial="hidden"
      animate="visible"
    >
      <Icons.check />
      <h4 className="text-2xl font-semibold md:text-3xl">Thank you!</h4>
      <p className="max-w-md text-sm md:text-base">
        Thanks for providing that information! Click the button below to
        securely pay via our Stripe integration. We will not begin generating AI
        pitches for you until that step is complete. (You can also pay later in
        the <Link href="/dashboard/billing">Billing</Link> section)
      </p>
      <p className="max-w-md text-sm md:text-base">
        If you ever need support, please feel free to email us at{" "}
        <Link
          target="_blank"
          rel="noreferrer"
          href="mailto:help@backlinker.ai"
          className="text-blue-500 underline"
        >
          help@backlinker.ai
        </Link>
      </p>
      <div className="flex items-center mt-6">
        <button
          onClick={goTotripe}
          className={cn(buttonVariants({ variant: "default" }), "gap-2")}
        >
          <Image
            src={"/images/stripe.svg"}
            alt={"Stripe logo"}
            width={20}
            height={20}
          />{" "}
          Pay with Stripe
        </button>
      </div>
    </motion.section>
  )
}

export default SuccessMessage
