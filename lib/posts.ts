import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import en from "date-fns/locale/en-US";
import { Post, File } from "./types";

const postDirectory = path.join(process.cwd(), "posts");

export const formatData = (
  data: { [key: string]: any },
  content: string,
  slug: string
): Post => {
  const readingData = readingTime(content);

  const isPtBrLocale = data.locale === "pt-BR";

  const reading = isPtBrLocale
    ? {
        ...readingData,
        text: readingData.text.replace("read", "de leitura"),
      }
    : readingData;

  const formattedDate = format(new Date(data.date), "MMMM dd, yyyy", {
    locale: isPtBrLocale ? ptBR : en,
  });

  return {
    ...data,
    content,
    frontMatter: {
      author: data.author,
      title: data?.title,
      slug,
      tags: data?.stacks ?? [],
      locale: data.locale,
      excerpt: data.excerpt,
      date: formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1),
    },
    featuredImage: data.featuredImage || "",
    readingTime: reading,
  };
};

const readFile = (fileName: string) => {
  const fullPath = path.join(postDirectory, fileName);

  const fileContents = fs.readFileSync(fullPath, "utf8");
  return fileContents;
};

const getFileNames = (locale?: "pt-BR" | "en"): File[] => {
  if (fs.existsSync(postDirectory)) {
    const fileNames = fs.readdirSync(postDirectory);

    return fileNames
      .map((fileName) => {
        const fileContents = readFile(fileName);
        const { data } = matter(fileContents);

        return { fileName, locale: data.locale };
      })
      .filter((file) => file.locale === locale);
  }
};

export const getAllPosts = (locale: string): Post[] => {
  if (fs.existsSync(postDirectory)) {
    const fileNames = getFileNames("en");

    if (fileNames.length === 0) return [];

    const filteredData = fileNames
      .map(({ fileName }) => {
        const slug = fileName.replace(".mdx", "");

        const fileContents = readFile(fileName);
        const { data, content } = matter(fileContents);
        const post = formatData(data, content, slug);

        if (!data?.draft && post.frontMatter.locale === locale) {
          return post;
        }
      })
      .filter(Boolean);

    return filteredData.sort((a, b) => {
      if (new Date(a.frontMatter.date) < new Date(b.frontMatter.date)) {
        return 1;
      } else {
        return -1;
      }
    });
  } else return [];
};

export const getAllPostSlugs = () => {
  if (fs.existsSync(postDirectory)) {
    const fileNames = getFileNames("en");

    const slugs = fileNames.map(({ fileName, locale }) => {
      return {
        params: {
          slug: fileName.replace(".mdx", ""),
        },
        locale,
      };
    });

    return slugs;
  } else {
    return [];
  }
};

export const getPostBySlug = async (slug: string) => {
  const fileContents = readFile(`${slug}.mdx`);
  const { data, content } = matter(fileContents);

  const post = formatData(data, content, slug);

  return {
    slug,
    ...post,
  };
};
