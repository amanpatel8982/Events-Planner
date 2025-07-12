import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import api from "../../config/api";
import { CiEdit } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [userdata, setUserData] = useState("");

  const fetchUserData = async () => {
    try {
      const res = await api.get("/user/profile");
      setUserData(res.data.data);
      toast.success(res.data.message);
    } catch (error) {
      toast.error(
        `Error : ${error.response?.status || error.message} | ${
          error.response?.data.message || ""
        }`
      );
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <>
     <div className=" flex  bg-gray-100 bg-gradient-to-r from-pink-600 to-purple-500 p-4 ">
        <h1 className="text-2xl font-bold">Profile</h1>
         <button
                  className="absolute top-45 right-1 bg-purple-500 border p-2 rounded-lg flex gap-2 justify-center items-center hover:bg-rose-400 text-lg mr-4 cursor-pointer text-white border-white"
                  onClick={() => navigate("/userDashboardEdit")}
                >
                  {" "}
                  <CiEdit />
                  Edit
                </button>
      </div>

      <div className=" p-5 flex">
        <div className="flex flex-col gap-5  border w-2/7  m-4 rounded-lg p-5">
          <div className="border relative left-13 w-50 h-50 rounded-full  overflow-hidden">
            <img
              src={userdata.photo}
              alt="profilePic"
              className="w-50 h-50 object-cover  rounded-full "
            />
          </div>
          <div>
            <b>Name :</b> <span>{userdata.fullName}</span>
          </div>
          <div>
            <b> Email:</b> <span>{userdata.email}</span>
          </div>
          <div>
            <b>Phone:</b> <span>{userdata.phone}</span>
          </div>
        </div>

        <div className="border m-4 p-5 w-5/7 grid gap-5 rounded-lg">
          <div>
            <b className="font-extrabold  text-2xl">Additional Information:</b>
            <hr />
          </div>
          <div>
            <b>Gender :</b> <span>{userdata.gender}</span>
          </div>
          <div>
            <b>Occuption:</b> <span>{userdata.occuption}</span>
          </div>
          <div>
            <b>Address:</b> <span>{userdata.address}</span>
          </div>
          <div>
            <b>City :</b> <span>{userdata.city}</span>
          </div>
          <div>
            <b>District:</b> <span>{userdata.district}</span>
          </div>
          <div>
            <b>State:</b> <span>{userdata.state}</span>
          </div>

          <div>
            <b>Representing:</b> <span>{userdata.representing}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;