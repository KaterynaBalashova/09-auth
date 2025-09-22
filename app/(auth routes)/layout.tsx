
import css from "../(private routes)/notes/filter/LayoutNotes.module.css";

export default function AuthRoutesLayout({
    children
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
        <div className={css.container}>
            <div className={css.notesWrapper}>{children}</div>
        </div>
    )
};