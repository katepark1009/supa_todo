import UI from './ui';
import { createServerSupabaseClient } from "utils/supabase/server";

export default async function Home() {
  const supabase = await createServerSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <main>
      <UI currentUser={session?.user?.email?.split("@")?.[0] || ''} avatarUrl={session?.user?.user_metadata?.avatar_url} />
    </main>
  );
}
