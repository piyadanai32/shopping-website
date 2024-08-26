import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    
    if (!email || !password) {
      console.log("Missing email or password");
      return new NextResponse(
        JSON.stringify({ error: "ข้อมูลที่จำเป็นขาดหายไป" }),
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (user) {
      console.log("User found:", user);
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) {
        const token = sign(
          { id: user.id, email: user.email, role: user.role },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );

        return new NextResponse(
          JSON.stringify({
            msg: "เข้าสู่ระบบสำเร็จ",
            data: user,
            token,
          }),
          { status: 200 }
        );
      } else {
        console.log("Invalid password");
        return new NextResponse(
          JSON.stringify({ error: "อีเมลหรือรหัสผ่านไม่ถูกต้อง" }),
          { status: 400 }
        );
      }
    } else {
      console.log("User not found");
      return new NextResponse(
        JSON.stringify({ error: "อีเมลหรือรหัสผ่านไม่ถูกต้อง" }),
        { status: 400 }
      );
    }
  } catch (err) {
    console.error("เกิดข้อผิดพลาดระหว่างการเข้าสู่ระบบ:", err);
    return new NextResponse(
      JSON.stringify({ error: "ข้อผิดพลาดภายในเซิร์ฟเวอร์" }),
      { status: 500 }
    );
  }
}
