"use client";
import React from "react";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "@/components/theme-provider";

export const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
        >
            <RecoilRoot>{children}</RecoilRoot>
        </ThemeProvider>
    );
};
