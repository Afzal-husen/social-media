import Link from "next/link";
import React from "react";
import UserButton from "./user-button";
import SearchField from "./search-field";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-10 bg-card shadow-sm">
      <nav className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-5 px-5 py-3">
        <Link className="text-2xl font-bold text-primary" href={"/"}>
          {"Bugbook"}
        </Link>
        <SearchField />
        <UserButton className="sm:ms-auto" />
      </nav>
    </header>
  );
};

export default Navbar;
