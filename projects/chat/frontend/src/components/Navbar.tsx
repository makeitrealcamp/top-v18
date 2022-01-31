import logo from '../make-it-real-icon.jpg';

function Navbar() {
  return (
    <nav className="font-sans flex flex-col text-center content-center sm:flex-row sm:text-left sm:justify-between py-2 px-6 bg-white shadow sm:items-baseline w-full">
      <div className="container mx-auto">
        <div className="mb-2 sm:mb-0 flex flex-row">
          <div className="h-10 w-10 self-center mr-2">
            <img className="h-10 w-10 self-center" src={logo} alt="logo" />
          </div>
          <div className="flex flex-col">
            <a href="/home" className="text-2xl no-underline text-grey-darkest hover:text-blue-dark font-sans font-bold">MIRChat</a>
            <span className="text-xs text-grey-dark">Make It Real Chat</span>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
