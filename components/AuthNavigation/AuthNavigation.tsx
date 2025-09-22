import Link from "next/link";
import css from "./AuthNavigation.module.css";
import { useAuthStore } from "@/lib/store/authStore";
import { logout } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";
import TagsMenu from "../TagsMenu/TagsMenu";

export default function AuthNavigation() {
    const { isAuthenticated, user } = useAuthStore();
    const clearIsAuthenticated = useAuthStore((state) => state.clearIsAuthenticated);
    const router = useRouter();

    const handleLogout = async () => {
        await logout();
        clearIsAuthenticated();
        router.push("/sign-in");
    };
    
    return (
        <div>
            {isAuthenticated ? (
                <ul>
                    <li className={css.navigationItem}>
                        <Link href="/profile" prefetch={false} className={css.navigationLink}>
                            Profile
                        </Link>
                    </li>

                    <li className={css.navigationItem}>
                        <p className={css.userEmail}>{ user?.email}</p>
                        <button className={css.logoutButton} onClick={handleLogout}>
                            Logout
                        </button>
                    </li>
                    <TagsMenu/>
                </ul>
            ) : (
                <ul>
                    <li className={css.navigationItem}>
                        <Link href="/sign-in" prefetch={false} className={css.navigationLink}>
                            Login
                        </Link>
                    </li>

                    <li className={css.navigationItem}>
                        <Link href="/sign-up" prefetch={false} className={css.navigationLink}>
                            Sign up
                        </Link>
                    </li>
                </ul>
            )}
        </div>
    );
};
