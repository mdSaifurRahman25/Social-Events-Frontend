"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import { toast } from "sonner";

const GoogleMark = () => (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4 shrink-0">
        <path
            fill="#4285F4"
            d="M23.5 12.27c0-.85-.08-1.67-.22-2.45H12v4.64h6.45a5.52 5.52 0 0 1-2.39 3.62v3h3.86c2.26-2.08 3.58-5.15 3.58-8.81Z"
        />
        <path
            fill="#34A853"
            d="M12 24c3.24 0 5.96-1.08 7.94-2.92l-3.86-3c-1.08.72-2.45 1.15-4.08 1.15-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09A12 12 0 0 0 12 24Z"
        />
        <path
            fill="#FBBC05"
            d="M5.27 14.27a7.2 7.2 0 0 1 0-4.54V6.64H1.29a12 12 0 0 0 0 10.72l3.98-3.09Z"
        />
        <path
            fill="#EA4335"
            d="M12 4.77c1.76 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.2 15.24 0 12 0A12 12 0 0 0 1.29 6.64l3.98 3.09C6.22 6.88 8.87 4.77 12 4.77Z"
        />
    </svg>
);

const SignInPage = () => {
    const handleEmailLogin = async (e: React.SubmitEvent<HTMLElement>) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const user = Object.fromEntries(formData.entries()) as { email: string, password: string };
        console.log(user);

        const { data, error } = await authClient.signIn.email({
            ...user,
        });

        if (data) {
            console.log(data);
            redirect('/')
        }
        if (error) {
            console.log(error);
        }
    };

    const handleSocialSignIn = async (provider: string) => {
        const data = await authClient.signIn.social({
            provider,
        });
        if (data) {
            toast.success('User login successfully.')
            console.log(data, `sign in with ${provider}.`);
        }
    }; 

    return (
        <main className="relative flex flex-1 items-center justify-center px-6 py-20 md:py-28">
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-br from-primary/10 via-background to-accent/10"
            />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-24 left-1/2 -z-10 size-[34rem] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
            />

            <div className="w-full max-w-md">
                <div className="rounded-2xl border border-border bg-card p-7 shadow-xl shadow-primary/5 sm:p-9">
                    <div className="text-center">
                        <h1 className="text-3xl font-bold tracking-tight text-foreground">
                            Welcome Back
                        </h1>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Sign in to organize and join community drives.
                        </p>
                    </div>

                    <form onSubmit={handleEmailLogin} className="mt-8 flex flex-col gap-5">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="email" className="text-foreground">
                                Email
                            </Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                placeholder="name@example.com"
                                className="h-11 rounded-lg bg-background"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password" className="text-foreground">
                                    Password
                                </Label>
                                <Link
                                    href="/forgot-password"
                                    className="text-xs font-medium text-primary transition hover:underline"
                                >
                                    Forgot password?
                                </Link>
                            </div>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                placeholder="••••••••"
                                className="h-11 rounded-lg bg-background"
                            />
                        </div>

                        <Button
                            type="submit"
                            size="lg"
                            className="h-12 w-full rounded-lg bg-linear-to-r from-primary to-accent text-base font-semibold text-primary-foreground shadow-lg shadow-primary/20 transition hover:opacity-90"
                        >
                            Sign In
                            <ArrowRight className="ml-1 size-4" />
                        </Button>
                    </form>

                    <div className="my-6 flex items-center gap-4">
                        <span className="h-px flex-1 bg-border" />
                        <span className="text-xs uppercase tracking-wider text-muted-foreground">
                            or
                        </span>
                        <span className="h-px flex-1 bg-border" />
                    </div>

                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => handleSocialSignIn('google')}
                        size="lg"
                        className="h-12 w-full rounded-lg bg-background text-base font-medium"
                    >
                        <GoogleMark />
                        Continue with Google
                    </Button>

                    <p className="mt-7 text-center text-sm text-muted-foreground">
                        Don&apos;t have an account?{" "}
                        <Link
                            href="/signup"
                            className="font-semibold text-primary transition hover:underline"
                        >
                            Register here.
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    );
};

export default SignInPage;
