export const AuthPageContainer = ({ children }) => (
  <div className="fixed z-20 left-0 top-0 right-0 w-full  overflow-x-hidden overflow-y-auto  h-full bg-white">
    <div className="flex justify-between w-full h-full">
      <div className="hidden md:flex  flex-col bg-[#E3F2DA] w-1/2 gap-4 p-4 ">
        <div className="flex flex-col gap-6 lg:flex-row w-full justify-between h-12">
          <div className="flex gap-x-4">
            <a
              className="flex justify-center items-center px-1 cursor-pointer"
              href="https://astar.network/solutions"
              target="_blank"
              rel="noreferrer"
            >
              <img src="./assets/GFIN.svg" alt="logo" />
            </a>

            <a
              className="flex justify-center items-center px-1 cursor-pointer"
              href="https://astar.network/solutions"
              target="_blank"
              rel="noreferrer"
            >
              <img src="./assets/AstrLogo.svg" alt="logo" />
            </a>
          </div>
          <a
            className="flex flex-col w-32 lg:w-auto cursor-pointer"
            href="https://www.insg.ai"
            target="_blank"
            rel="noreferrer"
          >
            <img src="./assets/AILogo.svg" alt="logo" />
          </a>
        </div>
        <div className="flex  w-full h-full p-20">
          <img src="./assets/login_sideImage.png" alt="logo" />
        </div>
      </div>
      <div className="flex justify-center items-center w-full md:w-1/2 h-full">
        <div className="w-[70%] ">{children}</div>
      </div>
    </div>
  </div>
)
