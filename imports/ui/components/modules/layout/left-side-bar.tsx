import React, { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { IUserProfile } from "../../../../type/general";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const LeftSideBar = () => {
  const user = Meteor.user();
  const userProfile = user?.profile as IUserProfile;


  return (
    <div className="w-[4.5rem] border-r-[1px] h-full border-solid border-[#D9DCE0]">
      <ul className="flex justify-between h-full items-center py-2 flex-col">
        <ul className="flex justify-between items-center flex-col">
          <Menu as="div" className="relative">

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute overflow-y-auto left-[4.5rem] top-0 z-10 mt-2 w-[20rem] h-[30rem] origin-bottom-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"></Menu.Items>
            </Transition>
          </Menu>
        </ul>
        <li>
          <Menu as="div" className="relative">
            <div>
              <Menu.Button className="">
                <img
                  className="w-[2.5rem] h-[2.5rem] object-cover cursor-pointer rounded-full"
                  src={userProfile?.image}
                ></img>
              </Menu.Button>
            </div>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute left-[4.5rem] bottom-4 z-10 mt-2 w-56 origin-bottom-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => {
                          Meteor.logout();
                        }}
                        type="submit"
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block w-full px-4 py-2 text-left text-sm"
                        )}
                      >
                        Sign out
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </li>
      </ul>
    </div>
  );
};

export default LeftSideBar;
