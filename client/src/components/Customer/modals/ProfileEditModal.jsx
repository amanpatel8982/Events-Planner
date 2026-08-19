import { Camera, LoaderCircle, Save, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import api from "../../../config/api";
import { useAuth } from "../../../context/AuthContext";

const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

const emptyProfile = {
  fullName: "",
  email: "",
  phone: "",
  photo: "",
  gender: "N/A",
  occupation: "",
  address: "",
  city: "",
  state: "N/A",
  district: "",
  representing: "N/A",
};

const normalizeGender = (value) => {
  if (!value || value === "N/A") return "N/A";
  const normalized = String(value).toLowerCase();
  return ["male", "female", "other"].includes(normalized)
    ? normalized
    : "N/A";
};

const normalizeProfile = (profile) => ({
  ...emptyProfile,
  ...profile,
  fullName: profile?.fullName || "",
  email: profile?.email || "",
  phone: profile?.phone || "",
  photo: profile?.photo || "",
  gender: normalizeGender(profile?.gender),
  occupation: profile?.occupation?.trim() || "",
  address: profile?.address === "N/A" ? "" : profile?.address || "",
  city: profile?.city === "N/A" ? "" : profile?.city || "",
  state: profile?.state || "N/A",
  district: profile?.district === "N/A" ? "" : profile?.district || "",
  representing: profile?.representing || "N/A",
});

const ProfileEditModal = ({ isOpen, onClose, oldData }) => {
  const { setUser } = useAuth();
  const [formData, setFormData] = useState(emptyProfile);
  const [picture, setPicture] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;
    setFormData(normalizeProfile(oldData));
    setPicture(null);
    setPreviewUrl("");
  }, [isOpen, oldData]);

  useEffect(
    () => () => {
      if (previewUrl.startsWith("blob:")) URL.revokeObjectURL(previewUrl);
    },
    [previewUrl],
  );

  useEffect(() => {
    if (!isOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape" && !loading) onClose();
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, loading, onClose]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please choose a valid image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Profile images must be smaller than 5 MB");
      return;
    }

    setPicture(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleEditProfile = async (event) => {
    event.preventDefault();

    if (!formData.fullName.trim() || !formData.phone.trim()) {
      toast.error("Name and phone number are required");
      return;
    }

    setLoading(true);
    const payload = new FormData();

    payload.append("fullName", formData.fullName.trim());
    payload.append("phone", formData.phone.trim());
    payload.append("gender", formData.gender);
    payload.append("occupation", formData.occupation.trim() || "N/A");
    payload.append("address", formData.address.trim() || "N/A");
    payload.append("city", formData.city.trim() || "N/A");
    payload.append("state", formData.state || "N/A");
    payload.append("district", formData.district.trim() || "N/A");
    payload.append("representing", formData.representing || "N/A");
    if (picture) payload.append("picture", picture);

    try {
      const response = await api.put("/user/update", payload);
      const updatedUser = response.data.data;

      toast.success(response.data?.message || "Profile updated");
      setUser(updatedUser);
      sessionStorage.setItem("EventUser", JSON.stringify(updatedUser));
      onClose();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Unable to update your profile",
      );
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/65 p-3 sm:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !loading) onClose();
      }}
    >
      <section
        className="max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-lg bg-white shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-profile-title"
      >
        <header className="sticky top-0 z-10 flex items-start justify-between gap-5 border-b border-[var(--line)] bg-white p-5 sm:p-6">
          <div>
            <p className="text-sm font-semibold text-[var(--rose)]">
              Account details
            </p>
            <h2
              id="edit-profile-title"
              className="mt-1 text-2xl font-semibold text-[var(--ink)]"
            >
              Edit profile
            </h2>
            <p className="mt-1 text-sm text-[var(--muted)]">
              Keep the information used for planning conversations current.
            </p>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            disabled={loading}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-[var(--line)] text-[var(--ink)] hover:bg-[var(--paper)] disabled:opacity-50"
            aria-label="Close profile editor"
            title="Close"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </header>

        <form onSubmit={handleEditProfile} className="p-5 sm:p-6">
          <div className="flex flex-col gap-5 border-b border-[var(--line)] pb-6 sm:flex-row sm:items-center">
            <div className="relative flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[var(--paper)] text-2xl font-semibold text-[var(--muted)]">
              <UserPlaceholder name={formData.fullName} />
              {(previewUrl || formData.photo) && (
                <img
                  src={previewUrl || formData.photo}
                  alt="Profile preview"
                  className="absolute inset-0 h-full w-full object-cover"
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                  }}
                />
              )}
            </div>
            <div>
              <label
                htmlFor="profile-picture"
                className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-[var(--line)] bg-white px-4 py-2.5 text-sm font-semibold text-[var(--ink)] hover:border-[var(--sage)] hover:text-[var(--sage)]"
              >
                <Camera className="h-4 w-4" aria-hidden="true" />
                Choose a new photo
              </label>
              <input
                id="profile-picture"
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={handleImageChange}
                className="sr-only"
              />
              <p className="mt-2 text-xs leading-5 text-[var(--muted)]">
                PNG, JPEG or WebP. Maximum file size 5 MB.
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="profile-full-name" className="field-label">
                Full name
              </label>
              <input
                id="profile-full-name"
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="field-control"
                autoComplete="name"
                required
              />
            </div>
            <div>
              <label htmlFor="profile-email" className="field-label">
                Email address
              </label>
              <input
                id="profile-email"
                type="email"
                value={formData.email}
                className="field-control bg-[var(--paper)] text-[var(--muted)]"
                disabled
              />
              <p className="mt-1 text-xs text-[var(--muted)]">
                Email cannot be changed here.
              </p>
            </div>
            <div>
              <label htmlFor="profile-phone" className="field-label">
                Phone number
              </label>
              <input
                id="profile-phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="field-control"
                autoComplete="tel"
                required
              />
            </div>
            <div>
              <label htmlFor="profile-gender" className="field-label">
                Gender
              </label>
              <select
                id="profile-gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="field-control"
              >
                <option value="N/A">Prefer not to say</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label htmlFor="profile-occupation" className="field-label">
                Occupation
              </label>
              <input
                id="profile-occupation"
                type="text"
                name="occupation"
                value={formData.occupation}
                onChange={handleChange}
                className="field-control"
              />
            </div>
            <div>
              <label htmlFor="profile-representing" className="field-label">
                Representing
              </label>
              <select
                id="profile-representing"
                name="representing"
                value={formData.representing}
                onChange={handleChange}
                className="field-control"
              >
                <option value="N/A">Not specified</option>
                <option value="Bride">Bride side</option>
                <option value="Groom">Groom side</option>
                <option value="both">Both families</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="profile-address" className="field-label">
                Address
              </label>
              <input
                id="profile-address"
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="field-control"
                autoComplete="street-address"
              />
            </div>
            <div>
              <label htmlFor="profile-city" className="field-label">
                City
              </label>
              <input
                id="profile-city"
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="field-control"
                autoComplete="address-level2"
              />
            </div>
            <div>
              <label htmlFor="profile-district" className="field-label">
                District
              </label>
              <input
                id="profile-district"
                type="text"
                name="district"
                value={formData.district}
                onChange={handleChange}
                className="field-control"
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="profile-state" className="field-label">
                State
              </label>
              <select
                id="profile-state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="field-control"
                autoComplete="address-level1"
              >
                <option value="N/A">Select a state</option>
                {indianStates.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-7 flex flex-col-reverse gap-3 border-t border-[var(--line)] pt-6 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="button-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="button-primary inline-flex items-center gap-2"
            >
              {loading ? (
                <LoaderCircle
                  className="h-4 w-4 animate-spin"
                  aria-hidden="true"
                />
              ) : (
                <Save className="h-4 w-4" aria-hidden="true" />
              )}
              {loading ? "Saving changes..." : "Save changes"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

const UserPlaceholder = ({ name }) => {
  const initials = name
    ? name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part.charAt(0).toUpperCase())
        .join("")
    : "EP";

  return <span aria-hidden="true">{initials}</span>;
};

export default ProfileEditModal;
