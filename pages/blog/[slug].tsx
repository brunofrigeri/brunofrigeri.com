import { getAllPosts, getAllPostSlugs, getPostBySlug } from "../../lib/posts";
import Container from "../../containers/Container";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import markdownToHtml from "../../lib/markdown";
import Article from "../../components/Article";
import { Post } from "../../lib/types";
import Head from "../../containers/Head";
import { useFirebaseRTDB } from "../../hooks/useFirebaseRTDB";
import { useEffect } from "react";
import { mutate } from "swr";
import Posts from "../../components/Posts";
import { blogPostingJsonLd } from "../../lib/seo";

interface BlogBySlugProps {
  source: string;
  post: Post;
  related: Post[];
}

const BlogBySlug: React.FC<BlogBySlugProps> = ({ source, post, related }) => {
  const { increaseSlugView } = useFirebaseRTDB();
  const { frontMatter } = post;
  const { slug, locale } = frontMatter;

  useEffect(() => {
    // Record the view once per post, then show the confirmed total.
    increaseSlugView(slug, locale)
      .then((data) =>
        mutate(`/api/views/${slug}?locale=${locale}`, data, false)
      )
      .catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug, locale]);

  const ogImage = `/og/${slug}.png`;
  const publishedTime = new Date(post.date).toISOString();

  return (
    <Container>
      <Head
        title={frontMatter.title}
        description={frontMatter.excerpt}
        image={ogImage}
        type="article"
        publishedTime={publishedTime}
        tags={frontMatter.tags}
        noindex={Boolean(post.draft)}
        jsonLd={blogPostingJsonLd({
          slug,
          title: frontMatter.title,
          description: frontMatter.excerpt,
          datePublished: publishedTime,
          image: ogImage,
          tags: frontMatter.tags,
        })}
      />
      <Article
        frontMatter={frontMatter}
        content={source}
        readingTime={post.readingTime}
      />
      {related.length > 0 && (
        <section className="border-t-[3px] border-ink pt-8 md:pt-[clamp(32px,5vw,64px)] pb-14 md:pb-[clamp(56px,8vw,112px)]">
          <Posts title="Keep reading" posts={related} />
        </section>
      )}
    </Container>
  );
};

export default BlogBySlug;

export async function getStaticPaths() {
  const paths = getAllPostSlugs();

  if (!paths)
    return {
      paths: [],
      fallback: false,
    };

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params, locale }) {
  const data: Post = await getPostBySlug(params.slug);
  const source = await markdownToHtml(data.content);

  const related = getAllPosts(locale)
    .filter((post) => post.frontMatter.slug !== params.slug)
    .slice(0, 2)
    // Cards only need metadata; leave the body out of the page data.
    .map((post) => ({ ...post, content: "" }));

  return {
    props: {
      post: data,
      source,
      related,
      ...(await serverSideTranslations(locale, ["common", "home"])),
    },
  };
}
