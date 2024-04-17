import { Link } from "react-router-dom";
import Logo from "/logo.svg";

const Header = () => {
  return (
    <header>
      <nav className="w-100 bg-white">
        <div className="container-fluid hidden bg-black md:block">
          <div className="container m-auto p-3 text-center text-white">
            <ul className="list-none text-xs">
              <li className="inline-block">
                <a href="#" className="p-2 hover:underline">
                  Inspirations
                </a>
              </li>
              <li className="inline-block">
                <a href="#" className="p-2 hover:underline">
                  Planning Tools
                </a>
              </li>
              <li className="inline-block">
                <a href="#" className="p-2 hover:underline">
                  Track Your Online Order
                </a>
              </li>
              <li className="inline-block">
                <a href="#" className="p-2 hover:underline">
                  Store Information
                </a>
              </li>
              <li className="inline-block">
                <a href="#" className="p-2 hover:underline">
                  Interior Design Service
                </a>
              </li>
              <li className="inline-block">
                <a href="#" className="p-2 hover:underline">
                  Free layout design
                </a>
              </li>
              <li className="inline-block">
                <a href="#" className="p-2 hover:underline">
                  IKEA Family Rewards
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="container-fluid flex flex-col">
          <div className="container m-auto flex items-center justify-between py-2">
            <a href="#" className="absolute hidden lg:block">
              <span className="material-symbols-outlined -ms-12">menu</span>
            </a>
            <Link to={"/"} className="p-2">
              <img src={Logo} alt="IKEA Logo" className="h-16 w-20 md:w-24" />
            </Link>
            <div className="ml-12 mr-4 hidden flex-grow  rounded-full  bg-gray-100 focus-within:bg-white focus-within:ring-2 focus-within:ring-sky-700 md:block">
              <form id="search">
                <div className="relative py-2">
                  <div className="absolute inset-y-0 left-0 flex cursor-pointer items-center pl-6 pr-4">
                    <span className="material-symbols-outlined">search</span>
                  </div>
                  <input
                    type="text"
                    name="search"
                    id="search"
                    className="block h-11 w-full rounded-full border-0 bg-transparent py-2 pl-16 text-base text-gray-900 placeholder:text-gray-400  focus:outline-none"
                    placeholder="Search..."
                    autoComplete="off"
                  />
                </div>
              </form>
            </div>
            <div className="flex">
              <div className="ml-2 py-2 md:hidden">
                <a
                  href="#"
                  className="block h-10 w-10 text-center hover:rounded-full hover:bg-gray-100"
                >
                  <span className="material-symbols-outlined leading-10">
                    search
                  </span>
                </a>
              </div>
              <div className="ml-2 py-2">
                <Link
                  to={"/login"}
                  className="block h-10 w-10 text-center hover:rounded-full hover:bg-gray-100"
                >
                  <span className="material-symbols-outlined leading-10">
                    person
                  </span>
                </Link>
              </div>
              <div className="ml-2 py-2">
                <a
                  href="#"
                  className="block h-10 w-10 text-center hover:rounded-full hover:bg-gray-100"
                >
                  <span className="material-symbols-outlined leading-10">
                    favorite
                  </span>
                </a>
              </div>
              <div className="ml-2 py-2">
                <a
                  href="#"
                  className="block h-10 w-10 text-center hover:rounded-full hover:bg-gray-100"
                >
                  <span className="material-symbols-outlined leading-10">
                    shopping_basket
                  </span>
                </a>
              </div>
              <div className="ml-2 py-2 lg:hidden">
                <a
                  href="#"
                  className="block h-10 w-10 text-center hover:rounded-full hover:bg-gray-100"
                >
                  <span className="material-symbols-outlined leading-10">
                    menu
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <section>
        <div className="container m-auto flex-col">
          <div className="hidden md:block">
            <ul className="mr-auto flex text-sm font-bold">
              <li>
                <a href="#" className="mr-2 p-2">
                  Products
                </a>
              </li>
              <li>
                <a href="#" className="mr-2 p-2">
                  Rooms
                </a>
              </li>
              <li>
                <a href="#" className="mr-2 p-2">
                  Offers
                </a>
              </li>
              <li>
                <a href="#" className="p-2 uppercase text-red-600">
                  Sale
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </header>
  );
};

export default Header;
