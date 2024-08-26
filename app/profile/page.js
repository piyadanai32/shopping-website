"use client"; // บอกให้ไฟล์นี้ทำงานเป็น Client Component

import { SessionProvider } from "next-auth/react";
import dynamic from "next/dynamic";
import Item from "../connections/item";

const ProfileClient = dynamic(() => import("./ProfileClient"), {
  ssr: false,
});

export default function ProfilePage() {
  return (
    <Item>
      <SessionProvider>
        <ProfileClient />
      </SessionProvider>
    </Item>
  );
}
