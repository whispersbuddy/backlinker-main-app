// Page

import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Icons } from "@/components/icons"
import Pricing from "@/components/pricing"
import Script from 'next/script'
import SenjaWidget from '@/components/ui/SenjaWidget'
import CompanyCard from '@/components/ui/CompanyCard'

export default async function Page() {
  return (
    <>
      <section className="py-8 space-y-4 md:py-10 lg:py-12">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <h1 className="flex flex-col items-center text-3xl leading-10 font-heading sm:text-5xl md:text-6xl lg:text-7xl">
            Automate Your Outreach Using AI
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            We use the power of AI to automate your reporter outreach. For only $300 per month,
            we can get you 3+ backlinks via Featured.com. We manage the process end-to-end.
            Past clients have seen 40% average monthly traffic increase from our service.
          </p>
          <div className="flex flex-col justify-center gap-2">
            <Link
              href="/register"
              className={cn(buttonVariants({ size: "lg" }))}
            >
              Order Now
            </Link>
            <Link
              href="https://calendly.com/backlinkerai/backlinker-ai-demo"
              target="_blank"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              Book a call with the founders
            </Link>
          </div>
        </div>
      </section>
      <section
        id="companies-featuring-clients"
        className="container py-8 space-y-6 bg-slate-50 dark:bg-transparent md:py-12 lg:py-24"
      >
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
              Clients Results
            </h2>
            <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
              We generate, on average, nearly 100 quotes per month for our
              clients and <u>guarantee you get 3 DR 30+ backlinks</u>. All websites will drive your authority score (DR) up.
              You may even <u>get backlinks from reputable sites like this</u> (past client examples
              below).
            </p>
          </div>
        </div>
        <div className="flex flex-row flex-wrap justify-center gap-4">
          <Card className="w-full md:w-fit">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                DR <span className="font-bold text-green-600">91</span> Backlink
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">zdnet.com</div>
              <Link
                className="text-xs text-muted-foreground hover:text-blue-500"
                href="https://www.zdnet.com/home-and-office/best-massage-chair/"
                target={"_blank"}
              >
                View Article with AI-Generated Quote
              </Link>
            </CardContent>
          </Card>
          <Card className="w-full md:w-fit">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                DR <span className="font-bold text-green-600">91</span> Backlink
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">aol.com</div>
              <Link
                className="text-xs text-muted-foreground hover:text-blue-500"
                href="https://www.aol.com/finance/10-ways-recession-proof-grocery-161423661.html"
                target={"_blank"}
              >
                View Article with AI-Generated Quote
              </Link>
            </CardContent>
          </Card>
          <Card className="w-full md:w-fit">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                DR <span className="font-bold text-green-600">90</span> Backlink
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">lifewire.com</div>
              <Link
                className="text-xs text-muted-foreground hover:text-blue-500"
                href="https://www.lifewire.com/how-googles-musiclm-ai-is-inspiring-musicians-to-create-new-tunes-7499263"
                target={"_blank"}
              >
                View Article with AI-Generated Quote
              </Link>
            </CardContent>
          </Card>
          <Card className="w-full md:w-fit">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                DR <span className="font-bold text-green-600">84</span> Backlink
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">cmswire.com</div>
              <Link
                className="text-xs text-muted-foreground hover:text-blue-500"
                href="https://www.cmswire.com/digital-experience/adobes-20b-figma-acquisition-ux-design-game-changer-or-antitrust-roadblock/"
                target={"_blank"}
              >
                View Article with AI-Generated Quote
              </Link>
            </CardContent>
          </Card>
          <Card className="w-full md:w-fit">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                DR <span className="font-bold text-green-600">84</span> Backlink
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">marketingsherpa.com</div>
              <Link
                className="text-xs text-muted-foreground hover:text-blue-500"
                href="https://www.marketingsherpa.com/article/case-study/CMS"
                target={"_blank"}
              >
                View Article with AI-Generated Quote
              </Link>
            </CardContent>
          </Card>
          <Card className="w-full md:w-fit">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                DR <span className="font-bold text-green-600">84</span> Backlink
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">familyhandyman.com</div>
              <Link
                className="text-xs text-muted-foreground hover:text-blue-500"
                href="https://www.familyhandyman.com/list/tiny-house-kits/"
                target={"_blank"}
              >
                View Article with AI-Generated Quote
              </Link>
            </CardContent>
          </Card>
          <Card className="w-full md:w-fit">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                DR <span className="font-bold text-green-600">82</span> Backlink
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">gobankingrates.com</div>
              <Link
                className="text-xs text-muted-foreground hover:text-blue-500"
                href="https://www.gobankingrates.com/investing/real-estate/how-to-prepare-for-financial-stress-of-buying-house-according-to-experts/"
                target={"_blank"}
              >
                View Article with AI-Generated Quote
              </Link>
            </CardContent>
          </Card>
          <Card className="w-full md:w-fit">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                DR <span className="font-bold text-green-600">77</span> Backlink
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">techbullion.com</div>
              <Link
                className="text-xs text-muted-foreground hover:text-blue-500"
                href="https://techbullion.com/business-management-101-lessons-from-successful-entrepreneurs/"
                target={"_blank"}
              >
                View Article with AI-Generated Quote
              </Link>
            </CardContent>
          </Card>
        </div>
        <div className="container py-8 md:py-12">
          <div className="mx-auto text-center">
            <h2 className="text-2xl font-bold tracking-tight mb-8">Featured In</h2>
            <div className="flex flex-nowrap justify-center items-center gap-4 overflow-x-auto px-4 pb-4">
              <CompanyCard 
                logoSrc="/images/cnn-logo.png"
                name="CNN"
                description="Cable News Network, a leading global news organization."
              />
              <CompanyCard 
                logoSrc="/images/forbes-logo.png"
                name="Forbes"
                description="A global media company focusing on business, investing, technology, entrepreneurship, leadership, and lifestyle."
              />
              <CompanyCard 
                logoSrc="/images/go-banking-rates-logo.png"
                name="GoBankingRates"
                description="A personal finance resource providing banking, investing, mortgage, and general financial advice."
              />
              <CompanyCard 
                logoSrc="/images/college-recruiter-logo.png"
                name="College Recruiter"
                description="A leading job board for college students and recent graduates seeking internships and entry-level jobs."
              />
              <CompanyCard 
                logoSrc="/images/az-big-media-logo.webp"
                name="AZBigMedia"
                description="Arizona's leading business news source, covering real estate, economic development, and more."
              />
            </div>
          </div>
        </div>
      </section>
      <section
        id="testimonials"
        className="container py-8 space-y-6 dark:bg-transparent md:py-12 lg:py-16"
      >
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
            What Our Clients Say
          </h2>
        </div>
        <SenjaWidget widgetId="0c0edb3d-841c-42c9-a95c-28ec5d25b11c" />
      </section>
      <section
        id="pricing"
        className="container py-8 space-y-6 dark:bg-transparent md:py-12 lg:py-16"
      >
        <h2 className="text-center font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
          Pricing
        </h2>
        <Pricing freeTierActive={false} />
      </section>
      <section
        id="how-it-works"
        className="container py-8 space-y-6 dark:bg-transparent md:py-12 lg:py-24"
      >
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
              How does it work?
            </h2>
          </div>
          <div className="relative mt-12 lg:mt-20">
            <div className="absolute inset-x-0 hidden xl:px-44 top-2 md:block md:px-20 lg:px-28">
              <img
                className="w-full"
                src="https://cdn.rareblocks.xyz/collection/celebration/images/steps/2/curved-dotted-line.svg"
                alt=""
              />
            </div>
            <div className="relative grid grid-cols-1 gap-12 text-center md:grid-cols-3">
              <div>
                <div className="flex items-center justify-center w-16 h-16 mx-auto bg-white border-2 border-gray-200 rounded-full shadow">
                  <span className="text-xl font-semibold text-gray-700">
                    {" "}
                    1{" "}
                  </span>
                </div>
                <h3 className="mt-6 text-xl font-semibold leading-tight md:mt-10">
                  Provide Your Name, Website, Bio, & other info
                </h3>
                <p className="mt-4 text-base">
                  Just give us your info so that we can set up an account for
                  you. This information will be included in the emails so that
                  reporters can credit the quote to your name and give your
                  website a backlink.
                </p>
                <div className="flex flex-col gap-4 p-3 mt-4 bg-white rounded-md">
                  <p className="flex flex-row text-sm text-muted-foreground">
                    <Icons.check className="text-green-500" />
                    Our AI assistant will craft quality pitches to earn
                    backlinks
                  </p>
                  <p className="flex flex-row text-sm text-muted-foreground">
                    <Icons.check className="text-green-500" /> More than 50+ AI
                    pitches sent per month
                  </p>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-center w-16 h-16 mx-auto bg-white border-2 border-gray-200 rounded-full shadow">
                  <span className="text-xl font-semibold text-gray-700">
                    {" "}
                    2{" "}
                  </span>
                </div>
                <h3 className="mt-6 text-xl font-semibold leading-tight md:mt-10">
                  We Gather Reporter Quote Requests and Use AI To Match Your Bio
                  To Relevant Queries
                </h3>
                <p className="mt-4 text-base">
                  AI determines which queries are relevant to your bio and then
                  we will respond to relevant pitches
                </p>
                <div className="flex flex-col gap-4 p-3 mt-4 bg-white rounded-md">
                  <p className="flex flex-row text-sm text-muted-foreground">
                    <Icons.check className="text-green-500"/>                    If your bio is more general it will reply to more queries
                  </p>
                  <p className="flex flex-row text-sm text-muted-foreground">
                    <Icons.check className="text-green-500" /> Great Bios often
                    lead to better pitch categorization and generation
                  </p>
                  <p className="flex flex-row text-sm text-muted-foreground">
                    <Icons.check className="text-green-500" /> Responding to
                    relevant pitches leads to more backlinks
                  </p>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-center w-16 h-16 mx-auto bg-white border-2 border-gray-200 rounded-full shadow">
                  <span className="text-xl font-semibold text-gray-700">
                    {" "}
                    3{" "}
                  </span>
                </div>
                <h3 className="mt-6 text-xl font-semibold leading-tight md:mt-10">
                  AI Will Create Pitches For You & Submit Them For Requests
                </h3>
                <p className="mt-4 text-base">
                  Our powerful AI system will generate thoughtful, technical
                  responses and send pitches on your behalf.
                </p>
                <div className="flex flex-col gap-4 p-3 mt-4 bg-white rounded-md">
                  <p className="flex flex-row text-sm text-muted-foreground">
                    <Icons.check className="text-green-500" />
                    Our AI assistant will craft quality pitches to earn
                    backlinks
                  </p>
                  <p className="flex flex-row text-sm text-muted-foreground">
                    <Icons.check className="text-green-500" /> Anywhere from
                    50-300+ AI emails sent per month
                  </p>
                  <p className="flex flex-row text-sm text-muted-foreground">
                    <Icons.check className="text-green-500" /> Emails are sent
                    with time delay to avoid suspicion
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        id="faqs"
        className="container py-8 space-y-6 bg-slate-50 dark:bg-transparent md:py-12 lg:py-24"
      >
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
              Frequently Asked Questions
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Any questions? We&apos;re here to help.
            </p>
          </div>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>
                Does Backlinker AI Need To Send Emails From My Email?
              </AccordionTrigger>
              <AccordionContent>
                We do not send any emails from your email. We connect to the
                Connectively system and submit AI generated pitches on that
                platform on your behalf.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                Can Backlinker AI Guarantee Backlinks?
              </AccordionTrigger>
              <AccordionContent>
                Yes! We will guarantee that you will get 3+ backlinks
                and we will guarantee a minimum of at least 50+ pitches per
                month, or we will keep pitching for you..
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>
                How Is This Better Than Other Services
              </AccordionTrigger>
              <AccordionContent>
                We&apos;ve talked with people who have spent $1000+ per month on
                link building companies and our service is:
                <ul>
                  <li>- Cheaper</li>
                  <li>- Our AI-enabled system can reply to more requests</li>
                  <li>- Completely hands off for you</li>
                  <li>- You get a monthly report sent to you via email</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>
      <section
        id="join-now"
        className="container py-8 space-y-6 bg-slate-50 dark:bg-transparent md:py-12 lg:py-24"
      >
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex items-center justify-center">
              <div className="w-20 h-20 -mr-6 overflow-hidden bg-gray-300 rounded-full">
                <img
                  className="object-cover w-full h-full"
                  src="https://cdn.rareblocks.xyz/collection/celebration/images/cta/2/female-avatar-1.jpg"
                  alt=""
                />
              </div>
              <div className="relative overflow-hidden bg-gray-300 border-8 border-white rounded-full w-28 h-28">
                <img
                  className="object-cover w-full h-full"
                  src="https://cdn.rareblocks.xyz/collection/celebration/images/cta/2/male-avatar-1.jpg"
                  alt=""
                />
              </div>
              <div className="w-20 h-20 -ml-6 overflow-hidden bg-gray-300 rounded-full">
                <img
                  className="object-cover w-full h-full"
                  src="https://cdn.rareblocks.xyz/collection/celebration/images/cta/2/female-avatar-2.jpg"
                  alt=""
                />
              </div>
            </div>
            <h2 className="mt-8 text-3xl font-bold leading-tight lg:mt-12 sm:text-4xl lg:text-5xl">
              Join <span className="border-b-8 border-blue-500">hundreds</span>{" "}
              of other founders, bloggers, real estate agents, technologists and
              more
            </h2>
            <Link
              href="/login"
              target="_blank"
              className={cn(
                "mt-4",
                buttonVariants({ size: "lg" }),
                "whitespace-nowrap px-2"
              )}
            >
              Start Sending Pitches Now
            </Link>
          </div>
        </div>
      </section>

      {/* New footer section with Terms link */}
      <footer className="container py-4 mt-8">
        <div className="flex justify-between items-center">
          <Link
            href="/terms-and-conditions"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            Terms And Conditions
          </Link>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Backlinker AI. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  )
}