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

interface HomeProps extends SSRConfig {
  posts: Post[];
}

const options = {
  includeMatches: true,
  matchAllOnEmptyQuery: true,
  threshold: 0.4,
  keys: ["frontMatter.title", "frontMatter.excerpt"],
};

export default function Home({ posts }: HomeProps) {
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

  return (
    <Container>
      <Head title="Bruno Frigeri" description={t("description")} />
      <div>
        <div className="inline-block pb-8">
          <h1 className="text-black dark:text-white">{t("title")}</h1>
          <h4 className="font-light my-2 mb-8 text-descriptionLight dark:text-descriptionDark">
            {t("description")}
          </h4>
          <Button
            target="_blank"
            rel="noreferrer noopener"
            onClick={onEmailSentPress}
          >
            {t("schedule")}
          </Button>
        </div>
        <div className="flex flex-col">
          <div>
            <h1 className="text-black dark:text-white">{t("blogTitle")}</h1>
            <h4 className="my-2 mb-8 text-descriptionLight dark:text-descriptionDark">
              {t("blogDescription", { numberOfPosts: posts.length })}
            </h4>
          </div>
          <Search value={search} setValue={setSearch} />

          <Posts
            title={t("allWriting")}
            posts={filteredPosts}
            hasButton={false}
          />
        </div>
      </div>
    </Container>
  );
}

export const getStaticProps = async ({ locale }) => {
  const posts = getAllPosts(locale);

  return {
    props: {
      posts,
      ...(await serverSideTranslations(locale, ["common", "home"])),
    },
  };
};
