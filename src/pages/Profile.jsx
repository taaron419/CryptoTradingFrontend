import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const formatDate = (value) => {
  if (!value) return "--";

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
};

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadProfile = async () => {
      const token = localStorage.getItem("coinbaseToken");

      if (!token) {
        navigate("/signin", { replace: true });
        return;
      }

      try {
        const response = await fetch(`${API_BASE_URL}/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        });
        const payload = await response.json();

        if (!response.ok) {
          throw new Error(payload.message || "Unable to load profile.");
        }

        setUser(payload.user);
        localStorage.setItem("coinbaseUser", JSON.stringify(payload.user));
      } catch (requestError) {
        setError(requestError.message);

        if (requestError.message.toLowerCase().includes("authenticated")) {
          localStorage.removeItem("coinbaseToken");
          localStorage.removeItem("coinbaseUser");
          window.dispatchEvent(new Event("coinbase-auth-change"));
          navigate("/signin", { replace: true });
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadProfile();
  }, [navigate]);

  return (
    <main className="bg-white px-6 py-12 sm:px-10 lg:px-[56px]">
      <div className="mx-auto max-w-[1400px]">
        <h1 className="text-[clamp(2.75rem,5vw,5rem)] font-normal leading-tight text-black">
          User profile
        </h1>
      </div>

      <section className="mx-auto mt-10 max-w-[1400px] overflow-hidden rounded-[36px] bg-[#08090b] text-white">
        {isLoading ? (
          <p className="p-8 text-slate-300">Loading profile...</p>
        ) : null}

        {!isLoading && error ? (
          <div className="m-8 rounded-2xl bg-red-500/10 px-5 py-4 text-sm font-semibold text-red-200">
            {error}
          </div>
        ) : null}

        {!isLoading && user ? (
          <div className="grid gap-0 lg:grid-cols-[0.9fr_1.5fr]">
            <div className="bg-[#0052ff] p-8 sm:p-12">
              <div className="grid h-24 w-24 place-items-center rounded-full bg-white text-4xl font-semibold text-[#0052ff]">
                {user.name?.slice(0, 1).toUpperCase() || "U"}
              </div>
              <h2 className="mt-8 text-[clamp(2rem,4vw,4rem)] font-normal leading-none">
                {user.name}
              </h2>
              <p className="mt-4 break-all text-xl text-blue-100">
                {user.email}
              </p>
            </div>

            <div className="grid gap-5 bg-[#08090b] p-6 sm:grid-cols-2 sm:p-10">
              <div className="rounded-[24px] bg-[#15171c] p-6 ring-1 ring-white/10">
                <p className="text-sm font-semibold text-slate-400">Name</p>
                <p className="mt-3 text-2xl font-semibold text-white">
                  {user.name}
                </p>
              </div>
              <div className="rounded-[24px] bg-[#15171c] p-6 ring-1 ring-white/10">
                <p className="text-sm font-semibold text-slate-400">Email</p>
                <p className="mt-3 break-all text-2xl font-semibold text-white">
                  {user.email}
                </p>
              </div>
              <div className="rounded-[24px] bg-[#15171c] p-6 ring-1 ring-white/10">
                <p className="text-sm font-semibold text-slate-400">User ID</p>
                <p className="mt-3 break-all text-sm font-semibold text-white">
                  {user.id}
                </p>
              </div>
              <div className="rounded-[24px] bg-[#15171c] p-6 ring-1 ring-white/10">
                <p className="text-sm font-semibold text-slate-400">Member since</p>
                <p className="mt-3 text-2xl font-semibold text-white">
                  {formatDate(user.createdAt)}
                </p>
              </div>
            </div>
          </div>
        ) : null}

        <button
          type="button"
          onClick={() => navigate("/")}
          className="mx-8 mb-8 mt-10 rounded-full bg-white px-8 py-4 text-base font-semibold text-black transition hover:bg-[#0052ff] hover:text-white sm:mx-10"
        >
          Back home
        </button>
      </section>
    </main>
  );
};

export default Profile;
