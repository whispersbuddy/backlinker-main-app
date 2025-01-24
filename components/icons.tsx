import {
  AlertTriangle,
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  CreditCard,
  Eye,
  EyeOff,
  File,
  FileText,
  HelpCircle,
  Image,
  Laptop,
  Link,
  Loader2,
  LucideProps,
  Menu,
  Moon,
  MoreVertical,
  Pizza,
  Plus,
  Settings,
  SunMedium,
  Trash,
  Twitter,
  User,
  X,
  type Icon as LucideIcon,
} from "lucide-react"

export type Icon = LucideIcon

export const Icons = {
  logo: Link,
  close: X,
  spinner: Loader2,
  chevronLeft: ChevronLeft,
  chevronsLeft: ChevronsLeft,
  chevronRight: ChevronRight,
  chevronsRight: ChevronsRight,
  trash: Trash,
  post: FileText,
  page: File,
  media: Image,
  settings: Settings,
  billing: CreditCard,
  ellipsis: MoreVertical,
  add: Plus,
  warning: AlertTriangle,
  user: User,
  arrowRight: ArrowRight,
  help: HelpCircle,
  pizza: Pizza,
  sun: SunMedium,
  menu: Menu,
  moon: Moon,
  laptop: Laptop,
  eye: Eye,
  eyeOff: EyeOff,
  google: ({ ...props }: LucideProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="100"
      height="100"
      viewBox="0 0 50 50"
      {...props}
    >
      <path d="M 26 2 C 13.308594 2 3 12.308594 3 25 C 3 37.691406 13.308594 48 26 48 C 35.917969 48 41.972656 43.4375 45.125 37.78125 C 48.277344 32.125 48.675781 25.480469 47.71875 20.9375 L 47.53125 20.15625 L 46.75 20.15625 L 26 20.125 L 25 20.125 L 25 30.53125 L 36.4375 30.53125 C 34.710938 34.53125 31.195313 37.28125 26 37.28125 C 19.210938 37.28125 13.71875 31.789063 13.71875 25 C 13.71875 18.210938 19.210938 12.71875 26 12.71875 C 29.050781 12.71875 31.820313 13.847656 33.96875 15.6875 L 34.6875 16.28125 L 41.53125 9.4375 L 42.25 8.6875 L 41.5 8 C 37.414063 4.277344 31.960938 2 26 2 Z M 26 4 C 31.074219 4 35.652344 5.855469 39.28125 8.84375 L 34.46875 13.65625 C 32.089844 11.878906 29.199219 10.71875 26 10.71875 C 18.128906 10.71875 11.71875 17.128906 11.71875 25 C 11.71875 32.871094 18.128906 39.28125 26 39.28125 C 32.550781 39.28125 37.261719 35.265625 38.9375 29.8125 L 39.34375 28.53125 L 27 28.53125 L 27 22.125 L 45.84375 22.15625 C 46.507813 26.191406 46.066406 31.984375 43.375 36.8125 C 40.515625 41.9375 35.320313 46 26 46 C 14.386719 46 5 36.609375 5 25 C 5 13.390625 14.386719 4 26 4 Z"></path>
    </svg>
  ),
  stripe: ({ ...props }: LucideProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" {...props}>
      <circle
        cx="200"
        cy="200"
        r="200"
        fillRule="evenodd"
        clipRule="evenodd"
        className="bg-[#635bff]"
      />
      <path
        d="M184.4 155.5c0-9.4 7.7-13.1 20.5-13.1 18.4 0 41.6 5.6 60 15.5v-56.8C244.8 93.1 225 90 205 90c-49.1 0-81.7 25.6-81.7 68.4 0 66.7 91.9 56.1 91.9 84.9 0 11.1-9.7 14.7-23.2 14.7-20.1 0-45.7-8.2-66-19.3v57.5c22.5 9.7 45.2 13.8 66 13.8 50.3 0 84.9-24.9 84.9-68.2-.4-72-92.5-59.2-92.5-86.3z"
        className="bg-white"
      />
    </svg>
  ),
  twitter: Twitter,
  check: Check,
  link: Link,
}
