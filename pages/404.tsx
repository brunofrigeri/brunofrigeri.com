import Link from "next/link";
import Container from "../containers/Container";
import Head from "../containers/Head";

export default function Custom404() {
  return (
    <Container>
      <Head
        title="Page not found – Bruno Frigeri"
        description="This page doesn't exist."
        noindex
      />
      <section className="border-t-[3px] border-ink pt-12 md:pt-[clamp(48px,7vw,96px)] pb-16 md:pb-[clamp(64px,9vw,120px)] flex flex-col gap-8">
        <h1 className="m-0 font-bold text-[52px] md:text-[clamp(52px,10.5vw,150px)] leading-[0.92] tracking-[-0.045em]">
          404
          <span className="highlight block w-fit">Not found.</span>
        </h1>
        <p className="m-0 max-w-[560px] text-[20px] leading-[1.35] tracking-[-0.01em]">
          That page doesn&apos;t exist or has moved.{" "}
          <Link href="/" className="underline underline-offset-4">
            Head back home
          </Link>{" "}
          or read the latest writing.
        </p>
      </section>
    </Container>
  );
}
