import Button from "../components/Button";
import Container from "../containers/Container";
import React, { useState } from "react";
import { getAllPosts } from "../lib/posts";
import Posts from "../components/Posts";
import Fuse from "fuse.js";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";
import Search from "../components/Search";
import { SSRConfig } from "next-i18next";
import { Post } from "../lib/types";
import Head from "../containers/Head";
import { getYearsOfExperience } from "../helpers/dates";
import { SITE_DESCRIPTION, SITE_TITLE } from "../constants/site";
import { homeJsonLd } from "../lib/seo";

interface HomeProps extends SSRConfig {
  posts: Post[];
  years: number;
}

const options = {
  includeMatches: true,
  matchAllOnEmptyQuery: true,
  threshold: 0.4,
  keys: ["frontMatter.title", "frontMatter.excerpt"],
};

export default function Home({ posts, years }: HomeProps) {
  const onEmailSentPress = () => {
    const email = "bpiraja97@gmail.com";

    window.location.href = `mailto:${email}`;
  };

  const { t } = useTranslation("home");

  const [search, setSearch] = useState<string>("");

  const getFilteredPosts = (search: string) => {
    const fuse = new Fuse(posts, options);
    const postsFound = fuse.search(search);

    return postsFound.length > 0 ? postsFound.map((post) => post.item) : [];
  };

  const filteredPosts = search.length > 0 ? getFilteredPosts(search) : posts;

  const description = t("description", { years });

  return (
    <Container>
      <Head
        title={SITE_TITLE}
        description={SITE_DESCRIPTION}
        jsonLd={homeJsonLd()}
      />
      <section className="border-t-[3px] border-ink pt-12 md:pt-[clamp(48px,7vw,96px)] pb-16 md:pb-[clamp(64px,9vw,120px)] flex flex-col gap-12">
        <h1 className="m-0 font-bold text-[52px] md:text-[clamp(52px,10.5vw,150px)] leading-[0.92] tracking-[-0.045em] [text-wrap:balance]">
          <span className="block">{t("title")}</span>
          <span className="highlight">
            {t("titleHighlight")}
          </span>
        </h1>
        <div className="flex flex-wrap items-center justify-between gap-x-12 gap-y-8">
          <p className="m-0 flex-[1_1_360px] max-w-[560px] text-[20px] md:text-[clamp(19px,2vw,26px)] leading-[1.35] font-normal tracking-[-0.01em] [text-wrap:pretty]">
            {description}
          </p>
          <Button
            onClick={onEmailSentPress}
            className="w-full md:w-auto"
          >
            {t("schedule")}
          </Button>
        </div>
      </section>

      <section
        id="writing"
        className="border-t-[3px] border-ink pt-8 md:pt-[clamp(32px,5vw,64px)] pb-14 md:pb-[clamp(56px,8vw,112px)] flex flex-col gap-12"
      >
        <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-5">
          <h2 className="m-0 font-bold text-[44px] md:text-[clamp(44px,6vw,84px)] leading-[0.95] tracking-[-0.04em]">
            {t("blogTitle")}
          </h2>
          <p className="m-0 max-w-[420px] text-[17px] leading-[1.5] font-normal text-muted [text-wrap:pretty]">
            {t("blogDescription", { numberOfPosts: posts.length })}
          </p>
        </div>
        <div className="flex flex-col gap-6">
          <Search value={search} setValue={setSearch} />
          <Posts title={t("allWriting")} posts={filteredPosts} />
        </div>
      </section>
    </Container>
  );
}

export const getStaticProps = async ({ locale }) => {
  const posts = getAllPosts(locale);

  return {
    props: {
      posts,
      years: getYearsOfExperience(),
      ...(await serverSideTranslations(locale, ["common", "home"])),
    },
  };
};
