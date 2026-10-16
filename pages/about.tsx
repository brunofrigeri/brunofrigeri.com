import React from "react";
import Container from "../containers/Container";
import Button from "../components/Button";
import { useTranslation } from "react-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "../containers/Head";
import { getAge, getYearsOfExperience } from "../helpers/dates";

interface AboutProps {
  years: number;
  age: number;
}

const TAGS = ["React Native", "React", "TypeScript", "GraphQL", "Relay", "Node.js"];
const CHALLENGES = ["challenge_1", "challenge_2", "challenge_3"];

export default function About({ years, age }: AboutProps) {
  const onEmailSentPress = () => {
    const email = "bpiraja97@gmail.com";

    window.location.href = `mailto:${email}`;
  };

  const { t } = useTranslation("about");
  const lead = t("intro_lead", { years });

  return (
    <Container>
      <Head title="About – Bruno Frigeri" description={lead} />
      <section className="border-t-[3px] border-ink pt-10 md:pt-[clamp(48px,7vw,96px)] pb-12 md:pb-[clamp(56px,8vw,104px)] flex flex-col gap-9 md:gap-[clamp(40px,5vw,72px)]">
        <h1 className="m-0 font-bold text-[64px] md:text-[clamp(52px,10.5vw,150px)] leading-[0.92] tracking-[-0.045em]">
          {t("introduction")}{" "}
          <span className="highlight">
            {t("introductionHighlight")}
          </span>
        </h1>

        <div className="flex flex-wrap gap-x-16 gap-y-10 items-start">
          <div className="w-full md:w-auto md:flex-[0_1_280px] flex md:flex-col items-end md:items-start gap-4 md:gap-1 border-t-[3px] border-ink pt-3.5 md:pt-4">
            <span className="text-[88px] md:text-[clamp(72px,8vw,112px)] font-bold leading-[0.85] md:leading-[0.9] tracking-[-0.05em]">
              {years}
            </span>
            <span className="pb-1 md:pb-0 font-mono text-[13px] tracking-[0.08em] uppercase">
              {t("years_label")}
            </span>
          </div>

          <div className="w-full md:w-auto md:flex-[1_1_440px] min-w-0 max-w-[760px] flex flex-col gap-6 md:gap-7">
            <p className="m-0 text-2xl md:text-[clamp(22px,2.4vw,32px)] leading-[1.25] font-medium tracking-[-0.02em] [text-wrap:pretty]">
              {lead}
            </p>
            <p className="m-0 text-lg md:text-[19px] leading-[1.55] font-normal text-muted [text-wrap:pretty]">
              {t("intro_body", { age })}
            </p>
            <div className="flex flex-wrap gap-2">
              {TAGS.map((tag) => (
                <span
                  key={tag}
                  className="border border-ink px-3.5 py-1.5 font-mono text-[13px]"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex md:pt-2">
              <Button onClick={onEmailSentPress} className="w-full md:w-auto">
                {t("schedule")}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t-[3px] border-ink pt-7 md:pt-[clamp(32px,5vw,64px)] pb-14 md:pb-[clamp(56px,8vw,112px)] flex flex-col gap-8 md:gap-12">
        <h2 className="m-0 max-w-[900px] font-bold text-[38px] md:text-[clamp(36px,5vw,72px)] leading-[0.98] tracking-[-0.04em] [text-wrap:balance]">
          {t("challenges")}
        </h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-6">
          {CHALLENGES.map((key, index) => (
            <div
              key={key}
              className="border-t-[3px] border-ink pt-3.5 md:pt-4 flex flex-col gap-3.5 md:gap-4"
            >
              <span className="self-start bg-accent text-onAccent px-2.5 py-0.5 font-mono text-sm font-medium">
                {String(index + 1).padStart(2, "0")}
              </span>
              <p className="m-0 text-xl md:text-[21px] leading-[1.35] font-medium tracking-[-0.01em] [text-wrap:pretty]">
                {t(key)}
              </p>
            </div>
          ))}
        </div>
      </section>
    </Container>
  );
}

export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      years: getYearsOfExperience(),
      age: getAge(),
      ...(await serverSideTranslations(locale, ["common", "about"])),
    },
  };
};
