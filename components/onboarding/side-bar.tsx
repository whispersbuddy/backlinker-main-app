import { RoughNotation } from "react-rough-notation"

type NavProps = {
  currentStepIndex: number
  goTo: (index: number) => void
}

const SideBar = ({ currentStepIndex, goTo }: NavProps) => {
  return (
    <div className="absolute -top-20 left-0 w-full md:w-[25%] md:relative md:top-0 md:left-0">
      <nav className="h-full py-5 bg-blue-900 border border-blue-700 rounded-md text-slate-200 md:p-5">
        <ul className="flex justify-center gap-2 md:flex-col">
          <li className="flex flex-col items-start font-medium">
            <span className="hidden text-sm uppercase text-neutral-500 md:flex">
              step 1
            </span>
            <button
              tabIndex={0}
              onClick={() => goTo(0)}
              className={`text-sm ${
                currentStepIndex === 0 ? "text-[#ffe666]" : "text-white"
              } md:text-base`}
            >
              <RoughNotation
                type="underline"
                show={currentStepIndex === 0}
                color="#ffe666"
              >
                Your Info
              </RoughNotation>
            </button>
          </li>
          <li className="flex flex-col items-start font-medium">
            <span className="hidden text-sm uppercase text-neutral-500 md:flex">
              step 2
            </span>
            <button
              tabIndex={0}
              onClick={() => goTo(1)}
              className={`text-sm ${
                currentStepIndex === 1 ? "text-[#ffe666]" : "text-white"
              } md:text-base`}
            >
              <RoughNotation
                type="underline"
                show={currentStepIndex === 1}
                color="#ffe666"
              >
                Connectively
              </RoughNotation>
            </button>
          </li>
          <li className="flex flex-col items-start font-medium">
            <span className="hidden text-sm uppercase text-neutral-500 md:flex">
              step 3
            </span>
            <button
              tabIndex={0}
              onClick={() => goTo(2)}
              className={`text-sm ${
                currentStepIndex === 2 ? "text-[#ffe666]" : "text-white"
              } md:text-base`}
            >
              <RoughNotation
                type="underline"
                show={currentStepIndex === 2}
                color="#ffe666"
              >
                Your Plan
              </RoughNotation>
            </button>
          </li>
          <li className="flex flex-col items-start font-medium">
            <span className="hidden text-sm uppercase text-neutral-500 md:flex">
              step 4
            </span>
            <button
              tabIndex={0}
              onClick={() => goTo(3)}
              className={`text-sm ${
                currentStepIndex === 3 ? "text-[#ffe666]" : "text-white"
              } md:text-base`}
            >
              <RoughNotation
                type="underline"
                show={currentStepIndex === 3}
                color="#ffe666"
              >
                Summary
              </RoughNotation>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default SideBar
