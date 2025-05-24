// 



import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

export default function Header() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="shadow sticky top-0 z-50">
      <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link to="/" className="flex items-center" aria-label="Go to homepage">
          <img
                src="data:image/png;base64,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"
                height="1000px"
                width="100px"
                
                className="mr-3 h-16"
                alt="Logo"
              />
         
          </Link>
          {/* Desktop Menu */}
          <div className="flex items-center lg:order-2">
            <NavLink
              to="/login"
              className="text-gray-800 hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none"
            >
              Log in
            </NavLink>
            <NavLink
              to="/signup"
              className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 focus:outline-none"
            >
              Sign Up
            </NavLink>
          </div>

          {/* Hamburger Icon for Mobile */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-800 hover:bg-gray-50 p-2 rounded-md focus:outline-none"
            >
              <span className="material-icons">menu</span>
            </button>
          </div>

          {/* Mobile Menu */}
          <div
            className={`lg:hidden ${isMobileMenuOpen ? "block" : "hidden"} absolute top-16 left-0 w-full bg-white shadow-md`}
          >
            <ul className="flex flex-col items-center py-4 space-y-4 font-medium">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `block py-2 px-4 duration-200 ${
                      isActive ? "text-orange-700" : "text-gray-700"
                    }`
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    `block py-2 px-4 duration-200 ${
                      isActive ? "text-orange-700" : "text-gray-700"
                    }`
                  }
                >
                  About
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Desktop Menu Items */}
          <div
            className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
            id="mobile-menu-2"
          >
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 ${
                      isActive ? "text-orange-700" : "text-gray-700"
                    } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    `block py-2 pr-4 pl-3 duration-200 ${
                      isActive ? "text-orange-700" : "text-gray-700"
                    } border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                  }
                >
                  About
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
