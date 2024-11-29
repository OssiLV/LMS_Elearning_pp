"use client";

import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import Link from "next/link";
import { AlignJustify, LogOut } from "lucide-react";
import { useLogout, useSession } from "@/hooks/use-session";
import { Session } from "@/types/session";
import { getInitials, maskEmail } from "@/lib/ext";
interface HeaderProps {
    session: Session | null;
}

export default function Home() {
    const { session } = useSession();

    return (
        <div className="flex-col min-h-screen">
            <Header session={session} />
            <Body />
            <Footer />
        </div>
    );
}

function Header({ session }: HeaderProps) {
    const { logout, loading } = useLogout();
    const isMobile = useIsMobile();
    const navItems = [
        { title: "Test 1", url: "" },
        { title: "Test 2", url: "" },
        { title: "Test 3", url: "" },
    ];
    function handleLogout() {
        logout();
        if (!loading) {
            window.location.assign("/");
        }
    }
    console.log(isMobile);

    return (
        <div
            className={cn(
                "flex border h-16 items-center px-4 transition-all sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:border-border",
            )}
        >
            {/* Title */}
            {!isMobile ? (
                <div className="flex justify-center w-20">
                    <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0 ">
                        LMS
                    </h2>
                </div>
            ) : (
                ""
            )}
            {/* Navs group */}
            {isMobile ? (
                <div className="flex-1 justify-items-center">
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <AlignJustify />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuLabel>LMS</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            {navItems.map((item) => (
                                <DropdownMenuItem key={item.title}>
                                    <Link href={item.url}>{item.title}</Link>
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            ) : (
                <div className="flex flex-1 sm:px-24 justify-center">
                    {navItems.map((item) => (
                        <Button
                            key={item.title}
                            className="mx-2"
                            variant={"link"}
                        >
                            {item.title}
                        </Button>
                    ))}
                </div>
            )}

            {/* Action button */}
            <div className="flex justify-center w-20">
                {session?.user ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Avatar className="cursor-pointer">
                                <AvatarImage
                                    // src="https://github.com/shadcn.png"
                                    alt="avt"
                                />
                                <AvatarFallback>
                                    {getInitials(session.user.name)}
                                </AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-44">
                            <DropdownMenuLabel>
                                {maskEmail(session.user.email)}
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Profile</DropdownMenuItem>

                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={handleLogout}
                                disabled={loading}
                            >
                                <LogOut />
                                {loading ? (
                                    "Logging out..."
                                ) : (
                                    <span>Log out</span>
                                )}
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : (
                    <Button variant="outline">
                        <Link href="/auth">Sign In</Link>
                    </Button>
                )}
            </div>
        </div>
    );
}

function Body() {
    return <div className="flex p-4 h-[200vh]">body</div>;
}
function Footer() {
    return <div className="flex">footer</div>;
}
