'use client'

import { useRouter as useNextRouter } from 'next/navigation';
import { useCallback } from 'react';

export const useClientRouter = () => {
    const router = useNextRouter();
    return {
        push: useCallback((url: string) => router.push(url), [router]),
        refresh: useCallback(() => router.refresh(), [router]),
    };
};