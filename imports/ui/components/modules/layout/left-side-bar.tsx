import React, { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import Notification, { useNotification } from "../notification/notification";
import { IUserProfile } from "../../../../type/general";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const LeftSideBar = () => {
  const user = Meteor.user();
  const userProfile = user?.profile as IUserProfile;

  const { unreadCount } = useNotification();

  

  return (
    <div className="w-[4.5rem] border-r-[1px] h-full border-solid border-[#D9DCE0]">
      <ul className="flex justify-between h-full items-center py-2 flex-col">
        <ul className="flex justify-between items-center flex-col">
          <Menu as="div" className="relative">
            <Menu.Button className="">
              <li className="w-[3rem] h-[3rem] flex justify-center items-center cursor-pointer hover:bg-[#f5f5f5] rounded-lg">
                <svg
                  width="30px"
                  height="30px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22 5C22 6.65685 20.6569 8 19 8C17.3431 8 16 6.65685 16 5C16 3.34315 17.3431 2 19 2C20.6569 2 22 3.34315 22 5Z"
                    fill={unreadCount > 0 ? "#009aff": 'grey'}
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M6.25 14C6.25 13.5858 6.58579 13.25 7 13.25H16C16.4142 13.25 16.75 13.5858 16.75 14C16.75 14.4142 16.4142 14.75 16 14.75H7C6.58579 14.75 6.25 14.4142 6.25 14Z"
                    fill="#1C274C"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3.46447 20.5355C4.92893 22 7.28595 22 12 22C16.714 22 19.0711 22 20.5355 20.5355C22 19.0711 22 16.714 22 12C22 10.6012 22 9.40999 21.9617 8.38802C21.1703 9.08042 20.1342 9.5 19 9.5C16.5147 9.5 14.5 7.48528 14.5 5C14.5 3.86584 14.9196 2.82967 15.612 2.03826C14.59 2 13.3988 2 12 2C7.28595 2 4.92893 2 3.46447 3.46447C2 4.92893 2 7.28595 2 12C2 16.714 2 19.0711 3.46447 20.5355ZM6.25 17.5C6.25 17.0858 6.58579 16.75 7 16.75H13C13.4142 16.75 13.75 17.0858 13.75 17.5C13.75 17.9142 13.4142 18.25 13 18.25H7C6.58579 18.25 6.25 17.9142 6.25 17.5Z"
                    fill="#1C274C"
                  />
                </svg>
              </li>
            </Menu.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute overflow-y-auto left-[4.5rem] top-0 z-10 mt-2 w-[20rem] h-[30rem] origin-bottom-left rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <Notification />
              </Menu.Items>
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
