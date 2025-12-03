'use client'
import { useState } from "react";

export default function AdminPage() {
  const [pass, setPass] = useState("");
  const [authed, setAuthed] = useState(false);

  const ADMIN_PASS = process.env.NEXT_PUBLIC_ADMIN_PASS || "changeme";

  function login(e: any) {
    e.preventDefault();
    if (pass === ADMIN_PASS) setAuthed(true);
    else alert("Wrong password");
  }

  if (!authed)
    return (
      <div className="max-w-md mx-auto mt-24">
        <h2 className="text-2xl mb-4">Admin Login</h2>
        <form onSubmit={login} className="flex flex-col gap-3">
          <input
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            placeholder="Password"
            className="p-2 border rounded"
          />
          <button className="bg-blue-600 text-white p-2 rounded">Login</button>
        </form>
      </div>
    );

  return (
    <div>
      <h2 className="text-2xl mb-4">Admin Dashboard (Dev)</h2>
      <p>Next: add story form and story list here.</p>
    </div>
  );
}
