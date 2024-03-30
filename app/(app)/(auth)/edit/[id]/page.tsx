import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { handleCancel } from '@/lib/actions.server'

import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";
import { Label } from "@/components/ui/label"
import DeployButton from '@/components/DeployButton';
import AuthButton from '@/components/AuthButton';

export default async function Page({ params }: { params: { id: string } }) {

    const supabase = createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/login");
    }

    const { data: project } = await supabase
        .from('projects')
        .select('*')
        .eq('id', params.id)
        .single()

    if (project.user_id !== user.id) {
        return redirect("/?message=You do not have permission to edit this project.");
    }

    const handleSave = async (formData: FormData) => {
        "use server";

        const name = formData.get("name") as string;

        const supabase = createClient();

        const { error } = await supabase
            .from('projects')
            .update({ name })
            .eq('id', params.id)
            .eq('user_id', user.id)
            .single()

        if (error) {
            console.error(error)
            return;
        }

        return redirect('/')

    }

    const handleDelete = async () => {
        "use server";

        const supabase = createClient();

        const { error } = await supabase
            .from('projects')
            .delete()
            .eq('id', params.id)
            .eq('user_id', user.id)

        if (error) {
            console.error(error)
            return;
        }

        return redirect('/')
    }

    return (
        <>
            <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
                <div className="w-full max-w-4xl flex justify-between items-center p-3 text-sm">
                    <DeployButton />
                    <AuthButton />
                </div>
            </nav>
            <form className='h-screen grid place-content-center'>
                <Card className="w-[350px]">
                    <CardHeader>
                        <CardTitle className='flex justify-between items-center'>
                            Edit project
                            <Button formAction={handleDelete} variant={'destructive'} size={'icon'}  >
                                <Trash2 size={22} />
                            </Button>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>

                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" placeholder="Name of your project" name='name' defaultValue={project.name} />
                            </div>
                        </div>

                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <button formAction={handleCancel} className="border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2">cancel</button>
                        <button formAction={handleSave} type='submit' className="border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2" >
                            Save
                        </button>
                    </CardFooter>
                </Card>
            </form>
        </>
    )
}





