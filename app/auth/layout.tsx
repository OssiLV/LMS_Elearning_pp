import React from "react";

export default function layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex justify-center items-center min-h-screen">
            {children}
        </div>
    );
}
