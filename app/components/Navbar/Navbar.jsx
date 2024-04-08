
import React from "react";
import { Avatar } from "@nextui-org/react";
import Switch from "../DarkMode/Switch";

const Navbar = () => {
  return (
    <div className="sticky top-0 bg-opacity-50 backdrop-filter backdrop-blur-md z-50 border-b dark:border-zinc-700 px-4 lg:px-0 py-4 w-full">
      <div className="flex flex-row items-center justify-between lg:w-2/3 lg:mx-auto">
        <h1 className="text-lg font-semibold"> Dashboard</h1>
        <div className="flex flex-row items-center gap-4">
          <Switch />
        </div>
      </div>
    </div>
  );
};

export default Navbar;