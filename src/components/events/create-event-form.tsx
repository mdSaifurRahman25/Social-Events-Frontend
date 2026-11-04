"use client";

import {
    useState,
    type ChangeEvent,
    type FormEvent,
    type ReactNode,
} from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
    Calendar as CalendarIcon,
    ChevronDown,
    CirclePlus,
    Image as ImageIcon,
    LoaderCircle,
    MapPin,
    Sparkles,
    Tag,
    Type as TypeIcon,
    type LucideIcon,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

/* -------------------------------------------------------------------------- */
/*  Config                                                                    */
/* -------------------------------------------------------------------------- */

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000";

const EVENT_TYPES = [
    "Donation",
    "Cleanup",
    "Plantation",
    "Winter Relief",
    "Food Drive",
    "Health Camp",
    "Education",
] as const;

// TODO: নিজের পছন্দের Unsplash ছবির লিংক দিয়ে এই url গুলো বদলে নিন।
// এখন picsum-এর placeholder ছবি আছে, যাতে বাটন কাজ করে কিনা দেখা যায়।
const PHOTO_PRESETS = [
    { label: "Winter Clothes", url: "https://picsum.photos/seed/winter-clothes/1200/800" },
    { label: "Blanket Relief", url: "https://picsum.photos/seed/blanket-relief/1200/800" },
    { label: "Cleanup", url: "https://picsum.photos/seed/cleanup/1200/800" },
    { label: "Tree Plantation", url: "https://picsum.photos/seed/tree-plantation/1200/800" },
];

/* -------------------------------------------------------------------------- */
/*  Types & helpers                                                           */
/* -------------------------------------------------------------------------- */

type FormValues = {
    title: string;
    type: string;
    date: string;
    location: string;
    thumbnail: string;
    description: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const INITIAL_VALUES: FormValues = {
    title: "",
    type: EVENT_TYPES[0],
    date: "",
    location: "",
    thumbnail: "",
    description: "",
};

// আজকের তারিখ (ইউজারের local time অনুযায়ী) YYYY-MM-DD ফরম্যাটে
const todayISO = () => {
    const d = new Date();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${d.getFullYear()}-${month}-${day}`;
};

const isValidHttpUrl = (value: string) => {
    try {
        const url = new URL(value);
        return url.protocol === "http:" || url.protocol === "https:";
    } catch {
        return false;
    }
};

const validate = (v: FormValues): FormErrors => {
    const errors: FormErrors = {};

    if (v.title.trim().length < 5) {
        errors.title = "Title must be at least 5 characters.";
    }
    if (!(EVENT_TYPES as readonly string[]).includes(v.type)) {
        errors.type = "Choose an event type.";
    }
    if (!v.date) {
        errors.date = "Pick an event date.";
    } else if (v.date < todayISO()) {
        errors.date = "Date must be today or later.";
    }
    if (v.location.trim().length < 3) {
        errors.location = "Enter the location or venue.";
    }
    if (!isValidHttpUrl(v.thumbnail.trim())) {
        errors.thumbnail = "Enter a valid image URL (https://...).";
    }
    if (v.description.trim().length < 20) {
        errors.description = "Description must be at least 20 characters.";
    }

    return errors;
};

/* -------------------------------------------------------------------------- */
/*  Styles (Kindred design system: semantic tokens so light/dark both work)   */
/* -------------------------------------------------------------------------- */

const controlBase =
    "w-full rounded-xl border bg-muted/40 py-3 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:ring-2";

const controlState = (hasError: boolean) =>
    hasError
        ? "border-destructive focus:border-destructive focus:ring-destructive/20"
        : "border-border focus:border-primary focus:ring-primary/20";

/* -------------------------------------------------------------------------- */
/*  Field wrapper                                                             */
/* -------------------------------------------------------------------------- */

type FieldProps = {
    name: keyof FormValues;
    label: string;
    icon?: LucideIcon;
    error?: string;
    hint?: ReactNode;
    children: ReactNode;
};

const Field = ({ name, label, icon: Icon, error, hint, children }: FieldProps) => (
    <div className="space-y-2">
        <label htmlFor={name} className="block text-sm font-medium text-foreground">
            {label} <span className="text-destructive">*</span>
        </label>

        <div className="relative">
            {Icon && (
                <span className="pointer-events-none absolute left-4 top-3.5 text-muted-foreground">
                    <Icon aria-hidden="true" className="size-4" />
                </span>
            )}
            {children}
        </div>

        {error && (
            <p id={`${name}-error`} role="alert" className="text-xs text-destructive">
                {error}
            </p>
        )}
        {hint && <div className="text-xs text-muted-foreground">{hint}</div>}
    </div>
);

/* -------------------------------------------------------------------------- */
/*  Form                                                                      */
/* -------------------------------------------------------------------------- */

const CreateEventForm = () => {
    const router = useRouter();
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;

    const [values, setValues] = useState<FormValues>(INITIAL_VALUES);
    const [errors, setErrors] = useState<FormErrors>({});
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = e.target;
        setValues((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: undefined }));
    };

    const applyPreset = (url: string) => {
        setValues((prev) => ({ ...prev, thumbnail: url }));
        setErrors((prev) => ({ ...prev, thumbnail: undefined }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!user) return;

        const found = validate(values);
        setErrors(found);
        if (Object.keys(found).length > 0) {
            toast.error("Please fix the highlighted fields.");
            return;
        }

        setSubmitting(true);
        try {
            const res = await fetch(`${API_URL}/events`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    title: values.title.trim(),
                    type: values.type,
                    date: values.date,
                    location: values.location.trim(),
                    thumbnail: values.thumbnail.trim(),
                    description: values.description.trim(),
                    organizerEmail: user.email,
                    organizerName: user.name,
                }),
            });

            if (!res.ok) {
                const body = await res.json().catch(() => null);
                throw new Error(body?.message ?? "Could not publish the event.");
            }

            toast.success("Event published!");
            router.push("/events");
            router.refresh();
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Something went wrong.");
        } finally {
            setSubmitting(false);
        }
    };

    /* ----- Loading: session আসার আগে skeleton ----- */
    if (isPending) {
        return (
            <div
                aria-hidden="true"
                className="space-y-6 rounded-2xl border border-border bg-card p-6 sm:p-8"
            >
                <div className="h-6 w-40 animate-pulse rounded-full bg-muted" />
                <div className="h-9 w-3/4 animate-pulse rounded-lg bg-muted" />
                <div className="h-11 animate-pulse rounded-xl bg-muted" />
                <div className="h-11 animate-pulse rounded-xl bg-muted" />
                <div className="h-11 animate-pulse rounded-xl bg-muted" />
                <div className="h-28 animate-pulse rounded-xl bg-muted" />
            </div>
        );
    }

    /* ----- Form ----- */
    return (
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                <Sparkles aria-hidden="true" className="size-3.5" />
                Social Service Drive
            </span>

            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground">
                Create a Community Event
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Organize a local relief effort, environmental cleanup, or community support drive.
            </p>

            <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-6">
                {/* Title */}
                <Field name="title" label="Event Title" icon={TypeIcon} error={errors.title}>
                    <input
                        id="title"
                        name="title"
                        type="text"
                        value={values.title}
                        onChange={handleChange}
                        placeholder="e.g. Winter Clothes Distribution – Mirpur 10, Dhaka"
                        aria-invalid={!!errors.title}
                        aria-describedby={errors.title ? "title-error" : undefined}
                        className={`${controlBase} pl-11 pr-4 ${controlState(!!errors.title)}`}
                    />
                </Field>

                {/* Type + Date */}
                <div className="grid items-start gap-6 sm:grid-cols-2">
                    <Field name="type" label="Event Type" icon={Tag} error={errors.type}>
                        <select
                            id="type"
                            name="type"
                            value={values.type}
                            onChange={handleChange}
                            aria-invalid={!!errors.type}
                            aria-describedby={errors.type ? "type-error" : undefined}
                            className={`${controlBase} cursor-pointer appearance-none pl-11 pr-10 ${controlState(!!errors.type)}`}
                        >
                            {EVENT_TYPES.map((t) => (
                                <option key={t} value={t}>
                                    {t}
                                </option>
                            ))}
                        </select>
                        <ChevronDown
                            aria-hidden="true"
                            className="pointer-events-none absolute right-4 top-3.5 size-4 text-muted-foreground"
                        />
                    </Field>

                    <Field
                        name="date"
                        label="Event Date"
                        icon={CalendarIcon}
                        error={errors.date}
                        hint="Dates must be in the future (today or later)"
                    >
                        <input
                            id="date"
                            name="date"
                            type="date"
                            min={todayISO()}
                            value={values.date}
                            onChange={handleChange}
                            aria-invalid={!!errors.date}
                            aria-describedby={errors.date ? "date-error" : undefined}
                            className={`${controlBase} scheme-light pl-11 pr-4 dark:scheme-dark ${controlState(!!errors.date)}`}
                        />
                    </Field>
                </div>

                {/* Location */}
                <Field name="location" label="Location / Venue" icon={MapPin} error={errors.location}>
                    <input
                        id="location"
                        name="location"
                        type="text"
                        value={values.location}
                        onChange={handleChange}
                        placeholder="e.g. Mohammadpur Town Hall, Dhaka"
                        aria-invalid={!!errors.location}
                        aria-describedby={errors.location ? "location-error" : undefined}
                        className={`${controlBase} pl-11 pr-4 ${controlState(!!errors.location)}`}
                    />
                </Field>

                {/* Thumbnail */}
                <Field
                    name="thumbnail"
                    label="Thumbnail Image URL"
                    icon={ImageIcon}
                    error={errors.thumbnail}
                    hint={
                        <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
                            <span>Quick photo presets:</span>
                            {PHOTO_PRESETS.map((p, i) => (
                                <span key={p.label} className="inline-flex items-center gap-2">
                                    {i > 0 && <span aria-hidden="true">•</span>}
                                    <button
                                        type="button"
                                        onClick={() => applyPreset(p.url)}
                                        className="font-medium text-primary transition hover:underline"
                                    >
                                        {p.label}
                                    </button>
                                </span>
                            ))}
                        </span>
                    }
                >
                    <input
                        id="thumbnail"
                        name="thumbnail"
                        type="url"
                        value={values.thumbnail}
                        onChange={handleChange}
                        placeholder="https://images.unsplash.com/photo-..."
                        aria-invalid={!!errors.thumbnail}
                        aria-describedby={errors.thumbnail ? "thumbnail-error" : undefined}
                        className={`${controlBase} pl-11 pr-4 ${controlState(!!errors.thumbnail)}`}
                    />
                </Field>

                {/* Description */}
                <Field name="description" label="Event Description" error={errors.description}>
                    <textarea
                        id="description"
                        name="description"
                        rows={5}
                        value={values.description}
                        onChange={handleChange}
                        placeholder="Explain the purpose of the drive, volunteers required, items being distributed or tasks to complete..."
                        aria-invalid={!!errors.description}
                        aria-describedby={errors.description ? "description-error" : undefined}
                        className={`${controlBase} resize-y px-4 leading-6 ${controlState(!!errors.description)}`}
                    />
                </Field>

                {/* Organizer email (session থেকে, edit করা যাবে না) */}
                <div className="flex items-center justify-between gap-4 rounded-xl border border-border bg-muted/40 px-4 py-3 text-xs">
                    <span className="text-muted-foreground">Organizer Email attached:</span>
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={submitting}
                    className="flex w-full items-center justify-center gap-2 rounded-full bg-linear-to-r from-pink-500 to-pink-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-pink-600/15 transition hover:from-pink-600 hover:to-pink-700 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {submitting ? (
                        <>
                            <LoaderCircle aria-hidden="true" className="size-4 animate-spin" />
                            Publishing...
                        </>
                    ) : (
                        <>
                            <CirclePlus aria-hidden="true" className="size-4" />
                            Publish Event
                        </>
                    )}
                </button>
            </form>
        </div>
    );
};

export default CreateEventForm;
