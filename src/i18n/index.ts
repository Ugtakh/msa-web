// i18n.ts
import { cookies } from "next/headers";

export async function getLocaleAndMessages() {
    const cookieLocale = (await cookies()).get("MYNEXTAPP_LOCALE")?.value || "mn";
    const locale = cookieLocale;
    const messages = (await import(`../messages/${locale}.json`)).default;
    return { locale, messages };
}
