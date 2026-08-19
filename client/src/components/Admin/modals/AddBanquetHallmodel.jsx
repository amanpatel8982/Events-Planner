import { useEffect, useState } from "react";
import { Building2, Save, X } from "lucide-react";
import toast from "react-hot-toast";
import api from "../../../config/api";

const initialForm = {
  hallName: "",
  managerName: "",
  contactNumber: "",
  capacity: "",
  rent: "",
};

const AddBanquetHall = ({ isOpen, onClose, onCreated }) => {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await api.post("/hall/add", form);
      toast.success(response.data?.message || "Venue added.");
      setForm(initialForm);
      onClose();
      await onCreated?.();
    } catch (error) {
      toast.error(error.response?.data?.message || "The venue could not be added.");
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    { name: "hallName", label: "Venue name", type: "text", placeholder: "The Grand Pavilion" },
    { name: "managerName", label: "Manager name", type: "text", placeholder: "Primary venue contact" },
    { name: "contactNumber", label: "Contact number", type: "tel", placeholder: "+91 98765 43210" },
    { name: "capacity", label: "Guest capacity", type: "number", placeholder: "350" },
    { name: "rent", label: "Venue rent (₹)", type: "number", placeholder: "250000" },
  ];

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/55 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className="w-full max-w-xl overflow-hidden rounded-lg bg-white shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-venue-title"
      >
        <header className="flex items-center justify-between border-b border-[var(--line)] px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-[#edf2ee] text-[var(--sage)]">
              <Building2 size={20} />
            </span>
            <div>
              <h2 id="add-venue-title" className="font-serif text-xl">Add a venue</h2>
              <p className="text-xs text-[var(--muted)]">Core sourcing details</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid h-9 w-9 place-items-center rounded-lg hover:bg-black/5"
            aria-label="Close venue form"
          >
            <X size={20} />
          </button>
        </header>

        <form onSubmit={handleSubmit} className="grid max-h-[75vh] gap-4 overflow-y-auto p-5 sm:grid-cols-2 sm:p-6">
          {fields.map((field, index) => (
            <div key={field.name} className={index < 3 ? "sm:col-span-2" : ""}>
              <label htmlFor={`venue-${field.name}`} className="field-label">{field.label}</label>
              <input
                id={`venue-${field.name}`}
                name={field.name}
                type={field.type}
                value={form[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                className="field-control"
                min={field.type === "number" ? "0" : undefined}
                required
              />
            </div>
          ))}
          <div className="mt-2 flex flex-col-reverse gap-2 border-t border-[var(--line)] pt-5 sm:col-span-2 sm:flex-row sm:justify-end">
            <button type="button" onClick={onClose} className="button-secondary">Cancel</button>
            <button
              type="submit"
              disabled={loading}
              className="button-primary disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Save size={17} /> {loading ? "Saving..." : "Save venue"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBanquetHall;
