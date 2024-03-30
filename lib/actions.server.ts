"use server";

import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

const handleCreate = async (user_id: string, formData: FormData) => {

    const supabase = createClient();

    const name = formData.get("name") as string;

    const { data, error } = await supabase
        .from('projects')
        .insert({
            name,
            user_id: user_id,
        })
        .single()

    if (error) {
        return {
            error: error.message
        };
    }

    return redirect('/')
}

const handleCancel = async () => {
    "use server";

    return redirect('/')
}

export { handleCreate, handleCancel };


