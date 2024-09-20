import { createServerSupabaseClient } from "utils/supabase/server";
import Auth from 'components/auth';
import { redirect } from 'next/navigation';

export default async function Home() {
  const supabase = await createServerSupabaseClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session?.user) {
    redirect('/');
  }

  return (
    <main>
      <Auth />
    </main>
  );
}
