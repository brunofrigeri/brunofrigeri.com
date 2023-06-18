import React, { PropsWithChildren, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import images from "../public/assets/images";
import { useRouter } from "next/dist/client/router";
import { useTheme } from "next-themes";
import { useTranslation } from "react-i18next";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../tailwind.config.js";
import { Config } from "tailwindcss/types/config";
import ThemeButton from "../components/ThemeButton";

type MenuOption = {
  name: string;
  path: string;
};

export default function Container({ children }: PropsWithChildren) {
  const currentYear = new Date().getFullYear();
  const router = useRouter();
  const [mounted, setMounted] = useState<boolean>(false);
  const { theme, setTheme } = useTheme();
  const fullConfig = resolveConfig(tailwindConfig as Config);

  const { t } = useTranslation("common");

  const menuOptions: Array<MenuOption> = [
    {
      name: t("home"),
      path: "/",
    },
    {
      name: t("about"),
      path: "/about",
    },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      id="container"
      className="flex flex-col min-h-screen transition-colors bg-white dark:bg-black"
    >
      <nav className="max-w-4xl flex flex-row justify-between bg-white transition-colors dark:bg-black mx-auto items-center w-full my-8">
        <Link href="/" className="cursor-pointer flex flex-row items-center">
          <Image
            className="rounded-full"
            src={images.avatar.src}
            alt="BF"
            priority
            height={48}
            width={48}
          />
          <div id="avatar-description" className="flex flex-col px-4">
            <h2 className="text-lg text-black dark:text-white">
              Bruno Frigeri
            </h2>
            <p className="text-descriptionLight dark:text-descriptionDark">
              {t("description")}
            </p>
          </div>
        </Link>
        <div className="flex items-center">
          {menuOptions?.length &&
            menuOptions.map((option) => {
              const isCurrentOption = router.pathname === option.path;

              return (
                <div
                  key={option.path}
                  className="rounded hover:bg-gray-100 hover:dark:bg-gray-600 transition-all px-2 py-1 mx-2"
                >
                  <Link
                    href={option.path}
                    className={`md:text-base text-black dark:text-white ${
                      isCurrentOption ? "font-bold" : "opacity-70"
                    }`}
                  >
                    {option.name}
                  </Link>
                </div>
              );
            })}
          <ThemeButton
            theme={theme}
            setTheme={setTheme}
            lightColor={fullConfig.theme.colors["toggleDark"]}
            darkColor={fullConfig.theme.colors["toggleLight"]}
            mounted={mounted}
          />
        </div>
      </nav>
      <main className="flex-grow transition-colors mx-auto max-w-3xl bg-white dark:bg-black">
        {children}
      </main>
      <footer className="max-w-4xl flex flex-row justify-between text-black dark:text-white mx-auto items-center w-full my-8">
        <span className="md:text-sm">
          © {currentYear}. {t("madeBy")}&nbsp;
          <span className="md:text-sm text-primaryLight dark:text-primaryDark">
            {t("me")}.
          </span>
        </span>
      </footer>
    </div>
  );
}
