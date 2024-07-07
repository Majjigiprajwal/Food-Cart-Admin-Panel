import React from 'react';
import { SiGmail } from "react-icons/si";
import { RiInboxArchiveLine } from "react-icons/ri";
import { SiMinutemailer } from "react-icons/si";
import { BsStar } from "react-icons/bs";
import { IoTrashBinSharp } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    navigate("/");
  };

  return (
    <div className="bg-gray-900 text-gray-300 w-64 h-screen py-6 px-4 flex flex-col fixed left-0 top-0 overflow-y-auto">
      <div className="flex items-center mb-8">
        <SiGmail className="text-4xl text-emerald-400 mr-2" />
        <p className="text-2xl font-bold text-white">ail Box</p>
      </div>
      <button className="bg-emerald-400 text-white rounded-md py-2 px-4 text-lg font-semibold transition duration-300 ease-in-out hover:bg-emerald-600 mb-8" onClick={()=>navigate('/compose-mail')}>
        + New Message
      </button>
      <nav className="flex-grow space-y-4">
        {[
          { to: "/inbox", icon: RiInboxArchiveLine, label: "Inbox" },
          { to: "/sentbox", icon: SiMinutemailer, label: "Sent" },
          { to: "/starred", icon: BsStar, label: "Starred" },
          { to: "/bin", icon: IoTrashBinSharp, label: "Bin" },
        ].map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => 
              `flex items-center py-2 px-4 rounded-md transition duration-300 ease-in-out ${
                isActive
                  ? 'bg-gray-800 text-emerald-400'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`
            }
          >
            <item.icon className="text-xl mr-3" />
            {item.label}
          </NavLink>
        ))}
      </nav>
      <button onClick={logout} className="flex items-center py-2 px-4 rounded-md text-gray-300 hover:bg-gray-800 hover:text-white transition duration-300 ease-in-out mt-auto">
        <FiLogOut className="text-xl mr-3" />
        Logout
      </button>
    </div>
  );
};

export default Sidebar;



