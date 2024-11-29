import { Session } from "@/types/session";
import axiosInstance from "./axios";

export async function getSessionClient(): Promise<Session> {
    return (await axiosInstance.get("/auth/get-session")).data;
}

export async function logoutClient() {
    try {
        // Send a POST request to the logout endpoint to clear the session server-side
        await axiosInstance.post("/auth/logout");

        // Optionally, you can return true/false to indicate success/failure
        return true;
    } catch (error) {
        console.error("Logout failed:", error);
        return false;
    }
}
