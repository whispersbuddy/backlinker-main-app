import { notFound } from "next/navigation"
import { getServerSession } from "next-auth"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { DashboardHeader } from "@/components/header"
import { Icons } from "@/components/icons"
import { PersonaBioForm } from "@/components/persona-bio-form"
import { PersonaLinkedinForm } from "@/components/persona-linkedin-form"
import { PersonaNameForm } from "@/components/persona-name-form"
import { PersonaWebsiteForm } from "@/components/persona-website-form"
import { DashboardShell } from "@/components/shell"
import { UserBioForm } from "@/components/user-bio-form"
import { UserConnectivelyForm } from "@/components/user-connectively-form"
import { UserNameForm } from "@/components/user-name-form"
import { UserWebsiteForm } from "@/components/user-website-form"

import DeletePersonaDialog from "./lib/delete-persona-dialog"
import { AddPersonaDialog } from "./lib/new-persona-dialog"
import { Marker } from "@/components/ui/Marker";
import "@radix-ui/themes/styles.css";
import {
	ArrowDownIcon,
	ArrowUpIcon,
	CheckIcon,
	CopyIcon,
	Cross2Icon,
	DotsHorizontalIcon,
	DrawingPinFilledIcon,
	DrawingPinIcon,
	OpenInNewWindowIcon,
	PlusIcon,
	Share2Icon,
} from "@radix-ui/react-icons";

import {
	Avatar,
	Badge,
	Box,
	Button,
	Card,
	Checkbox,
	DropdownMenu,
	Flex,
	Grid,
	Heading,
	IconButton,
	Link,
	Separator,
	Strong,
	Switch,
	Text,
	TextField,
	Theme,
} from "@radix-ui/themes";
import HeaderNav from "@/components/header-nav"

// // Simple state to make the example functional
// const [state, setState] = React.useState({
//   todo: [
//     { id: "a", completed: false },
//     { id: "b", completed: false },
//     { id: "c", completed: false },
//     { id: "d", completed: false },
//     { id: "e", completed: true },
//     { id: "f", completed: true },
//   ],
//   activityPinned: true,
//   financePinned: false,
// });



export default async function PersonasPage() {
  const session = await getServerSession(authOptions)

  if (!session || !session?.user) {
    notFound()
  }

  const unsortedPersona = await db.persona.findMany({
    where: {
      userId: session.user.id,
    },
  })

  const personas = unsortedPersona.sort((a, b) =>
    a.createdAt < b.createdAt ? -1 : 1
  )

  return (
    <DashboardShell>
      <Theme hasBackground={false}>
        <div className="flex h-16 items-center px-4"><button className="inline-flex items-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2 w-[200px] justify-between" role="combobox" aria-expanded="false" aria-label="Select a team" type="button" aria-haspopup="dialog" aria-controls="radix-:r7d:" data-state="closed"><span className="relative flex shrink-0 overflow-hidden rounded-full mr-2 h-5 w-5"><img className="aspect-square h-full w-full grayscale" alt="Alicia Koch" src="https://avatar.vercel.sh/personal.png" /></span>Alicia Koch<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-chevrons-up-down ml-auto opacity-50"><path d="m7 15 5 5 5-5"></path><path d="m7 9 5-5 5 5"></path></svg></button><nav className="flex items-center space-x-4 lg:space-x-6 mx-6"><a className="text-sm font-medium transition-colors hover:text-primary" href="/examples/dashboard">Overview</a><a className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary" href="/examples/dashboard">Customers</a><a className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary" href="/examples/dashboard">Products</a><a className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary" href="/examples/dashboard">Settings</a></nav><div className="ml-auto flex items-center space-x-4"><div><input className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm md:w-[100px] lg:w-[300px]" placeholder="Search..." type="search" /></div><button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground px-4 py-2 relative h-8 w-8 rounded-full" type="button" id="radix-:r7e:" aria-haspopup="menu" aria-expanded="false" data-state="closed"><span className="relative flex shrink-0 overflow-hidden rounded-full h-8 w-8"><img className="aspect-square h-full w-full" alt="@shadcn" src="/avatars/01.png" /></span></button></div></div>
        <Flex align="center" gap="6">
          <Flex flexShrink="0" gap="6" direction="column" width="640px">
            <Card size="4">
              <Heading as="h3" size="6" trim="start" mb="2">
                Your team
              </Heading>

              <Text as="p" size="2" mb="5" color="gray">
                Invite and manage your team members.
              </Text>

              <Flex gap="3" mb="5">
                <Box flexGrow="1">
                  <TextField.Root
                    size="2"
                    placeholder="Email address"
                  />
                </Box>
                <Button size="2">
                  Invite
                </Button>
              </Flex>

              <Flex direction="column">
                {[4, 2, 12, 20, 16].map((number, i) => (
                  <Box key={number}>
                    <Flex gap="4" align="center">
                      <Flex gap="3" align="center" width="200px">
                        <Avatar
                          src=""
                          fallback=""
                        />
                        <Link
                          href="#"
                          size="2"
                          wrap="nowrap"
                          
                        >
                          Test User
                        </Link>
                      </Flex>

                      <Text size="2" color="gray">
                        test@gmail.com
                      </Text>

                      <Flex flexGrow="1" justify="end">
                        <DropdownMenu.Root>
                          <DropdownMenu.Trigger>
                            <IconButton
                              color="gray"
                              variant="ghost"
                            >
                              <DotsHorizontalIcon />
                            </IconButton>
                          </DropdownMenu.Trigger>
                          <DropdownMenu.Content
                            variant="soft"
                          >
                            <DropdownMenu.Item>View profile</DropdownMenu.Item>
                            <DropdownMenu.Item>Change role</DropdownMenu.Item>
                            <DropdownMenu.Separator />
                            <DropdownMenu.Item color="red">
                              Remove
                            </DropdownMenu.Item>
                          </DropdownMenu.Content>
                        </DropdownMenu.Root>
                      </Flex>
                    </Flex>

                    {i !== 4 && (
                      <Box>
                        <Separator size="4" my="3" />
                      </Box>
                    )}
                  </Box>
                ))}
              </Flex>
            </Card>

            <Card size="4">
              <Heading as="h3" size="6" trim="start" mb="2">
                Notifications
              </Heading>

              <Text as="p" size="2" mb="6" color="gray">
                Manage your notification settings.
              </Text>

              <Box>
                <Separator size="4" my="5" />
              </Box>

              <Flex direction="column">
                <Flex gap="9" align="start" justify="between">
                  <Box>
                    <Heading as="h4" size="3" mb="1">
                      Comments
                    </Heading>
                    <Text as="p" size="2" color="gray">
                      Receive notifications when someone comments on your documents
                      or mentions you.
                    </Text>
                  </Box>
                  <Flex direction="column" gap="4" mt="1">
                    <Flex asChild gap="2">
                      <Text as="label" size="2" weight="bold">
                        <Switch defaultChecked />
                        <Text>Push</Text>
                      </Text>
                    </Flex>

                    <Flex asChild gap="2">
                      <Text as="label" size="2" weight="bold">
                        <Switch defaultChecked />
                        <Text>Email</Text>
                      </Text>
                    </Flex>

                    <Flex asChild gap="2">
                      <Text as="label" size="2" weight="bold">
                        <Switch />
                        <Text>Slack</Text>
                      </Text>
                    </Flex>
                  </Flex>
                </Flex>

                <Box>
                  <Separator size="4" my="5" />
                </Box>

                <Flex gap="9" align="start" justify="between">
                  <Box>
                    <Heading as="h4" size="3" mb="1">
                      Favorites
                    </Heading>
                    <Text as="p" size="2" color="gray">
                      Receive notifications when there is activity related to your
                      favorited items.
                    </Text>
                  </Box>
                  <Flex direction="column" gap="4" mt="1">
                    <Flex asChild gap="2">
                      <Text as="label" size="2" weight="bold">
                        <Switch defaultChecked />
                        <Text>Push</Text>
                      </Text>
                    </Flex>

                    <Flex asChild gap="2">
                      <Text as="label" size="2" weight="bold">
                        <Switch defaultChecked />
                        <Text>Email</Text>
                      </Text>
                    </Flex>

                    <Flex asChild gap="2">
                      <Text as="label" size="2" weight="bold">
                        <Switch />
                        <Text>Slack</Text>
                      </Text>
                    </Flex>
                  </Flex>
                </Flex>

                <Box>
                  <Separator size="4" my="5" />
                </Box>

                <Flex gap="9" align="start" justify="between">
                  <Box>
                    <Heading as="h4" size="3" mb="1">
                      New documents
                    </Heading>
                    <Text as="p" size="2" color="gray">
                      Receive notifications whenever people on your team create new
                      documents.
                    </Text>
                  </Box>
                  <Flex direction="column" gap="4" mt="1">
                    <Flex asChild gap="2">
                      <Text as="label" size="2" weight="bold">
                        <Switch defaultChecked />
                        <Text>Push</Text>
                      </Text>
                    </Flex>

                    <Flex asChild gap="2">
                      <Text as="label" size="2" weight="bold">
                        <Switch defaultChecked />
                        <Text>Email</Text>
                      </Text>
                    </Flex>

                    <Flex asChild gap="2">
                      <Text as="label" size="2" weight="bold">
                        <Switch />
                        <Text>Slack</Text>
                      </Text>
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>
            </Card>

            <Card size="4">
              <Heading as="h3" size="6" trim="start" mb="2">
                Pricing
              </Heading>

              <Text as="p" size="2" mb="5" color="gray">
                No credit card required. Every plan includes a 30-day trial of all
                Pro features.
              </Text>

              <Grid columns="3" gap="6">
                <Flex direction="column">
                  <Text weight="bold" size="5" mb="1">
                    Basic
                  </Text>
                  <Text color="gray" size="2" mb="4">
                    3 team members
                  </Text>
                  <Text weight="bold" size="5" mb="4">
                    $0
                    <Text
                      size="5"
                      weight="bold"
                      style={{ color: "var(--gray-a8)" }}
                    >
                      {" / mo"}
                    </Text>
                  </Text>

                  <Flex direction="column" gap="2">
                    <Flex gap="2" align="center">
                      <Marker>
                        <CheckIcon width="14" height="14" />
                      </Marker>
                      <Text size="2">Expense tracking</Text>
                    </Flex>
                    <Flex gap="2" align="center">
                      <Marker>
                        <CheckIcon width="14" height="14" />
                      </Marker>
                      <Text size="2">Invoicing</Text>
                    </Flex>
                    <Flex gap="2" align="center">
                      <Marker>
                        <CheckIcon width="14" height="14" />
                      </Marker>
                      <Text size="2">Payment tracking</Text>
                    </Flex>
                    <Flex gap="2" align="center">
                      <Marker>
                        <CheckIcon width="14" height="14" />
                      </Marker>
                      <Text size="2">Transaction recording</Text>
                    </Flex>
                    <Flex gap="2" align="center">
                      <Marker>
                        <CheckIcon width="14" height="14" />
                      </Marker>
                      <Text size="2">Basic reports</Text>
                    </Flex>
                    <Flex gap="2" align="center">
                      <Marker>
                        <CheckIcon width="14" height="14" />
                      </Marker>
                      <Text size="2">Email support</Text>
                    </Flex>
                    <Button  mt="3" variant="outline">
                      Downgrade
                    </Button>
                  </Flex>
                </Flex>

                <Flex direction="column">
                  <Text weight="bold" size="5" mb="1">
                    Growth
                  </Text>
                  <Text color="gray" size="2" mb="4">
                    10 team members
                  </Text>
                  <Text weight="bold" size="5" mb="4">
                    $49
                    <Text
                      size="5"
                      weight="bold"
                      style={{ color: "var(--gray-a8)" }}
                    >
                      {" / mo"}
                    </Text>
                  </Text>

                  <Flex direction="column" gap="2">
                    <Flex gap="2" align="center">
                      <Marker>
                        <CheckIcon width="14" height="14" />
                      </Marker>
                      <Text size="2">Online payments</Text>
                    </Flex>
                    <Flex gap="2" align="center">
                      <Marker>
                        <CheckIcon width="14" height="14" />
                      </Marker>
                      <Text size="2">Recurring invoices</Text>
                    </Flex>
                    <Flex gap="2" align="center">
                      <Marker>
                        <CheckIcon width="14" height="14" />
                      </Marker>
                      <Text size="2">Bill management</Text>
                    </Flex>
                    <Flex gap="2" align="center">
                      <Marker>
                        <CheckIcon width="14" height="14" />
                      </Marker>
                      <Text size="2">Inventory tracking</Text>
                    </Flex>
                    <Flex gap="2" align="center">
                      <Marker>
                        <CheckIcon width="14" height="14" />
                      </Marker>
                      <Text size="2">Detailed reports</Text>
                    </Flex>
                    <Flex gap="2" align="center">
                      <Marker>
                        <CheckIcon width="14" height="14" />
                      </Marker>
                      <Text size="2">Phone support</Text>
                    </Flex>
                    <Button  mt="3" variant="outline">
                      Go to Billing
                    </Button>
                  </Flex>
                </Flex>

                <Flex direction="column">
                  <Text weight="bold" size="5" mb="1">
                    Pro
                  </Text>
                  <Text color="gray" size="2" mb="4">
                    Unlimited team members
                  </Text>
                  <Text weight="bold" size="5" mb="4">
                    $99
                    <Text
                      size="5"
                      weight="bold"
                      style={{ color: "var(--gray-a8)" }}
                    >
                      {" / mo"}
                    </Text>
                  </Text>

                  <Flex direction="column" gap="2">
                    <Flex gap="2" align="center">
                      <Marker>
                        <CheckIcon width="14" height="14" />
                      </Marker>
                      <Text size="2">Custom invoices</Text>
                    </Flex>
                    <Flex gap="2" align="center">
                      <Marker>
                        <CheckIcon width="14" height="14" />
                      </Marker>
                      <Text size="2">Multi-business</Text>
                    </Flex>
                    <Flex gap="2" align="center">
                      <Marker>
                        <CheckIcon width="14" height="14" />
                      </Marker>
                      <Text size="2">Team collaboration</Text>
                    </Flex>
                    <Flex gap="2" align="center">
                      <Marker>
                        <CheckIcon width="14" height="14" />
                      </Marker>
                      <Text size="2">App integrations</Text>
                    </Flex>
                    <Flex gap="2" align="center">
                      <Marker>
                        <CheckIcon width="14" height="14" />
                      </Marker>
                      <Text size="2">Advanced security</Text>
                    </Flex>
                    <Flex gap="2" align="center">
                      <Marker>
                        <CheckIcon width="14" height="14" />
                      </Marker>
                      <Text size="2">Priority support</Text>
                    </Flex>
                    <Button  mt="3">
                      Upgrade
                    </Button>
                  </Flex>
                </Flex>
              </Grid>
            </Card>
          </Flex>

          <Flex flexShrink="0" gap="6" direction="column" width="416px">
            <Card size="4">
              <Heading as="h3" size="6" trim="start" mb="5">
                Sign up
              </Heading>

              <Box mb="5">
                <Flex mb="1">
                  <Text
                    as="label"
                    htmlFor="example-email-field"
                    size="2"
                    weight="bold"
                  >
                    Email address
                  </Text>
                </Flex>
                <TextField.Root
                  
                  placeholder="Enter your email"
                  id="example-email-field"
                />
              </Box>

              <Box mb="5" position="relative">
                <Flex align="baseline" justify="between" mb="1">
                  <Text
                    as="label"
                    size="2"
                    weight="bold"
                    htmlFor="example-password-field"
                  >
                    Password
                  </Text>
                  <Link
                    href="#"
                    
                    size="2"
                    
                  >
                    Forgot password?
                  </Link>
                </Flex>
                <TextField.Root
                  
                  placeholder="Enter your password"
                  id="example-password-field"
                />
              </Box>

              <Flex mt="6" justify="end" gap="3">
                <Button  variant="outline">
                  Create an account
                </Button>
                <Button >Sign in</Button>
              </Flex>
            </Card>

            <Card size="4">
              <Box position="absolute" top="0" right="0" m="3">
                <IconButton
                  
                  variant="ghost"
                  color="gray"
                  highContrast
                >
                  <Cross2Icon width="20" height="20" />
                </IconButton>
              </Box>

              <Heading as="h3" size="6" trim="start" mb="2">
                Your company card
              </Heading>

              <Text as="p" size="2" mb="6" color="gray">
                View and manage your corporate card.
              </Text>

              <Box
                p="6"
                style={{
                  backgroundColor: "var(--gray-a3)",
                  borderRadius: "var(--radius-4)",
                }}
              >
                <Theme appearance="dark" asChild>
                  <Flex
                    direction="column"
                    justify="between"
                    height="168px"
                    style={
                      {
                        background:
                          "linear-gradient(to top right, var(--accent-9), #E18BFF)",
                        boxShadow: "0 1px 20px -5px #7971E9AA",
                        borderRadius: "var(--radius-3)",
                        "--gray-12": "white",
                      } as React.CSSProperties
                    }
                  >
                    <Text weight="medium" mt="3" mx="3" size="2">
                      Sophie Johnson
                    </Text>
                    <Box>
                      <Flex align="center" gap="3" mb="1" mx="3">
                        <Text size="2">
                          4929 3849
                          {/* An empty span prevents iOS Safari from thinking it's a telephone number */}
                          <span> </span>
                          5027 1846
                        </Text>
                        <IconButton
                          
                          variant="ghost"
                          color="gray"
                          size="1"
                          highContrast
                        >
                          <CopyIcon />
                        </IconButton>
                      </Flex>
                      <Flex gap="3" mb="2" mx="3">
                        <Text size="2">01 / 27</Text>
                        <Text size="2">999</Text>
                      </Flex>
                    </Box>
                  </Flex>
                </Theme>
              </Box>

              <Flex mt="6" justify="end" gap="3">
                <Button  variant="outline" color="red">
                  Freeze
                </Button>
                <Button >Done</Button>
              </Flex>
            </Card>

            <Card size="4">
              <Box position="absolute" top="0" right="0" m="3">
                <IconButton
                  
                  variant="ghost"
                  color="gray"
                  highContrast
                >
                  <Cross2Icon width="20" height="20" />
                </IconButton>
              </Box>

              <Flex gap="3" direction="column" align="center">
                <Marker height="48px" width="48px">
                  <CheckIcon width="32" height="32" />
                </Marker>

                <Heading as="h3" size="6" mb="2">
                  Invoice paid
                </Heading>
              </Flex>

              <Text as="p" size="3" align="center" mb="5">
                You paid $17,975.30. A receipt copy was sent to{" "}
                <Strong>accounting@example.com</Strong>
              </Text>

              <Flex direction="column" gap="3" align="stretch">
                <Button >Next invoice</Button>

                <Button  variant="outline">
                  Done
                </Button>
              </Flex>
            </Card>

            <Card size="4">
              <Box position="absolute" top="0" right="0" m="3">
                <IconButton
                  
                  variant="ghost"
                  color="gray"
                  highContrast
                >
                  <Cross2Icon width="20" height="20" />
                </IconButton>
              </Box>

              <Heading as="h3" size="6" trim="start" mb="5">
                Invoice{" "}
                <Link
                  href="#"
                  
                  weight="bold"
                  
                >
                  #3463
                </Link>
              </Heading>

              <Grid columns="2" gapX="4" gapY="5">
                <Box>
                  <Text as="div" size="2" mb="1" color="gray">
                    Issued
                  </Text>
                  <Text as="div" size="3" weight="bold">
                    June 21, 2023
                  </Text>
                </Box>

                <Box>
                  <Text as="div" size="2" mb="1" color="gray">
                    Due
                  </Text>
                  <Text as="div" size="3" weight="bold">
                    July 21, 2023
                  </Text>
                </Box>

                <Box>
                  <Text as="div" size="2" mb="1" color="gray">
                    To
                  </Text>
                  <Text as="div" size="3" mb="1" weight="bold">
                    Paradise Ventures
                  </Text>
                  <Text as="div" size="2">
                    742 Evergreen Terrace, Springfield, IL 62704
                  </Text>
                </Box>

                <Box>
                  <Text as="div" size="2" mb="1" color="gray">
                    From
                  </Text>
                  <Text as="div" size="3" mb="1" weight="bold">
                    Rogue Widgets
                  </Text>
                  <Text as="div" size="2">
                    1600 Baker Street NW, Washington, DC 20500
                  </Text>
                </Box>

                <Flex direction="column" gap="1" gridColumn="1 / -1">
                  <Flex justify="between">
                    <Text size="2" mb="1" color="gray">
                      Services
                    </Text>
                    <Text size="2" mb="1" color="gray">
                      Price
                    </Text>
                  </Flex>
                  <Flex justify="between">
                    <Text size="3" mb="1" weight="bold">
                      Branding
                    </Text>
                    <Text size="2">$20,000</Text>
                  </Flex>
                  <Flex justify="between">
                    <Text size="3" mb="1" weight="bold">
                      Marketing website
                    </Text>
                    <Text size="2">$17,500</Text>
                  </Flex>
                  <Box>
                    <Separator size="4" mt="1" mb="2" />
                  </Box>
                  <Flex justify="between">
                    <Text size="2">Total</Text>
                    <Text size="2">$38,500</Text>
                  </Flex>
                </Flex>
              </Grid>

              <Flex mt="6" justify="end" gap="3">
                <Button  variant="outline" color="red">
                  Reject
                </Button>
                <Button >Approve</Button>
              </Flex>
            </Card>
          </Flex>

          <Flex flexShrink="0" gap="6" direction="column" width="640px">
            <Card size="4">
              <Heading as="h3" size="6" trim="start" mb="2">
                Financial performance
              </Heading>

              <Flex position="absolute" top="0" right="0" m="3">
                <IconButton
                  
                  variant="ghost"
                  color="gray"
                  highContrast
                  style={{ margin: 0 }}
                >
                  <OpenInNewWindowIcon width="20" height="20" />
                </IconButton>

                <IconButton
                  
                  color="gray"
                  highContrast
                  style={{ margin: 0 }}
                >
                  <DrawingPinIcon width="20" height="20" />
                </IconButton>
              </Flex>

              <Text as="p" size="2" mb="6" color="gray">
                Review your company’s KPIs compared to the month before.
              </Text>

              <Grid columns="3" gap="5">
                <Box>
                  <Flex gap="2" mb="2" align="center">
                    <Text size="2" color="gray">
                      MRR
                    </Text>
                    <Badge color="teal" radius="full">
                      <ArrowUpIcon
                        width="12"
                        height="12"
                        style={{ marginLeft: -2 }}
                      />
                      3.2%
                    </Badge>
                  </Flex>
                  <Text as="div" mb="2" size="8" weight="bold">
                    $350K
                  </Text>
                </Box>

                <Box>
                  <Flex gap="2" mb="2" align="center">
                    <Text size="2" color="gray">
                      OpEx
                    </Text>
                    <Badge color="red" radius="full">
                      <ArrowUpIcon
                        width="12"
                        height="12"
                        style={{ marginLeft: -2 }}
                      />
                      12.8%
                    </Badge>
                  </Flex>
                  <Text as="div" mb="2" size="8" weight="bold">
                    $211K
                  </Text>
                </Box>

                <Box>
                  <Flex gap="2" mb="2" align="center">
                    <Text size="2" color="gray">
                      CapEx
                    </Text>
                    <Badge color="teal" radius="full">
                      <ArrowDownIcon
                        width="12"
                        height="12"
                        style={{ marginLeft: -2 }}
                      />
                      8.8%
                    </Badge>
                  </Flex>
                  <Text as="div" mb="2" size="8" weight="bold">
                    $94K
                  </Text>
                </Box>

                <Box>
                  <Flex gap="2" mb="2" align="center">
                    <Text size="2" color="gray">
                      GPM
                    </Text>
                    <Badge color="red" radius="full">
                      <ArrowDownIcon
                        width="12"
                        height="12"
                        style={{ marginLeft: -2 }}
                      />
                      1.2%
                    </Badge>
                  </Flex>
                  <Text as="div" mb="2" size="8" weight="bold">
                    44.6%
                  </Text>
                </Box>

                <Box>
                  <Flex gap="2" mb="2" align="center">
                    <Text size="2" color="gray">
                      NPM
                    </Text>
                    <Badge color="gray" variant="surface" radius="full">
                      0.0%
                    </Badge>
                  </Flex>
                  <Text as="div" mb="2" size="8" weight="bold">
                    9.1%
                  </Text>
                </Box>

                <Box>
                  <Flex gap="2" mb="2" align="center">
                    <Text size="2" color="gray">
                      EBITDA
                    </Text>
                    <Badge color="teal" radius="full">
                      <ArrowUpIcon
                        width="12"
                        height="12"
                        style={{ marginLeft: -2 }}
                      />
                      4.1%
                    </Badge>
                  </Flex>
                  <Text as="div" mb="2" size="8" weight="bold">
                    $443K
                  </Text>
                </Box>

                <Box>
                  <Flex gap="2" mb="2" align="center">
                    <Text size="2" color="gray">
                      CAC
                    </Text>
                    <Badge color="teal" radius="full">
                      <ArrowDownIcon
                        width="12"
                        height="12"
                        style={{ marginLeft: -2 }}
                      />
                      11.0%
                    </Badge>
                  </Flex>
                  <Text as="div" mb="2" size="8" weight="bold">
                    $146
                  </Text>
                </Box>

                <Box>
                  <Flex gap="2" mb="2" align="center">
                    <Text size="2" color="gray">
                      LTV
                    </Text>
                    <Badge color="teal" radius="full">
                      <ArrowUpIcon
                        width="12"
                        height="12"
                        style={{ marginLeft: -2 }}
                      />
                      3%
                    </Badge>
                  </Flex>
                  <Text as="div" mb="2" size="8" weight="bold">
                    $1,849
                  </Text>
                </Box>

                <Box>
                  <Flex gap="2" mb="2" align="center">
                    <Text size="2" color="gray">
                      Churn
                    </Text>
                    <Badge color="red" radius="full">
                      <ArrowUpIcon
                        width="12"
                        height="12"
                        style={{ marginLeft: -2 }}
                      />
                      1.1%
                    </Badge>
                  </Flex>
                  <Text as="div" mb="2" size="8" weight="bold">
                    12.4%
                  </Text>
                </Box>
              </Grid>
            </Card>

            <Card size="4">
              <Heading as="h3" size="6" trim="start" mb="2">
                Recent activity
              </Heading>

              <Flex position="absolute" top="0" right="0" m="3">
                <IconButton
                  
                  variant="ghost"
                  color="gray"
                  highContrast
                  style={{ margin: 0 }}
                >
                  <OpenInNewWindowIcon width="20" height="20" />
                </IconButton>

                <IconButton
                  
                  
                  color="gray"
                  highContrast
                  style={{ margin: 0 }}
                >
                  <DrawingPinIcon width="20" height="20" />
                </IconButton>
              </Flex>

              <Text as="p" size="2" mb="7" color="gray">
                Review what has happened over the past days.
              </Text>

              <Flex direction="column">
                <Flex direction="column" gap="3" mb="5">
                  <Flex justify="between" align="center">
                    <Flex gap="3" align="center">
                      <Avatar
                        size="3"
                        src=""
                        fallback="WB"
                      />
                      <Box>
                        <Text as="div" size="2" weight="bold">
                          Test User
                        </Text>
                        <Text as="div" size="2" color="gray">
                          Approved invoice{" "}
                          <Link
                            href="#"
                            
                            
                          >
                            #3461
                          </Link>
                        </Text>
                      </Box>
                    </Flex>

                    <Text size="2" color="gray">
                      June 21, 11:34 am
                    </Text>
                  </Flex>
                </Flex>

                <Box>
                  <Separator size="4" />
                </Box>

                <Flex direction="column" gap="3" my="5">
                  <Flex justify="between" align="center">
                    <Flex gap="3" align="center">
                      <Avatar
                        size="3"
                        src=""
                        fallback="WB"
                      />
                      <Box>
                        <Text as="div" size="2" weight="bold">
                          Test User
                        </Text>
                        <Text as="p" size="2" color="gray">
                          Purchased{" "}
                          <Link
                            href="#"
                            
                            
                          >
                            15 office chairs
                          </Link>{" "}
                          and{" "}
                          <Link
                            href="#"
                            
                            
                          >
                            2 drum sets
                          </Link>
                        </Text>
                      </Box>
                    </Flex>

                    <Text size="2" color="gray">
                      June 21, 9:43 am
                    </Text>
                  </Flex>
                </Flex>

                <Box>
                  <Separator size="4" />
                </Box>

                <Flex direction="column" gap="3" my="5">
                  <Flex justify="between" align="center">
                    <Flex gap="3" align="center">
                      <Avatar
                        size="3"
                        src=""
                        fallback="WB"
                      />
                      <Box>
                        <Text as="div" size="2" weight="bold">
                          Test User
                        </Text>
                        <Text as="p" size="2" color="gray">
                          Responded to your comment{" "}
                          <Link
                            href="#"
                            
                            
                          >
                            #7514
                          </Link>
                        </Text>
                      </Box>
                    </Flex>

                    <Text size="2" color="gray">
                      June 21, 9:41 am
                    </Text>
                  </Flex>
                </Flex>

                <Box>
                  <Separator size="4" />
                </Box>

                <Flex direction="column" gap="3" my="5">
                  <Flex justify="between" align="center">
                    <Flex gap="3" align="center">
                      <Avatar
                        size="3"
                        src=""
                        fallback="WB"
                      />
                      <Box>
                        <Text as="div" size="2" weight="bold">
                          Test User
                        </Text>
                        <Text as="p" size="2" color="gray">
                          Created{" "}
                          <Link
                            href="#"
                            
                            
                          >
                            4 invoices
                          </Link>
                        </Text>
                      </Box>
                    </Flex>

                    <Text size="2" color="gray">
                      June 20, 4:55 pm
                    </Text>
                  </Flex>
                </Flex>

                <Box>
                  <Separator size="4" />
                </Box>

                <Flex direction="column" gap="3" my="5">
                  <Flex justify="between" align="center">
                    <Flex gap="3" align="center">
                      <Avatar
                        size="3"
                        src=""
                        fallback="WB"
                      />
                      <Box>
                        <Text as="div" size="2" weight="bold">
                          Test User
                        </Text>
                        <Text as="p" size="2" color="gray">
                          Updated client details for{" "}
                          <Link
                            href="#"
                            
                            
                          >
                            Acme Co.
                          </Link>
                        </Text>
                      </Box>
                    </Flex>

                    <Text size="2" color="gray">
                      June 20, 3:30 pm
                    </Text>
                  </Flex>
                </Flex>

                <Box>
                  <Separator size="4" />
                </Box>

                <Flex direction="column" gap="3" my="5">
                  <Flex justify="between" align="center">
                    <Flex gap="3" align="center">
                      <Avatar
                        size="3"
                        src=""
                        fallback="WB"
                      />
                      <Box>
                        <Text as="div" size="2" weight="bold">
                          "Test User"
                        </Text>
                        <Text as="p" size="2" color="gray">
                          Created{" "}
                          <Link
                            href="#"
                            
                            
                          >
                            a new report
                          </Link>
                        </Text>
                      </Box>
                    </Flex>

                    <Text size="2" color="gray">
                      June 20, 3:22 pm
                    </Text>
                  </Flex>
                </Flex>

                <Box>
                  <Separator size="4" />
                </Box>

                <Flex direction="column" gap="3" my="5">
                  <Flex justify="between" align="center">
                    <Flex gap="3" align="center">
                      <Avatar
                        size="3"
                        src=""
                        fallback="WB"
                      />
                      <Box>
                        <Text as="div" size="2" weight="bold">
                          Test User
                        </Text>
                        <Text as="p" size="2" color="gray">
                          Deleted report{" "}
                          <Link
                            href="#"
                            
                            
                          >
                            #34
                          </Link>
                        </Text>
                      </Box>
                    </Flex>

                    <Text size="2" color="gray">
                      June 20, 1:00 pm
                    </Text>
                  </Flex>
                </Flex>

                <Box>
                  <Separator size="4" />
                </Box>

                <Flex direction="column" gap="3" mt="5">
                  <Flex justify="between" align="center">
                    <Flex gap="3" align="center">
                      <Avatar
                        size="3"
                        src=""
                        fallback="WB"
                      />
                      <Box>
                        <Text as="div" size="2" weight="bold">
                          Test User
                        </Text>
                        <Text as="p" size="2" color="gray">
                          Joined the team
                        </Text>
                      </Box>
                    </Flex>

                    <Text size="2" color="gray">
                      June 20, 12:47 pm
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
            </Card>

            <Card size="4">
              <Heading as="h3" size="6" trim="start" mb="2">
                To-do
              </Heading>

              <Flex gap="3" position="absolute" top="0" right="0" m="3">
                <IconButton
                  
                  variant="ghost"
                  color="gray"
                  highContrast
                >
                  <Share2Icon width="20" height="20" />
                </IconButton>
                <IconButton
                  
                  variant="ghost"
                  color="gray"
                  highContrast
                >
                  <PlusIcon width="20" height="20" />
                </IconButton>
              </Flex>

              <Text as="p" size="2" mb="5" color="gray">
                Stay on top of your daily tasks.
              </Text>

              {/* <ToDoList
                focusable={true}
                items={state.todo}
                onItemsChange={(items) => setState({ ...state, todo: items })}
              /> */}
            </Card>
          </Flex>
        </Flex>
      </Theme>
    </DashboardShell>
  )
}

// interface ToDoItem {
// 	id: string;
// 	completed: boolean;
// }

// interface ToDoList {
// 	focusable: boolean;
// 	items: ToDoItem[];
// 	onItemsChange: (items: ToDoItem[]) => void;
// }

// const ToDoList = ({ focusable, items, onItemsChange }: ToDoList) => {
//   const tabIndex = focusable ? undefined : -1;
// 	const itemsContent: Record<string, React.ReactElement> = {
// 		a: (
// 			<span>
// 				Respond to comment{" "}
// 				<Link
// 					href="#"
// 					underline="hover"
					
// 					
// 				>
// 					#384
// 				</Link>{" "}
// 				from Travis Ross
// 			</span>
// 		),
// 		b: (
// 			<span>
// 				Invite{" "}
// 				<Link
// 					href="#"
// 					underline="hover"
					
// 					
// 				>
// 					Acme Co.
// 				</Link>{" "}
// 				team to Slack
// 			</span>
// 		),
// 		c: (
// 			<span>
// 				Create a report{" "}
// 				<Link
// 					href="#"
// 					underline="hover"
					
// 					
// 				>
// 					requested
// 				</Link>{" "}
// 				by Danilo Sousa
// 			</span>
// 		),
// 		d: (
// 			<span>
// 				Review support request{" "}
// 				<Link
// 					href="#"
// 					underline="hover"
					
// 					
// 				>
// 					#85
// 				</Link>
// 			</span>
// 		),
// 		e: <span>Close Q2 finances</span>,
// 		f: (
// 			<span>
// 				Review invoice{" "}
// 				<Link
// 					href="#"
// 					underline="hover"
					
// 					
// 				>
// 					#3456
// 				</Link>
// 			</span>
// 		),
// 	};

// 	return (
// 		<Flex gap="2" direction="column">
// 			{items.map((item) => (
// 				<Text as="label" size="2" key={item.id}>
// 					<Flex as="span" gap="2">
// 						<Checkbox
							
// 							checked={item.completed}
// 							onCheckedChange={(checked) => {
// 								const newItems = items.slice();
// 								const newItem = newItems.find(
// 									(candidate) => candidate.id === item.id,
// 								)!;
// 								newItem.completed = !!checked;
// 								onItemsChange(newItems);
// 							}}
// 						/>
// 						<Text
// 							color={item.completed ? "gray" : undefined}
// 							style={
// 								{
// 									textDecoration: item.completed ? "line-through" : undefined,
// 									"--accent-12": "var(--accent-11)",
// 								} as React.CSSProperties
// 							}
// 						>
// 							{itemsContent[item.id]}
// 						</Text>
// 					</Flex>
// 				</Text>
// 			))}
// 		</Flex>
// 	);
// };
