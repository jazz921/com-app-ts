import React, {FC} from "react";
import { Outlet, NavLink } from "react-router-dom";
import { ILinks } from "../interfaces";

type NavbarProps = {
  nav_links: ILinks[]
}

const Navbar: FC<NavbarProps> = ({ nav_links }) => {
  return (
    <>
      <nav className="navbar">
        {nav_links.map((link: ILinks) => (
          <NavLink to={link.url} key={link.url}>
            {link.name}
          </NavLink>
        ))}
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
