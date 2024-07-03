import { format } from "date-fns";
import { type ClassValue, clsx} from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function formatDate(date: Date): string {
    return format(new Date(date), "MMMM do, yyyy HH:mm");
}