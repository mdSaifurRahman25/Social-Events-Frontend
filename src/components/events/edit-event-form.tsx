"use client";

import {
    useEffect,
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
    Image as ImageIcon,
    LoaderCircle,
    MapPin,
    Save,
    SearchX,
    ShieldAlert,
    SquarePen,
    Tag,
    TriangleAlert,
    Type as TypeIcon,
    type LucideIcon,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

/* -------------------------------------------------------------------------- */
/*  Config                                                                    */
/* -------------------------------------------------------------------------- */

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

const EVENT_TYPES = [
    "Donation",
    "Cleanup",
    "Plantation",
    "Winter Relief",
    "Food Drive",
    "Health Camp",
    "Education",
] as const;

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

type LoadState = "loading" | "ready" | "missing" | "forbidden" | "error";

const EMPTY_VALUES: FormValues = {
    title: "",
    type: EVENT_TYPES[0],
    date: "",
    location: "",
    thumbnail: "",
    description: "",
};

// Today's date in the user's local time, formatted as YYYY-MM-DD
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

const primaryButtonClass =
    "inline-flex items-center justify-center gap-2 rounded-full bg-linear-to-r from-pink-500 to-pink-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-pink-600/15 transition hover:from-pink-600 hover:to-pink-700 active:scale-95";

/* -------------------------------------------------------------------------- */
/*  Small building blocks                                                     */
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

type StateCardProps = {
    icon: LucideIcon;
    title: string;
    description: string;
};

const StateCard = ({ icon: Icon, title, description }: StateCardProps) => (
    <div
        role="alert"
        className="flex flex-col items-center rounded-2xl border border-border bg-card px-6 py-16 text-center shadow-sm"
    >
        <span className="flex size-14 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Icon aria-hidden="true" className="size-7" />
        </span>
        <h1 className="mt-5 text-xl font-semibold text-foreground">{title}</h1>
        <p className="mt-2 max-w-md text-sm text-muted-foreground">{description}</p>
        <Link href="/events/manage" className={`mt-6 ${primaryButtonClass}`}>
            Back to Manage Events
        </Link>
    </div>
);

/* -------------------------------------------------------------------------- */
/*  Form                                                                      */
/* -------------------------------------------------------------------------- */

const EditEventForm = ({ id }: { id: string }) => {
    const router = useRouter();
    const { data: session, isPending: sessionPending } = authClient.useSession();
    const userId = session?.user?.id;

    const [values, setValues] = useState<FormValues>(EMPTY_VALUES);
    const [errors, setErrors] = useState<FormErrors>({});
    const [loadState, setLoadState] = useState<LoadState>("loading");
    const [submitting, setSubmitting] = useState(false);

    // Load the event and make sure it belongs to the logged-in user
    useEffect(() => {
        if (!userId) return;

        const controller = new AbortController();

        const loadEvent = async () => {
            try {
                // Fresh JWT for the Express backend
                const { data: tokenData } = await authClient.token();

                const res = await fetch(`${API_URL}/events/${encodeURIComponent(id)}`, {
                    cache: "no-store",
                    headers: tokenData?.token
                        ? { Authorization: `Bearer ${tokenData.token}` }
                        : undefined,
                    signal: controller.signal,
                });

                if (res.status === 400 || res.status === 404) {
                    setLoadState("missing");
                    return;
                }

                if (!res.ok) {
                    throw new Error("Failed to load the event.");
                }

                const { result } = await res.json();

                if (!result) {
                    setLoadState("missing");
                    return;
                }

                // UI check only; the backend also enforces ownership on update
                if (result.organizerId !== userId) {
                    setLoadState("forbidden");
                    return;
                }

                setValues({
                    title: result.title ?? "",
                    type: result.type ?? EVENT_TYPES[0],
                    date: result.date ?? "",
                    location: result.location ?? "",
                    thumbnail: result.thumbnail ?? "",
                    description: result.description ?? "",
                });
                setLoadState("ready");
            } catch {
                // Ignore errors caused by the effect being cleaned up
                if (controller.signal.aborted) return;
                setLoadState("error");
            }
        };

        loadEvent();

        return () => controller.abort();
    }, [id, userId]);

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = e.target;
        setValues((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: undefined }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!userId) return;

        const found = validate(values);
        setErrors(found);
        if (Object.keys(found).length > 0) {
            toast.error("Please fix the highlighted fields.");
            return;
        }

        setSubmitting(true);
        try {
            // Fresh JWT for the Express backend
            const { data: tokenData } = await authClient.token();
            if (!tokenData?.token) {
                throw new Error("Your session has expired. Please sign in again.");
            }

            const res = await fetch(
                `${API_URL}/events/${encodeURIComponent(id)}?organizerId=${encodeURIComponent(userId)}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${tokenData.token}`,
                    },
                    body: JSON.stringify({
                        title: values.title.trim(),
                        type: values.type,
                        date: values.date,
                        location: values.location.trim(),
                        thumbnail: values.thumbnail.trim(),
                        description: values.description.trim(),
                    }),
                }
            );

            if (!res.ok) {
                const body = await res.json().catch(() => null);
                throw new Error(body?.message ?? "Could not update the event.");
            }

            toast.success("Event updated!");
            router.push("/events/manage");
            router.refresh();
        } catch (err) {
            toast.error(err instanceof Error ? err.message : "Something went wrong.");
        } finally {
            setSubmitting(false);
        }
    };

    /* ----- Waiting for the session or the event ----- */
    if (sessionPending || (userId && loadState === "loading")) {
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

    /* ----- Logged out ----- */
    if (!userId) {
        return (
            <div className="rounded-2xl border border-border bg-card p-8 text-center sm:p-10">
                <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                    Sign in to edit your event
                </h1>
                <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
                    Only the organizer can change an event.
                </p>
                <Link href="/signin" className={`mt-6 ${primaryButtonClass}`}>
                    Login
                </Link>
            </div>
        );
    }

    /* ----- Load problems ----- */
    if (loadState === "missing") {
        return (
            <StateCard
                icon={SearchX}
                title="Event not found"
                description="This event doesn't exist or may have been removed."
            />
        );
    }

    if (loadState === "forbidden") {
        return (
            <StateCard
                icon={ShieldAlert}
                title="You can't edit this event"
                description="Only the organizer who created this event can change it."
            />
        );
    }

    if (loadState === "error") {
        return (
            <StateCard
                icon={TriangleAlert}
                title="Couldn't load this event"
                description="Something went wrong while contacting the server. Please try again."
            />
        );
    }

    /* ----- Form ----- */
    return (
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                <SquarePen aria-hidden="true" className="size-3.5" />
                Organizer Dashboard
            </span>

            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground">
                Edit Your Event
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Update the details of your drive. Changes appear for everyone right away.
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
                >
                    <input
                        id="thumbnail"
                        name="thumbnail"
                        type="url"
                        value={values.thumbnail}
                        onChange={handleChange}
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
                        aria-invalid={!!errors.description}
                        aria-describedby={errors.description ? "description-error" : undefined}
                        className={`${controlBase} resize-y px-4 leading-6 ${controlState(!!errors.description)}`}
                    />
                </Field>

                {/* Actions */}
                <div className="flex flex-col gap-3 sm:flex-row">
                    <Link
                        href="/events/manage"
                        className="inline-flex flex-1 items-center justify-center rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition hover:bg-muted active:scale-95"
                    >
                        Cancel
                    </Link>

                    <button
                        type="submit"
                        disabled={submitting}
                        className={`${primaryButtonClass} flex-1 disabled:cursor-not-allowed disabled:opacity-60`}
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
                </div>
            </form>
        </div>
    );
};

export default EditEventForm;