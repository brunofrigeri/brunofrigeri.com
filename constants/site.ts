export const SITE_URL = "https://www.brunofrigeri.com";
export const SITE_NAME = "Bruno Frigeri";
export const SITE_TITLE = "Bruno Frigeri – Senior Software Engineer";
export const SITE_DESCRIPTION =
  "Senior software engineer writing about React, React Native, TypeScript, frontend architecture and AI agents. Currently owning sign-in and account flows at Coinbase.";
export const DEFAULT_OG_IMAGE = "/og/default.png";
export const OG_IMAGE_SIZE = { width: 1200, height: 630 };

export const absoluteUrl = (pathname = "/") =>
  `${SITE_URL}${pathname.startsWith("/") ? pathname : `/${pathname}`}`;
