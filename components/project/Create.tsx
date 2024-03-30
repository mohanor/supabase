'use client';

import React from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'



import { handleCreate } from '@/lib/actions.server'
import { useToast } from '../ui/use-toast';

export default function Create({user_id}: {user_id: string}) {

    const { toast } = useToast()

    const handleClientCreate = async (formData : FormData) => {

        const res = await handleCreate(user_id, formData)

        if (res.error) {
            return toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
            })
        }
    }

    return (
        <form className='h-screen grid place-content-center' action={handleClientCreate} >
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Create project</CardTitle>
                </CardHeader>
                <CardContent>

                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" name='name' placeholder="Name of your project" />
                        </div>
                    </div>

                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant="outline">Cancel</Button>
                    <Button type="submit">
                        Create
                    </Button>
                </CardFooter>
            </Card>
        </form>
    )
}
