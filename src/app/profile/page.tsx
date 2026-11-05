import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ProfileForm from "@/components/profile/profile-form";

export const metadata: Metadata = {
    title: "My profile | Kindred",
    description: "View and update your Kindred profile.",
};

const ProfilePage = () => {
    return (
        <main className="mx-auto w-full max-w-2xl px-5 pb-20 pt-28 sm:px-8">
            <Link
                href="/"
                className="mb-5 inline-flex items-center gap-2 text-sm text-muted-foreground transition hover:text-primary"
            >
                <ArrowLeft aria-hidden="true" className="size-4" />
                Back to home
            </Link>

            <ProfileForm />
        </main>
    );
};

export default ProfilePage;