import { getAllPostSlugs, getPostBySlug } from "../../lib/posts";
import Container from "../../containers/Container";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import markdownToHtml from "../../lib/markdown";
import Article from "../../components/Article";
import { Post } from "../../lib/types";
import Head from "../../containers/Head";
import { useFirebaseRTDB } from "../../hooks/useFirebaseRTDB";
import { useEffect } from "react";

interface BlogBySlugProps {
  source: string;
  post: Post;
}

const BlogBySlug: React.FC<BlogBySlugProps> = ({ source, post }) => {
  const { increaseSlugView } = useFirebaseRTDB();
  const { frontMatter } = post;

  useEffect(() => {
    const { slug, locale } = frontMatter;
    increaseSlugView(slug, locale);
  }, [frontMatter, increaseSlugView]);

  return (
    <Container>
      <Head title={frontMatter.title} description={frontMatter.excerpt} />
      <Article frontMatter={frontMatter} content={source} />
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

  return {
    props: {
      post: data,
      source,
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}
