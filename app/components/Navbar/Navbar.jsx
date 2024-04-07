import React from "react";
import { Avatar } from "@nextui-org/react";

const Navbar = () => {
  return (
    <div className="border-b  py-4 w-full">
      <div className="flex flex-row items-center justify-between lg:w-2/3 lg:mx-auto bg-white text-black ">
        <h1 className="text-lg font-semibold"> Dashboard</h1>
        <Avatar
          src="https://i.pravatar.cc/150?u=a04258114e29026302d"
          size="sm"
        />
      </div>
    </div>
  );
};

export default Navbar;
