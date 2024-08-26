"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function ProfileClient() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session) {
    router.push("/signin");
    return null;
  }

  return (
    <form>
      <div>
        {session.user.role === "admin" ? (
          <h1>You are Admin!</h1>
        ) : (
          <>
            <h1>Welcome {session.user.name}</h1>
            <h1>Email: {session.user.email}</h1>
          </>
        )}
      </div>
    </form>
  );
}
