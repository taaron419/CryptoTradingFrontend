import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
import Input from "../components/common/Input";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const SignUp = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    name: "",
    email: searchParams.get("email") || "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to create account.");
      }

      localStorage.removeItem("coinbaseToken");
      localStorage.removeItem("coinbaseUser");
      window.dispatchEvent(new Event("coinbase-auth-change"));
      navigate("/");
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <Card className="mx-auto max-w-md rounded-3xl p-8">
        <h1 className="text-3xl font-semibold text-slate-900">
          Create your account
        </h1>
        <p className="mt-3 text-sm text-slate-600">
          Demo app – do not use your real password.
        </p>
        <p className="mt-2 text-sm text-slate-600">
          Already have an account?{" "}
          <Link to="/signin" className="font-semibold text-[#0052ff]">
            Sign in
          </Link>
        </p>

        <form className="mt-7 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-slate-700"
            >
              Name
            </label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 h-12 rounded-2xl"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-700"
            >
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 h-12 rounded-2xl"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-slate-700"
            >
              Password
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-1 h-12 rounded-2xl"
            />
          </div>

          {error && (
            <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
              {error}
            </p>
          )}

          <label className="flex items-start gap-2 text-sm text-slate-600">
            <input
              type="checkbox"
              required
              className="mt-0.5 h-4 w-4 rounded border-slate-300"
            />
            I certify that I am 18 years of age and I agree to the terms and
            privacy policy.
          </label>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-full py-3 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? "Creating account..." : "Create account"}
          </Button>
        </form>
      </Card>
    </main>
  );
};

export default SignUp;
