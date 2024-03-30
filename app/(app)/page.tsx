import { createClient } from "@/utils/supabase/server";

import { CalendarDays } from "lucide-react"
import { Card, CardContent } from '@/components/ui/card'
import { Button } from "@/components/ui/button";
import Link from "next/link";
import DeployButton from "@/components/DeployButton";
import AuthButton from "@/components/AuthButton";

export default async function Index({
  searchParams,
}: {
  searchParams: { message: string };
}) {

  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: projects } = await supabase.from('projects')
    .select(`
          *,
          profiles (email)
          `)

  return (
    <>
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
          <DeployButton />
          <AuthButton />
        </div>
      </nav>
      <div className="max-w-xl m-auto mt-12 ">
        {searchParams?.message && (
          <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
            {searchParams.message}
          </p>
        )}
        {
          user &&
          <Button asChild className="mb-4 capitalize">
            <Link href="/create">craete new project</Link>
          </Button>
        }
        <div className="space-y-3">
          {
            projects?.map((project, index) => (
              <Card className="w-full" key={index} >
                <CardContent className="space-y-1 p-2 flex items-center justify-between">
                  <div>
                    <div className='flex items-center gap-2'>
                      <h4 className="font-semibold text-blue-800">{project.name}</h4>
                      <div className="flex items-center">
                        <CalendarDays className="mr-1 h-4 w-4 opacity-70" />{" "}
                        <span className="text-sm text-muted-foreground">
                          {project.created_at.split('T')[0]}
                        </span>
                      </div>
                    </div>
                    <p className="">
                      {project.profiles.email}
                    </p>
                  </div>
                  <Link href={`/edit/${project.id}`} className="border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2" >Edit</Link>
                </CardContent>
              </Card>
            ))
          }
        </div>
      </div>
    </>
  );
}


