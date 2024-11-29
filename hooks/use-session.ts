import { getSessionClient, logoutClient } from "@/lib/user-session";
import { Session } from "@/types/session";
import { useState, useEffect } from "react";

export function useSession() {
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSession = async () => {
            try {
                const sessionData = await getSessionClient();
                setSession(sessionData);
            } catch (err) {
                setError("Failed to fetch session.");
            } finally {
                setLoading(false);
            }
        };

        fetchSession();
    }, []); // Only run once on mount

    return { session, loading, error };
}

export function useLogout() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const logout = async () => {
        setLoading(true);
        setError(null);

        const success = await logoutClient();

        if (success) {
        } else {
            setError("Failed to log out.");
        }

        setLoading(false);
    };

    return { logout, loading, error };
}
