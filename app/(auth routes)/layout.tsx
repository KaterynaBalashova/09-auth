"use client";

import { useRouter } from "next/navigation";
import css from "../(private routes)/notes/filter/LayoutNotes.module.css";
import { useEffect} from "react";

export default function AuthRoutesLayout({
    children
}: Readonly<{
  children: React.ReactNode;
}>) {
    const router = useRouter();

    useEffect(() => {
        router.refresh();
    }, [router]);

    return (
        <div className={css.container}>
            <div className={css.notesWrapper}>{children}</div>
        </div>
    );
};