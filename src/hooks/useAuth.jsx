import { currentUser } from "@/services/pocketbase";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function useAuth() {
    console.log("checking auth: ", currentUser);
    const router = useRouter();
    useEffect(() => {
        if (!currentUser) {
            router.push("/login");
        }
    }, [currentUser]);
}
