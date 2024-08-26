"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result.error) {
        setErrorMessage(result.error);  // แสดงข้อผิดพลาดจากการเข้าสู่ระบบ
      } else if (result.ok) {
        console.log("Login successful");
        router.push("/profile"); // เปลี่ยนเส้นทางไปยังหน้าโปรไฟล์
      } else {
        setErrorMessage("เกิดข้อผิดพลาดที่ไม่คาดคิด กรุณาลองอีกครั้ง");
      }
    } catch (error) {
      console.error("ข้อผิดพลาด:", error);
      setErrorMessage("เกิดข้อผิดพลาดที่ไม่คาดคิด กรุณาลองอีกครั้ง");
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = () => {
    router.push("/signup");
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">อีเมล</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">รหัสผ่าน</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {errorMessage && (
          <div style={{ color: "red" }}>{errorMessage}</div>
        )}
        <button type="submit" disabled={loading}>
          {loading ? "กำลังเข้าสู่ระบบ..." : "เข้าสู่ระบบ"}
        </button>
      </form>
      <p>หากยังไม่มีบัญชี? <button onClick={handleSignUp}>สมัครสมาชิก</button></p>
    </div>
  );
}
