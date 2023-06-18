import React from "react";
import Container from "../containers/Container";
import Button from "../components/Button";
import { useTranslation } from "react-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "../containers/Head";

export default function About() {
  const onEmailSentPress = () => {
    const email = "bpiraja97@gmail.com";

    window.location.href = `mailto:${email}`;
  };

  const { t } = useTranslation("about");

  return (
    <Container>
      <Head title="Bruno Frigeri" description={t("intro_description")} />
      <div>
        <div>
          <h1 className="text-black dark:text-white">{t("introduction")}</h1>
          <h4 className="font-light whitespace-pre-line my-2 mb-8 text-descriptionLight dark:text-descriptionDark">
            {t("intro_description")}
          </h4>
          <Button
            target="_blank"
            rel="noreferrer noopener"
            onClick={onEmailSentPress}
          >
            {t("schedule")}
          </Button>
        </div>

        <div className="my-8">
          <h1 className="text-black dark:text-white">{t("challenges")}</h1>
          <h4 className="font-light whitespace-pre-line my-2 mb-8 text-descriptionLight dark:text-descriptionDark">
            {t("challenges_answer")}
          </h4>
        </div>
      </div>
    </Container>
  );
}

export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "about"])),
    },
  };
};
