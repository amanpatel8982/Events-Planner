// components/AddHallModal.jsx
import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import api from "../../../config/api";
import toast from "react-hot-toast";

export default function AddBanquetHallModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    hallName: "",
    managerName: "",
    contactNumber: "",
    capacity: "",
    rent: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await api.post("/hall/add", formData);
    toast.success(res.data.message);

    setFormData({
      hallName: "",
      managerName: "",
      contactNumber: "",
      capacity: "",
      rent: "",
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-xl p-6 shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
        >
          <AiOutlineClose size={24} />
        </button>
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Add New Banquet Hall
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium">Hall Name</label>
            <input
              type="text"
              name="hallName"
              value={formData.hallName}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>
          <div>
            <label className="block font-medium">Manager Name</label>
            <input
              type="text"
              name="managerName"
              value={formData.managerName}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>
          <div>
            <label className="block font-medium">Contact Number</label>
            <input
              type="tel"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>
          <div>
            <label className="block font-medium">Capacity</label>
            <input
              type="number"
              name="capacity"
              value={formData.capacity}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>
          <div>
            <label className="block font-medium">Rent</label>
            <input
              type="number"
              name="rent"
              value={formData.rent}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 p-2 rounded"
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
