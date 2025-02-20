'use client';
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const LogoutPage = () => {
    const router = useRouter();
    useEffect(() => {

        setTimeout(() => router.push("/"), 2000);
    }, [router]);

};

export default LogoutPage;