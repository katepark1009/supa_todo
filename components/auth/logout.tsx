"use client";

import { Button } from "@material-tailwind/react";
import { createBrowserSupabaseClient } from "utils/supabase/client";

export default function LogoutButton() {
  const supabase = createBrowserSupabaseClient();

  return (
    <Button
      onClick={async () => {
        console.log("Logging out");
        supabase.auth.signOut();
      }}
      color="red"
    >
      Logout
    </Button>
  );
}