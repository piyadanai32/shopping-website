import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return new Response(
        JSON.stringify({ error: "ข้อมูลที่จำเป็นขาดหายไป" }),
        { status: 400 }
      );
    }

    // แฮชรหัสผ่าน
    const hashedPassword = await bcrypt.hash(password, 10);

    // ตรวจสอบว่ามีผู้ใช้ที่มีอีเมลนี้อยู่แล้วหรือไม่
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return new Response(
        JSON.stringify({ error: "อีเมลนี้ถูกใช้งานแล้ว" }),
        { status: 400 }
      );
    }

    // สร้างผู้ใช้ใหม่
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "user", // กำหนดบทบาทเป็น 'user'
      },
    });

    return new Response(
      JSON.stringify({ msg: "สร้างผู้ใช้สำเร็จแล้ว", data: user }),
      { status: 201 }
    );
  } catch (err) {
    console.error("เกิดข้อผิดพลาดระหว่างการสร้างผู้ใช้:", err);
    return new Response(
      JSON.stringify({ error: "ข้อผิดพลาดภายในเซิร์ฟเวอร์" }),
      { status: 500 }
    );
  }
}
