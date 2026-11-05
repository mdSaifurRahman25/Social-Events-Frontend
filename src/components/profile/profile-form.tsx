"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
    Image as ImageIcon,
    LoaderCircle,
    Lock,
    Mail,
    Save,
    UserRound,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

/* -------------------------------------------------------------------------- */
/*  Helpers & styles                                                          */
/* -------------------------------------------------------------------------- */

type FormErrors = {
    name?: string;
    image?: string;
};

const isValidHttpUrl = (value: string) => {
    try {
        const url = new URL(value);
        return url.protocol === "http:" || url.protocol === "https:";
    } catch {
        return false;
    }
};

const controlBase =
    "w-full rounded-xl border bg-muted/40 py-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:ring-2";

const controlState = (hasError: boolean) =>
    hasError
        ? "border-destructive focus:border-destructive focus:ring-destructive/20"
        : "border-border focus:border-primary focus:ring-primary/20";

const primaryButtonClass =
    "inline-flex items-center justify-center gap-2 rounded-full bg-linear-to-r from-pink-500 to-pink-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-pink-600/15 transition hover:from-pink-600 hover:to-pink-700 active:scale-95";

/* -------------------------------------------------------------------------- */
/*  Component                                                                 */
/* -------------------------------------------------------------------------- */

const ProfileForm = () => {
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;

    // Drafts stay undefined until the user types, so the inputs show the saved values
    const [nameDraft, setNameDraft] = useState<string>();
    const [imageDraft, setImageDraft] = useState<string>();
    const [errors, setErrors] = useState<FormErrors>({});
    const [submitting, setSubmitting] = useState(false);

    const savedName = user?.name ?? "";
    const savedImage = user?.image ?? "";

    const name = nameDraft ?? savedName;
    const image = imageDraft ?? savedImage;

    const dirty = name.trim() !== savedName || image.trim() !== savedImage;

    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNameDraft(e.target.value);
        setErrors((prev) => ({ ...prev, name: undefined }));
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        setImageDraft(e.target.value);
        setErrors((prev) => ({ ...prev, image: undefined }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!user || !dirty) return;

        const trimmedName = name.trim();
        const trimmedImage = image.trim();

        const found: FormErrors = {};

        if (trimmedName.length < 2) {
            found.name = "Enter your full name (at least 2 characters).";
        }
        if (trimmedImage && !isValidHttpUrl(trimmedImage)) {
            found.image = "Enter a valid image URL (https://...).";
        }

        setErrors(found);
        if (Object.keys(found).length > 0) {
            toast.error("Please fix the highlighted fields.");
            return;
        }

        setSubmitting(true);
        try {
            // An empty URL removes the profile photo
            const { error } = await authClient.updateUser({
                name: trimmedName,
                image: trimmedImage || null,
            });

            if (error) {
                toast.error(error.message || "Could not update your profile.");
                return;
            }

            toast.success("Profile updated!");
            router.refresh();
        } catch {
            toast.error("Something went wrong. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    /* ----- Loading ----- */
    if (isPending) {
        return (
            <div
                aria-hidden="true"
                className="space-y-6 rounded-2xl border border-border bg-card p-6 sm:p-8"
            >
                <div className="flex items-center gap-5">
                    <div className="size-24 animate-pulse rounded-full bg-muted" />
                    <div className="flex-1 space-y-3">
                        <div className="h-7 w-2/3 animate-pulse rounded-lg bg-muted" />
                        <div className="h-4 w-1/2 animate-pulse rounded bg-muted" />
                    </div>
                </div>
                <div className="h-11 animate-pulse rounded-xl bg-muted" />
                <div className="h-11 animate-pulse rounded-xl bg-muted" />
                <div className="h-11 animate-pulse rounded-xl bg-muted" />
            </div>
        );
    }

    /* ----- Logged out ----- */
    if (!user) {
        return (
            <div className="rounded-2xl border border-border bg-card p-8 text-center sm:p-10">
                <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                    Sign in to view your profile
                </h1>
                <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
                    Your profile is linked to your Kindred account.
                </p>
                <Link href="/signin" className={`mt-6 ${primaryButtonClass}`}>
                    Login
                </Link>
            </div>
        );
    }

    /* ----- Profile ----- */
    return (
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
            {/* View: photo, name, email */}
            <div className="flex items-center gap-5">
                <Avatar className="size-24">
                    <AvatarImage
                        referrerPolicy="no-referrer"
                        src={user.image || undefined}
                        alt={user.name}
                    />
                    <AvatarFallback className="text-3xl font-semibold">
                        {(user.name || user.email).charAt(0).toUpperCase()}
                    </AvatarFallback>
                </Avatar>

                <div className="min-w-0">
                    <h1 className="truncate text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                        {user.name}
                    </h1>
                    <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                        <Mail aria-hidden="true" className="size-4 shrink-0 text-primary" />
                        <span className="truncate">{user.email}</span>
                    </p>
                </div>
            </div>

            {/* Edit */}
            <form
                onSubmit={handleSubmit}
                noValidate
                className="mt-8 space-y-6 border-t border-border pt-8"
            >
                <h2 className="text-lg font-semibold text-foreground">Edit profile</h2>

                {/* Name */}
                <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium text-foreground">
                        Full Name <span className="text-destructive">*</span>
                    </label>
                    <div className="relative">
                        <span className="pointer-events-none absolute left-4 top-3.5 text-muted-foreground">
                            <UserRound aria-hidden="true" className="size-4" />
                        </span>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            autoComplete="name"
                            value={name}
                            onChange={handleNameChange}
                            aria-invalid={!!errors.name}
                            aria-describedby={errors.name ? "name-error" : undefined}
                            className={`${controlBase} pl-11 pr-4 ${controlState(!!errors.name)}`}
                        />
                    </div>
                    {errors.name && (
                        <p id="name-error" role="alert" className="text-xs text-destructive">
                            {errors.name}
                        </p>
                    )}
                </div>

                {/* Photo URL */}
                <div className="space-y-2">
                    <label htmlFor="image" className="block text-sm font-medium text-foreground">
                        Profile Photo URL <span className="text-muted-foreground">(optional)</span>
                    </label>
                    <div className="relative">
                        <span className="pointer-events-none absolute left-4 top-3.5 text-muted-foreground">
                            <ImageIcon aria-hidden="true" className="size-4" />
                        </span>
                        <input
                            id="image"
                            name="image"
                            type="url"
                            autoComplete="off"
                            value={image}
                            onChange={handleImageChange}
                            placeholder="https://example.com/your-photo.jpg"
                            aria-invalid={!!errors.image}
                            aria-describedby={errors.image ? "image-error" : "image-hint"}
                            className={`${controlBase} pl-11 pr-4 ${controlState(!!errors.image)}`}
                        />
                    </div>
                    {errors.image ? (
                        <p id="image-error" role="alert" className="text-xs text-destructive">
                            {errors.image}
                        </p>
                    ) : (
                        <p id="image-hint" className="text-xs text-muted-foreground">
                            Leave empty to remove your photo.
                        </p>
                    )}
                </div>

                {/* Email (read only) */}
                <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-foreground">
                        Email
                    </label>
                    <div className="relative">
                        <span className="pointer-events-none absolute left-4 top-3.5 text-muted-foreground">
                            <Lock aria-hidden="true" className="size-4" />
                        </span>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={user.email}
                            readOnly
                            disabled
                            className={`${controlBase} cursor-not-allowed pl-11 pr-4 opacity-70 ${controlState(false)}`}
                        />
                    </div>
                    <p className="text-xs text-muted-foreground">
                        Your email can&apos;t be changed here.
                    </p>
                </div>

                <button
                    type="submit"
                    disabled={submitting || !dirty}
                    className={`${primaryButtonClass} w-full disabled:cursor-not-allowed disabled:opacity-60`}
                >
                    {submitting ? (
                        <>
                            <LoaderCircle aria-hidden="true" className="size-4 animate-spin" />
                            Saving...
                        </>
                    ) : (
                        <>
                            <Save aria-hidden="true" className="size-4" />
                            Save Changes
                        </>
                    )}
                </button>
            </form>
        </div>
    );
};

export default ProfileForm;