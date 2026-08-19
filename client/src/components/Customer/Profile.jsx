import {
  Briefcase,
  CalendarDays,
  CheckCircle2,
  Mail,
  MapPin,
  Pencil,
  Phone,
  ShieldAlert,
  UserRound,
  Users,
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import AccountDeactivateModal from "./modals/AccountDeactivateModal";
import ProfileEditModal from "./modals/ProfileEditModal";

const profileFields = [
  "fullName",
  "email",
  "phone",
  "gender",
  "occupation",
  "address",
  "city",
  "state",
];

const isProvided = (value) => {
  if (!value) return false;
  return String(value).trim().toLowerCase() !== "n/a";
};

const displayValue = (value) =>
  isProvided(value) ? String(value).trim() : "Not provided";

const getInitials = (name) => {
  if (!name) return "EP";

  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
};

const formatDate = (value) => {
  if (!value) return "Not available";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Not available";

  return new Intl.DateTimeFormat("en-IN", {
    month: "long",
    year: "numeric",
  }).format(date);
};

const Profile = () => {
  const { user } = useAuth();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeactivateModalOpen, setIsDeactivateModalOpen] = useState(false);

  const completedFields = profileFields.filter((field) =>
    isProvided(user?.[field]),
  ).length;
  const completeness = Math.round(
    (completedFields / profileFields.length) * 100,
  );

  const contactDetails = [
    { icon: Mail, label: "Email address", value: user?.email },
    { icon: Phone, label: "Phone number", value: user?.phone },
    {
      icon: MapPin,
      label: "Address",
      value: user?.address,
    },
    {
      icon: MapPin,
      label: "City and district",
      value: [user?.city, user?.district]
        .filter((value) => isProvided(value))
        .join(", "),
    },
    { icon: MapPin, label: "State", value: user?.state },
  ];

  const representing =
    user?.representing === "both"
      ? "Both families"
      : user?.representing === "Bride"
        ? "Bride side"
        : user?.representing === "Groom"
          ? "Groom side"
          : user?.representing;

  const personalDetails = [
    {
      icon: UserRound,
      label: "Gender",
      value: isProvided(user?.gender)
        ? user.gender.charAt(0).toUpperCase() + user.gender.slice(1)
        : user?.gender,
    },
    { icon: Briefcase, label: "Occupation", value: user?.occupation },
    { icon: Users, label: "Representing", value: representing },
    {
      icon: CalendarDays,
      label: "Member since",
      value: formatDate(user?.createdAt),
    },
  ];

  return (
    <div className="mx-auto w-full max-w-[90rem] p-4 sm:p-7 lg:p-10">
      <header className="flex flex-col justify-between gap-5 border-b border-[var(--line)] pb-7 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-semibold text-[var(--rose)]">
            Account details
          </p>
          <h1 className="mt-2 font-serif text-3xl font-medium text-[var(--ink)] sm:text-4xl">
            Profile
          </h1>
          <p className="mt-3 max-w-2xl leading-7 text-[var(--muted)]">
            Keep your contact information and planning context current for
            clearer conversations with the event team.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setIsEditModalOpen(true)}
          className="button-primary inline-flex shrink-0 items-center gap-2 self-start"
        >
          <Pencil className="h-4 w-4" aria-hidden="true" />
          Edit profile
        </button>
      </header>

      <div className="mt-7 grid items-start gap-6 xl:grid-cols-[0.72fr_1.28fr]">
        <section className="rounded-lg bg-[var(--ink)] p-6 text-white sm:p-7">
          <div className="relative flex h-32 w-32 items-center justify-center overflow-hidden rounded-lg bg-white/10 text-3xl font-semibold text-white">
            <span>{getInitials(user?.fullName)}</span>
            {user?.photo && (
              <img
                src={user.photo}
                alt={"Profile of " + (user?.fullName || "customer")}
                className="absolute inset-0 h-full w-full object-cover"
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                }}
              />
            )}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="rounded-md bg-white/10 px-2.5 py-1 text-xs font-semibold text-white/75">
              {user?.role || "Customer"}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-md bg-[var(--sage)] px-2.5 py-1 text-xs font-semibold text-white">
              <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
              {user?.status || "Active"}
            </span>
          </div>

          <h2 className="mt-4 text-2xl font-semibold">
            {user?.fullName || "Event customer"}
          </h2>
          <p className="mt-1 break-all text-sm text-white/60">
            {user?.email || "Email not available"}
          </p>

          <div className="mt-8 border-t border-white/10 pt-6">
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm font-semibold">Profile readiness</p>
              <p className="text-sm font-semibold text-[var(--brass)]">
                {completeness}%
              </p>
            </div>
            <div
              className="mt-3 h-2 overflow-hidden rounded-sm bg-white/10"
              role="progressbar"
              aria-label="Profile completeness"
              aria-valuemin="0"
              aria-valuemax="100"
              aria-valuenow={completeness}
            >
              <div
                className="h-full bg-[var(--brass)]"
                style={{ width: completeness + "%" }}
              />
            </div>
            <p className="mt-3 text-sm leading-6 text-white/55">
              Complete details help the team prepare useful planning
              recommendations before a call.
            </p>
          </div>
        </section>

        <div className="space-y-6">
          <section
            className="rounded-lg border border-[var(--line)] bg-white p-5 sm:p-7"
            aria-labelledby="contact-details-title"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-[var(--rose)]">
                  Contact
                </p>
                <h2
                  id="contact-details-title"
                  className="mt-1 text-xl font-semibold text-[var(--ink)]"
                >
                  Contact information
                </h2>
              </div>
            </div>

            <dl className="mt-6 grid gap-4 sm:grid-cols-2">
              {contactDetails.map((detail) => {
                const Icon = detail.icon;

                return (
                  <div
                    key={detail.label}
                    className="flex min-w-0 gap-3 border-b border-[var(--line)] pb-4"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--paper)] text-[var(--sage)]">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </div>
                    <div className="min-w-0">
                      <dt className="text-xs font-semibold text-[var(--muted)]">
                        {detail.label}
                      </dt>
                      <dd className="mt-1 break-words text-sm font-semibold text-[var(--ink)]">
                        {displayValue(detail.value)}
                      </dd>
                    </div>
                  </div>
                );
              })}
            </dl>
          </section>

          <section
            className="rounded-lg border border-[var(--line)] bg-white p-5 sm:p-7"
            aria-labelledby="planning-details-title"
          >
            <p className="text-sm font-semibold text-[var(--rose)]">
              Planning context
            </p>
            <h2
              id="planning-details-title"
              className="mt-1 text-xl font-semibold text-[var(--ink)]"
            >
              Personal details
            </h2>

            <dl className="mt-6 grid gap-4 sm:grid-cols-2">
              {personalDetails.map((detail) => {
                const Icon = detail.icon;

                return (
                  <div
                    key={detail.label}
                    className="flex gap-3 border-b border-[var(--line)] pb-4"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--paper)] text-[var(--rose)]">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </div>
                    <div>
                      <dt className="text-xs font-semibold text-[var(--muted)]">
                        {detail.label}
                      </dt>
                      <dd className="mt-1 text-sm font-semibold text-[var(--ink)]">
                        {displayValue(detail.value)}
                      </dd>
                    </div>
                  </div>
                );
              })}
            </dl>
          </section>
        </div>
      </div>

      <section
        className="mt-6 rounded-lg border border-red-200 bg-red-50 p-5 sm:flex sm:items-center sm:justify-between sm:gap-6 sm:p-6"
        aria-labelledby="deactivate-account-title"
      >
        <div className="flex gap-3">
          <ShieldAlert
            className="mt-0.5 h-5 w-5 shrink-0 text-red-700"
            aria-hidden="true"
          />
          <div>
            <h2
              id="deactivate-account-title"
              className="font-semibold text-red-900"
            >
              Deactivate account
            </h2>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-red-800">
              This marks the account inactive and ends the current session.
              Your password is required to confirm the change.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setIsDeactivateModalOpen(true)}
          className="mt-5 inline-flex min-h-11 shrink-0 items-center justify-center rounded-lg border border-red-300 bg-white px-4 py-2.5 text-sm font-semibold text-red-800 hover:bg-red-100 sm:mt-0"
        >
          Deactivate account
        </button>
      </section>

      <ProfileEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        oldData={user}
      />

      <AccountDeactivateModal
        isOpen={isDeactivateModalOpen}
        onClose={() => setIsDeactivateModalOpen(false)}
      />
    </div>
  );
};

export default Profile;
