"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import axiosInstance from "@/lib/axios";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";

const signInformSchema = z.object({
    email: z.string().email(),
    password: z.string().min(4).max(24),
});
const signUpformSchema = z.object({
    name: z.string().optional(),
    phoneNumber: z.string().optional(),
    email: z.string().email(),
    password: z.string().min(4).max(24),
});
export default function Auth() {
    const navigate = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();
    const signInForm = useForm<z.infer<typeof signInformSchema>>({
        resolver: zodResolver(signInformSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    async function onSubmitSignIn(values: z.infer<typeof signInformSchema>) {
        setIsLoading(true);
        try {
            const response = await axiosInstance.post("/auth/sign-in", values);
            localStorage.setItem("token", response.data.token);
            navigate.push("/");
            signInForm.reset();
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                console.warn("Sign-In Action:", {
                    status: error.response?.status,
                    statusText: error.response?.statusText,
                    error: error.response?.data.error,
                });
                toast({
                    variant: "default",
                    duration: 2000,
                    title: "Warning",
                    description: error.response?.data.error,
                });
            } else {
                console.error("Unexpected error:", error);
            }
        } finally {
            setTimeout(() => {
                setIsLoading(false);
            }, 3000);
        }
    }

    const signUpForm = useForm<z.infer<typeof signUpformSchema>>({
        resolver: zodResolver(signUpformSchema),
        defaultValues: {
            name: "",
            phoneNumber: "",
            email: "",
            password: "",
        },
    });

    async function onSubmitSignUp(values: z.infer<typeof signUpformSchema>) {
        setIsLoading(true);
        try {
            await axiosInstance.post("/auth/sign-up", values);
            toast({
                variant: "default",
                duration: 2000,
                title: "Success",
                description: "New user created",
            });
            signUpForm.reset();
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                console.warn("Sign-Up Action:", {
                    status: error.response?.status,
                    statusText: error.response?.statusText,
                    error: error.response?.data.error,
                });
                toast({
                    variant: "default",
                    duration: 2000,
                    title: "Warning",
                    description: error.response?.data.error,
                });
            } else {
                console.error("Unexpected error:", error);
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Tabs defaultValue="sign-in" className="w-[400px]">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="sign-in">Sign In</TabsTrigger>
                <TabsTrigger value="sign-up">Sign Up</TabsTrigger>
            </TabsList>
            <TabsContent value="sign-in">
                <Form {...signInForm}>
                    <form
                        onSubmit={signInForm.handleSubmit(onSubmitSignIn)}
                        className="space-y-8"
                    >
                        <Card>
                            <CardHeader>
                                <CardTitle>Sign In</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <FormField
                                    control={signInForm.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="****@gmail.com"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                Your mail address
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={signInForm.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="password"
                                                    placeholder="************"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                            <CardFooter>
                                <Button disabled={isLoading} type="submit">
                                    {isLoading ? (
                                        <Loader2 className="animate-spin" />
                                    ) : (
                                        ""
                                    )}
                                    Submit
                                </Button>
                            </CardFooter>
                        </Card>
                    </form>
                </Form>
            </TabsContent>
            <TabsContent value="sign-up">
                <Form {...signUpForm}>
                    <form
                        onSubmit={signUpForm.handleSubmit(onSubmitSignUp)}
                        className="space-y-8"
                    >
                        <Card>
                            <CardHeader>
                                <CardTitle>Sign Up</CardTitle>
                                <CardDescription>
                                    Create your new account
                                </CardDescription>
                            </CardHeader>

                            <CardContent className="space-y-2">
                                <FormField
                                    control={signUpForm.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                Your name
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={signUpForm.control}
                                    name="phoneNumber"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Phone number</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormDescription>
                                                Your phone number
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={signUpForm.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="****@gmail.com"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription>
                                                Your mail address
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={signUpForm.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="password"
                                                    placeholder="************"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </CardContent>
                            <CardFooter>
                                <Button disabled={isLoading} type="submit">
                                    {isLoading ? (
                                        <Loader2 className="animate-spin" />
                                    ) : (
                                        ""
                                    )}
                                    Submit
                                </Button>
                            </CardFooter>
                        </Card>
                    </form>
                </Form>
            </TabsContent>
        </Tabs>
    );
}
