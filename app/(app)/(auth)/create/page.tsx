import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import Create from '@/components/project/Create';

export default async function Page() {

  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <Create user_id={user.id} />
  )
}
