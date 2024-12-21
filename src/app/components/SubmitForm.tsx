  // components/LoginForm.tsx

  "use client";
  import { useRouter  } from "next/navigation";

  import { useState } from "react";
  import { toast, ToastContainer } from "react-toastify";
  import { loginUserAction } from "../actions/loginActions"; // Action for login

  const LoginForm = () => {
    const router = useRouter();

    const [userId, setUserId] = useState<string>("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      const loginData = { userName: userId, password };

      try {
        const result = await loginUserAction(loginData);
        if (result?.success) {
          console.log("Login successful!");

          router.push("/");
        } else {
          console.log("Login unsuccessful!");
          toast(result.message || "Invalid credentials, please try again.", {
            type: "error",
          });
        }
      } catch (error) {
        toast("Something went wrong. Please try again later.", {
          type: "error",
        });
      } finally {
        setLoading(false);
      }
    };

    return (
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 max-w-5xl p-16 border mt-16 mx-auto shadow-md">
        <input
          className="w-full min-w-24 sm:px-4 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="Enter your userId"
        />
        <input
          type="password"
          className="w-full min-w-24 sm:px-4 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 "
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
        <button type="submit" className="w-full min-w-24 sm:px-4 px-2 py-1 text-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 bg-blue-500">{loading ? "Logging in..." : "Login"}</button>
        <ToastContainer />
      </form>
    );
  };

  export default LoginForm;
