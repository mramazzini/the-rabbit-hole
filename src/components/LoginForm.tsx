"use client";
import { login } from "@/lib/login";
import { useState } from "react";
import { useRouter } from "next/navigation";
const LoginForm = () => {
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const loginRes = await login(password);
    console.log(loginRes);
    if (loginRes) {
      router.push("/app/edit");
    } else {
      alert("Incorrect password");
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Password:
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
