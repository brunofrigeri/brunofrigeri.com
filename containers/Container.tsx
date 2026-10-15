import React, { PropsWithChildren } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

type MenuOption = {
  name: string;
  path: string;
};

export default function Container({ children }: PropsWithChildren) {
  const currentYear = new Date().getFullYear();
  const router = useRouter();
  const { t } = useTranslation("common");

  const menuOptions: Array<MenuOption> = [
    { name: t("home"), path: "/" },
    { name: t("about"), path: "/about" },
  ];

  return (
    <div
      id="container"
      className="flex flex-col min-h-screen bg-paper text-ink font-custom"
    >
      <header className="w-full max-w-[1280px] mx-auto box-border px-6 md:px-[clamp(24px,4vw,48px)] py-5 md:py-7 flex flex-wrap items-center justify-between gap-3 md:gap-4">
        <Link href="/" className="flex items-center gap-3 md:gap-[14px]">
          <span
            aria-hidden="true"
            className="w-11 h-11 bg-ink text-paper flex items-center justify-center text-[17px] font-bold tracking-[-0.03em]"
          >
            BF
          </span>
          <span className="flex flex-col gap-px">
            <span className="text-base font-bold tracking-[-0.01em]">
              Bruno Frigeri
            </span>
            <span className="text-[13px] text-muted">{t("description")}</span>
          </span>
        </Link>
        <nav
          aria-label="Main"
          className="flex items-center gap-1 md:gap-4 text-base font-medium"
        >
          {menuOptions.map((option) => {
            const isCurrentOption = router.pathname === option.path;

            return (
              <Link
                key={option.path}
                href={option.path}
                className="min-h-[44px] box-border flex items-center"
                aria-current={isCurrentOption ? "page" : undefined}
              >
                <span
                  className={`px-2 py-[3px] border-b-2 border-transparent hover:border-ink ${
                    isCurrentOption ? "bg-accent text-onAccent" : ""
                  }`}
                >
                  {option.name}
                </span>
              </Link>
            );
          })}
        </nav>
      </header>
      <main className="flex-1 w-full max-w-[1280px] mx-auto box-border px-6 md:px-[clamp(24px,4vw,48px)] flex flex-col">
        {children}
      </main>
      <footer className="w-full max-w-[1280px] mx-auto box-border px-6 md:px-[clamp(24px,4vw,48px)] pt-5 md:pt-6 pb-10 md:pb-12 border-t border-ink font-mono text-xs font-normal text-muted">
        © {currentYear}. {t("madeBy")} {t("me")}.
      </footer>
    </div>
  );
}
