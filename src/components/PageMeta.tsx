import { useEffect } from "react";
import { SITE_NAME, SITE_URL, SOCIAL_IMAGE_URL } from "../content/site";

function absoluteUrl(path: string) {
  return new URL(path, SITE_URL).toString();
}

function upsertMeta(selector: string, attributes: Record<string, string>) {
  const existingElement = document.head.querySelector<HTMLMetaElement>(selector);
  const element = existingElement ?? document.createElement("meta");

  Object.entries(attributes).forEach(([name, value]) => {
    element.setAttribute(name, value);
  });

  if (!existingElement) {
    document.head.appendChild(element);
  }
}

function upsertLink(selector: string, attributes: Record<string, string>) {
  const existingElement = document.head.querySelector<HTMLLinkElement>(selector);
  const element = existingElement ?? document.createElement("link");

  Object.entries(attributes).forEach(([name, value]) => {
    element.setAttribute(name, value);
  });

  if (!existingElement) {
    document.head.appendChild(element);
  }
}

export function PageMeta({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}) {
  useEffect(() => {
    const canonicalUrl = absoluteUrl(path);

    document.title = title;
    upsertLink('link[rel="canonical"]', { rel: "canonical", href: canonicalUrl });
    upsertMeta('meta[name="description"]', { name: "description", content: description });
    upsertMeta('meta[property="og:title"]', { property: "og:title", content: title });
    upsertMeta('meta[property="og:description"]', {
      property: "og:description",
      content: description,
    });
    upsertMeta('meta[property="og:url"]', { property: "og:url", content: canonicalUrl });
    upsertMeta('meta[property="og:site_name"]', { property: "og:site_name", content: SITE_NAME });
    upsertMeta('meta[property="og:image"]', { property: "og:image", content: SOCIAL_IMAGE_URL });
    upsertMeta('meta[name="twitter:title"]', { name: "twitter:title", content: title });
    upsertMeta('meta[name="twitter:description"]', {
      name: "twitter:description",
      content: description,
    });
    upsertMeta('meta[name="twitter:image"]', { name: "twitter:image", content: SOCIAL_IMAGE_URL });
  }, [description, path, title]);

  return null;
}

