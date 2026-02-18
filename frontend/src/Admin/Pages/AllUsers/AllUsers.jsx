import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import deleteicon from "./Assets/DeleteIcon.png";
import Blockicon from "./Assets/BlockIcon.png";
import image1 from "./Assets/pic1.png";
import image2 from "./Assets/pic2.png";
import image3 from "./Assets/pic3.png";
import image4 from "./Assets/pic4.png";
import image5 from "./Assets/pic5.png";
import image6 from "./Assets/pic6.png";
import image7 from "./Assets/pic7.png";
import image8 from "./Assets/pic8.png";
import viewimg from "./Assets/viewimg.png";
import ActiveImg from "./Assets/ActiveImg.png";
import BlockUserModal from "./Modals/BlockUserModal";
import UnBlockUserModal from "./Modals/UnBlockUserModal";
// import DeleteUserModal from "./Modals/DeleteUserModal";
import { IoSearch } from "react-icons/io5";
import { Link } from "react-router-dom";
import DetailUsersModal from "./Modals/DetailUsersModal";
// import DeleteUsersModal from "./Modal/DeleteUsersModal";

const timeRanges = ["All Users", "Active Users", "Blocked Users"];

function AllUsers() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedRange, setSelectedRange] = useState("All Users");

  const [detailUsersModal, setDetailUsersModal] = useState(false);
  const [deleteUsersModal, setDeleteUsersModal] = useState(false);
  const [blockUsersModal, setBlockUsersModal] = useState(false);
  const [unBlockUsersModal, setUnBlockUsersModal] = useState(false);

  const [selectedUserIndex, setSelectedUserIndex] = useState(null);

  const dropdownRef = useRef(null);

  const [users, setUsers] = useState([
    {
      name: "Esther Howard",
      email: "deanna.curtis@example.com",
      phoneNumber: "(406) 555-0120",
      Address: "2972 Westheimer Rd. Santa Ana, Illinois 85486... ",
      status: "Active",
      image: image1,
      image2: ActiveImg,
    },
    {
      name: "Jerome Bell",
      email: "curtis.weaver@example.com",
      phoneNumber: "(603) 555-0123",
      Address: "4140 Parker Rd. Allentown, New Mexico 31134...",
      status: "Blocked",
      image: image2,
      image2: Blockicon,
    },
    {
      name: "Darlene Robertson",
      email: "michelle.rivera@example.com",
      phoneNumber: "(603) 555-0123",
      Address: "2972 Westheimer Rd. Santa Ana, Illinois 85486... ",
      status: "Active",
      image: image3,
      image2: ActiveImg,
    },
    {
      name: "Courtney Henry",
      email: "sara.cruz@example.com",
      phoneNumber: "(704) 555-0127",
      Address: "4140 Parker Rd. Allentown, New Mexico 31134... ",
      status: "Active",
      image: image4,
      image2: ActiveImg,
    },
    {
      name: "Cameron Williamson",
      email: "bill.sanders@example.com",
      phoneNumber: "(316) 555-0116",
      Address: "2972 Westheimer Rd. Santa Ana, Illinois 85486... ",
      status: "Blocked",
      image: image5,
      image2: Blockicon,
    },
    {
      name: "Cody Fisher",
      email: "curtis.weaver@example.com",
      phoneNumber: "(603) 555-0123",
      Address: "4140 Parker Rd. Allentown, New Mexico 31134...",
      status: "Blocked",
      image: image6,
      image2: Blockicon,
    },
    {
      name: "Floyd Miles",
      email: "sara.cruz@example.com",
      phoneNumber: "(603) 555-0123",
      Address: "2972 Westheimer Rd. Santa Ana, Illinois 85486... ",
      status: "Blocked",
      image: image7,
      image2: Blockicon,
    },
    {
      name: "Cody Fisher",
      email: "curtis.weaver@example.com",
      phoneNumber: "(603) 555-0123",
      Address: "6391 Elgin St. Celina, Delaware 10299... ",
      status: "Blocked",
      image: image8,
      image2: Blockicon,
    },
  ]);

  const handleSelect = (range) => {
    setSelectedRange(range);
    setDropdownOpen(false);
  };

  const openModal = () => setDetailUsersModal(true);
  const closeModal = () => setDetailUsersModal(false);
  // const openDeleteModal = () => setDeleteUsersModal(true);
  // const closeDeleteModal = () => setDeleteUsersModal(false);

  const openBlockModal = (index) => {
    setSelectedUserIndex(index);
    setBlockUsersModal(true);
  };
  const closeBlockModal = () => setBlockUsersModal(false);

  const openUnBlockModal = (index) => {
    setSelectedUserIndex(index);
    setUnBlockUsersModal(true);
  };
  const closeUnBlockModal = () => setUnBlockUsersModal(false);

  const handleBlockUser = () => {
    const updatedUsers = [...users];
    updatedUsers[selectedUserIndex].status = "Blocked";
    setUsers(updatedUsers);
    closeBlockModal();
  };

  const handleUnblockUser = () => {
    const updatedUsers = [...users];
    updatedUsers[selectedUserIndex].status = "Active";
    setUsers(updatedUsers);
    closeUnBlockModal();
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredData = users.filter((user) => {
    if (selectedRange === "All Users") return true;
    return user.status === selectedRange.replace(" Users", "");
  });

  return (
    <div className="min-h-screen">
      <DetailUsersModal openModal={detailUsersModal} onClose={closeModal} />

      <BlockUserModal
        isOpen={blockUsersModal}
        onClose={closeBlockModal}
        onConfirm={handleBlockUser}
      />
      <UnBlockUserModal
        isOpen={unBlockUsersModal}
        onClose={closeUnBlockModal}
        onConfirm={handleUnblockUser}
      />

      {/* <DeleteUserModal isOpen={deleteUsersModal} onClose={closeDeleteModal} /> */}

      <div className="lg:ml-[280px] px-4 lg:px-6 py-3 lg:py-5 ">
        <style>{`::-webkit-scrollbar { display: none; }`}</style>

        {/* Header Controls */}
        <div className="w-full flex flex-col md:flex-row gap-3 justify-between items-center">
          {/* Dropdown (Right, 30%) */}
          <div ref={dropdownRef} className="relative w-full md:w-[30%]">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-full flex justify-between items-center cursor-pointer px-4 shadow-sm py-2.5 border border-[#E4E4E4] bg-white rounded-[6px]  font-medium text-[#311820]"
            >
              {selectedRange}
              {dropdownOpen ? (
                <ChevronUp size={18} />
              ) : (
                <ChevronDown size={18} />
              )}
            </button>

            {dropdownOpen && (
              <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-[6px] shadow-lg">
                {timeRanges.map((range) => (
                  <div
                    key={range}
                    onClick={() => handleSelect(range)}
                    className={`px-4 py-3  cursor-pointer hover:bg-gray-100 ${
                      range === selectedRange ? "bg-gray-100 font-medium" : ""
                    }`}
                  >
                    {range}
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* Search (Left, 30%) */}
          <div className="w-full md:w-[30%]">
            <div className="flex items-center gap-2">
              <input
                type="text"
                className="bg-white text-black border outline-none shadow-sm border-[#E6E6E8] h-[46px] w-full rounded-[6px] px-2 "
                placeholder="Search for a user..."
              />
              <div className="bg-orange-500 py-2.5 px-3 rounded-[6px]">
                {/* Search Icon inside input */}
                <IoSearch className=" text-2xl text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="mt-5 w-full overflow-x-auto">
          <table className="w-full min-w-[1000px] text-center border-collapse">
            <thead className="text-[16px]">
              <tr className="text-[#8b8e9c] ">
                <th className=" w-[25%]">
                  <p className="py-2 mb-2 bg-[#ffffff] text-[#78797A] px-4 font-[500] border border-b-2 border-t-0 border-r-2 border-l-0 border-[#e6e6e8]">
                    Name
                  </p>
                </th>
                <th className=" w-[18%px]">
                  <p className="py-2 mb-2 bg-[#ffffff] text-[#78797A]  font-[500] border border-b-2 border-t-0 border-r-2 border-l-0 border-[#E6E6E8]">
                    Email Address
                  </p>
                </th>
                <th className=" w-[15%]">
                  <p className="py-2 mb-2 bg-[#ffffff] text-[#78797A]  font-[500] border border-b-2 border-t-0 border-r-2 border-l-0 border-[#E6E6E8]">
                    Phone Number
                  </p>
                </th>

                <th className=" w-[24%]">
                  <p className="py-2 mb-2 bg-[#ffffff] text-[#78797A]  px-4 font-[500] border border-b-2 border-t-0  border-r-2 border-l-0 border-[#E6E6E8]">
                    Address
                  </p>
                </th>
                <th className=" w-[10%]">
                  <p className="py-2 mb-2 bg-[#ffffff] text-[#78797A]  font-[500] border border-b-2 border-t-0 border-r-2 border-l-0 border-[#E6E6E8]">
                    Status
                  </p>
                </th>
                <th className=" w-[10%]">
                  <p className="py-2 mb-2 bg-[#ffffff] text-[#78797A]  font-[500] border border-b-2 border-t-0 border-r-2 border-l-0 border-[#E6E6E8]">
                    Action
                  </p>
                </th>
              </tr>
            </thead>

            <tbody className="text-[16px] font-medium">
              {filteredData.map((user, index) => (
                <tr key={index}>
                  {/* User */}
                  <td className="px-4 py-3 border-l-0 border-t-0 border-2 bg-[#ffffff]  border-[#E6E6E8]">
                    <div className="flex items-center gap-2">
                      <img
                        src={user.image}
                        className="h-10 w-10 object-cover rounded-full"
                        alt="user"
                      />
                      <span className="text-[#030712] text-nowrap ">
                        {user.name}
                      </span>
                    </div>
                  </td>
                  {/* Email */}
                  <td className="px-4 py-3 text-[#030712]  bg-[#ffffff]  border-t-0 border-2 border-[#E6E6E8]">
                    {user.email}
                  </td>

                  {/* Phone Number */}
                  <td className="px-4 py-3 text-[#030712] text-nowrap bg-[#ffffff] border-t-0 border-2 border-[#E6E6E8]">
                    {user.phoneNumber}
                  </td>

                  {/* ADDRESS no */}
                  <td className=" py-3 px-3 text-center text-[#030712] text-[15px] border-t-0 bg-[#ffffff] border-2 border-[#E6E6E8]">
                    {user.Address}
                  </td>

                  {/* Status */}
                  <td className="px-4 py-3 bg-[#ffffff] border-2 border-t-0 border-[#E6E6E8]">
                    <button
                      onClick={() =>
                        user.status === "Active"
                          ? openBlockModal(index)
                          : openUnBlockModal(index)
                      }
                      className={`w-[100px] cursor-pointer py-2 rounded-full ${
                        user.status === "Active"
                          ? "bg-[#34C75924] text-[#34A853]"
                          : "bg-[#FAE3E3] text-[#E93F33]"
                      }`}
                    >
                      {user.status}
                    </button>
                  </td>

                  {/* Action */}
                  <td className="px-3 py-3 border-2 bg-[#ffffff] border-t-0 border-[#E6E6E8]">
                    <div className="flex justify-center gap-2 items-center">
                      {/* <div>
                       <img
                        onClick={openDeleteModal}
                        src={deleteicon}
                        className="w-10 cursor-pointer"
                        alt="Delete"
                      />
                     </div> */}

                      <div>
                        <img
                          src={viewimg}
                          alt="view"
                          className="w-10 cursor-pointer"
                          onClick={openModal}
                        />
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AllUsers;
