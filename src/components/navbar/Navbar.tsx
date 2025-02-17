import Link from "next/link";
import { Frame } from "lucide-react";

export default function Navbar() {
    return (
        <header className="border-b border-border">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <Link href="/" className="flex items-center space-x-2">
                    <Frame className="w-6 h-6 text-blue-500" />
                    <span className="text-lg font-semibold">CarShare</span>
                </Link>
                <nav className="space-x-4 text-sm">
                    <Link href="#" className="hover:text-blue-500 transition-colors">
                        How It Works
                    </Link>
                    <Link href="#" className="hover:text-blue-500 transition-colors">
                        List Your Car
                    </Link>
                    <Link href="/login" className="hover:text-blue-500 transition-colors">
                        Sign In
                    </Link>
                </nav>
            </div>
        </header>
    )
}