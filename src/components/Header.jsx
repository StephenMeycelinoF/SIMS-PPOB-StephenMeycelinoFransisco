import { NavLink } from "react-router-dom";
import { logo } from "../assets";

function Header() {
  return (
    <header className="w-full h-16 flex justify-between items-center mx-auto px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] border-b border-gray-200">
      {/* Logo */}
      <NavLink to="/dashboard" className="flex items-center gap-2 font-semibold">
        <img src={logo} alt="LOGO" className="h-10 w-auto" />
        <h3>SIMS PPOB</h3>
      </NavLink>

      {/* Menu */}
      <ul className="flex items-center gap-4 font-medium ">
        <li>
          <NavLink
            to="/topup"
            className={({ isActive }) =>
              isActive ? "text-red-500" : "hover:text-red-500"
            }
          >
            Top Up
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/transaction"
            className={({ isActive }) =>
              isActive ? "text-red-500" : "hover:text-red-500"
            }
          >
            Transaction
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/account"
            className={({ isActive }) =>
              isActive ? "text-red-500" : "hover:text-red-500"
            }
          >
            Akun
          </NavLink>
        </li>
      </ul>
    </header>
  );
}

export default Header;
