import {
  StrictMode,
  createElement,
  useEffect,
  useRef,
  useState,
  type ComponentType,
  type ElementType,
  type ReactNode,
} from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  ChevronRight,
  GraduationCap,
  Mail,
  MapPin,
  Pause,
  Play,
  Trophy,
} from "lucide-react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import WaveSurfer from "wavesurfer.js";
import {
  Link,
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import type { IconType } from "react-icons";
import { FaLinkedinIn, FaTwitter } from "react-icons/fa";
import {
  SiExpo,
  SiGithub,
  SiPnpm,
  SiPytorch,
  SiSelenium,
  SiTypescript,
} from "react-icons/si";
import { DitherBackground } from "./DitherBackground";
import { musicPeaks } from "./musicPeaks";
import "./style.css";

const SITE_URL = "https://sevi.sh";
const SITE_NAME = "sevi.sh";
const DEFAULT_TITLE = "Severin Hilbert - sevi.sh";
const DEFAULT_DESCRIPTION =
  "Severin Hilbert is a developer in Vienna building AI-native products, privacy-minded tools, and calm software.";
const SOCIAL_IMAGE_URL = `${SITE_URL}/og-image.png`;

type Icon = IconType | ComponentType<{ className?: string }>;
type Tool = { name: string; icon?: Icon; logo?: string; color?: string };
type MusicTrack = {
  id: string;
  title: string;
  artist: string;
  cover: string;
  preview: string;
  query: string;
  appleMusicUrl?: string;
  spotifyUrl?: string;
};

const socials = [
  { label: "GitHub", href: "https://github.com/Sevi-py", icon: SiGithub, color: "#ffffff" },
  { label: "Twitter", href: "https://x.com/evverin", icon: FaTwitter, color: "#1da1f2" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/severin-hilbert/",
    icon: FaLinkedinIn,
    color: "#0a66c2",
  },
];

const tools: Array<Tool> = [
  { name: "Python", logo: "/brand/python.svg" },
  { name: "PyTorch", icon: SiPytorch, color: "#ee4c2c" },
  { name: "Selenium", icon: SiSelenium, color: "#43b02a" },
  { name: "Convex", logo: "/brand/convex.svg" },
  { name: "pnpm", icon: SiPnpm, color: "#f69220" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178c6" },
  { name: "TanStack", logo: "/brand/tanstack.svg" },
  { name: "Coolify", logo: "/brand/coolify.svg" },
  { name: "Expo", icon: SiExpo, color: "#ffffff" },
  { name: "Codex", logo: "/brand/codex.svg" },
];

const musicTrackLibrary: Array<MusicTrack> = [
  {
    id: "camilla-yung-saint-paul",
    title: "Camilla",
    artist: "Yung Saint Paul",
    cover: "/music/covers/camilla-yung-saint-paul.jpg",
    preview: "/music/tracks/camilla-yung-saint-paul.mp3",
    query: "Camilla Yung Saint Paul",
    appleMusicUrl: "https://music.apple.com/us/song/camilla/1810040773",
    spotifyUrl: "https://open.spotify.com/track/4IgsV4j9x88UgXTiYSzMK5",
  },
  {
    id: "don-t-stop-dj-heartstring",
    title: "Don't Stop",
    artist: "DJ Heartstring, southstar",
    cover: "/music/covers/don-t-stop-dj-heartstring.jpg",
    preview: "/music/tracks/don-t-stop-dj-heartstring.mp3",
    query: "Don't Stop DJ Heartstring southstar",
    appleMusicUrl: "https://music.apple.com/at/album/dont-stop/1740492777?i=1740492783",
    spotifyUrl: "https://open.spotify.com/track/3tYYypENWxaS1DKUtcH8S8",
  },
  {
    id: "europatraume-brutalismus-3000",
    title: "Europaträume",
    artist: "Brutalismus 3000",
    cover: "/music/covers/europatraume-brutalismus-3000.jpg",
    preview: "/music/tracks/europatraume-brutalismus-3000.mp3",
    query: "Europaträume Brutalismus 3000",
    appleMusicUrl: "https://music.apple.com/us/song/europatr%C3%A4ume/1755210180",
    spotifyUrl: "https://open.spotify.com/track/0PYX7X0wTBT5WvKzNCWtk2",
  },
  {
    id: "everytime-idemi",
    title: "Everytime",
    artist: "IDEMI, Lustral",
    cover: "/music/covers/everytime-idemi.jpg",
    preview: "/music/tracks/everytime-idemi.mp3",
    query: "Everytime IDEMI Lustral",
    appleMusicUrl: "https://music.apple.com/at/album/everytime/1833936100?i=1833936101",
    spotifyUrl: "https://open.spotify.com/track/5uaHSOou5ernQBKhfVse1f",
  },
  {
    id: "genesis-grimes",
    title: "Genesis",
    artist: "Grimes",
    cover: "/music/covers/genesis-grimes.jpg",
    preview: "/music/tracks/genesis-grimes.mp3",
    query: "Genesis Grimes",
    appleMusicUrl: "https://music.apple.com/at/album/genesis/1544356705?i=1544356709",
    spotifyUrl: "https://open.spotify.com/track/3cjvqsvvU80g7WJPMVh8iq",
  },
  {
    id: "key-to-my-heart-bovski",
    title: "Key To My Heart",
    artist: "BOVSKI",
    cover: "/music/covers/key-to-my-heart-bovski.jpg",
    preview: "/music/tracks/key-to-my-heart-bovski.mp3",
    query: "Key To My Heart BOVSKI",
    appleMusicUrl: "https://music.apple.com/at/album/key-to-my-heart/1869879422?i=1869879423",
    spotifyUrl: "https://open.spotify.com/track/2LEFdBlzEJQRKTjI47oHSS",
  },
  {
    id: "pushe-packs-kev-koko",
    title: "Pushe Packs",
    artist: "Kev Koko, Bauernfeind, Pashanim",
    cover: "/music/covers/pushe-packs-kev-koko.jpg",
    preview: "/music/tracks/pushe-packs-kev-koko.mp3",
    query: "Pushe Packs Kev Koko Bauernfeind Pashanim",
    appleMusicUrl: "https://music.apple.com/us/song/pushe-packs-feat-pashanim/1754345848",
    spotifyUrl: "https://open.spotify.com/track/54f2IdWSfeTb1LxmpvVb0K",
  },
  {
    id: "samurai-schwert-yung-hurn",
    title: "Samurai Schwert",
    artist: "Yung Hurn",
    cover: "/music/covers/samurai-schwert-yung-hurn.jpg",
    preview: "/music/tracks/samurai-schwert-yung-hurn.mp3",
    query: "Samurai Schwert Yung Hurn",
    appleMusicUrl: "https://music.apple.com/at/album/samurai-schwert/1850509856?i=1850509859",
    spotifyUrl: "https://open.spotify.com/track/4W8Nib7ekr4ydmfk0iaBUc",
  },
  {
    id: "shabab-e-s-im-vip-pashanim",
    title: "Shabab(e)s im VIP",
    artist: "Pashanim, Ceren",
    cover: "/music/covers/shabab-e-s-im-vip-pashanim.jpg",
    preview: "/music/tracks/shabab-e-s-im-vip-pashanim.mp3",
    query: "Shabab(e)s im VIP Pashanim Ceren",
    appleMusicUrl: "https://music.apple.com/us/song/shabab-e-s-im-vip/1811097939",
    spotifyUrl: "https://open.spotify.com/track/1JjHQ4lfAjbDq7wmOmH9wM",
  },
  {
    id: "sulk-tr-st",
    title: "Sulk",
    artist: "TR/ST",
    cover: "/music/covers/sulk-tr-st.jpg",
    preview: "/music/tracks/sulk-tr-st.mp3",
    query: "Sulk TR/ST",
    appleMusicUrl: "https://music.apple.com/at/album/sulk/1442350386?i=1442350986",
    spotifyUrl: "https://open.spotify.com/track/1CuNAntYhT2j6LNJoIEfF4",
  },
  {
    id: "sundress-a-ap-rocky",
    title: "Sundress",
    artist: "A$AP Rocky",
    cover: "/music/covers/sundress-a-ap-rocky.jpg",
    preview: "/music/tracks/sundress-a-ap-rocky.mp3",
    query: "Sundress A$AP Rocky",
    appleMusicUrl: "https://music.apple.com/at/album/sundress/1442956429?i=1442956431",
    spotifyUrl: "https://open.spotify.com/track/2aPTvyE09vUCRwVvj0I8WK",
  },
  {
    id: "ten-fred-again",
    title: "ten",
    artist: "Fred again.., Jozzy",
    cover: "/music/covers/ten-fred-again.jpg",
    preview: "/music/tracks/ten-fred-again.mp3",
    query: "ten Fred again.. Jozzy",
    appleMusicUrl: "https://music.apple.com/at/album/ten/1706861926?i=1706861929",
    spotifyUrl: "https://open.spotify.com/track/5QOBT97OmYCZo1W5u7tRrB",
  },
  {
    id: "ufo361-match-3",
    title: "Match 3",
    artist: "Ufo361, lucidbeatz",
    cover: "/music/covers/ufo361-match-3.jpg",
    preview: "/music/tracks/ufo361-match-3.mp3",
    query: "Match 3 Ufo361 lucidbeatz",
    appleMusicUrl: "https://music.apple.com/at/album/match-3/1689023482?i=1689023491",
    spotifyUrl: "https://open.spotify.com/track/4iaDcHWWvPI63bMYpAIHhu",
  },
  {
    id: "vhs-01099",
    title: "VHS",
    artist: "01099, Gustav, Zachi",
    cover: "/music/covers/vhs-01099.jpg",
    preview: "/music/tracks/vhs-01099.mp3",
    query: "VHS 01099 Gustav Zachi",
    appleMusicUrl: "https://music.apple.com/ca/song/vhs/1680053088",
    spotifyUrl: "https://open.spotify.com/track/2PE71wHgZG5Z6CLOxPDPe7",
  },
  {
    id: "vanished-crystal-castles",
    title: "Vanished",
    artist: "Crystal Castles",
    cover: "/music/covers/vanished-crystal-castles.jpg",
    preview: "/music/tracks/vanished-crystal-castles.mp3",
    query: "Vanished Crystal Castles",
    appleMusicUrl: "https://music.apple.com/us/song/vanished/1132754196",
    spotifyUrl: "https://open.spotify.com/track/4bQ7mjty0UVlKRalhizpGT",
  },
  {
    id: "get-buck-lugatti",
    title: "get buck",
    artist: "Lugatti, Traya, Lugatti & 9ine",
    cover: "/music/covers/get-buck-lugatti.jpg",
    preview: "/music/tracks/get-buck-lugatti.mp3",
    query: "get buck Lugatti Traya Lugatti & 9ine",
    appleMusicUrl: "https://music.apple.com/us/song/get-buck/1786937788",
    spotifyUrl: "https://open.spotify.com/track/39BYf3aOgW7C9in214a9YF",
  },
];

const musicTrackOrder = [
  "sulk-tr-st",
  "don-t-stop-dj-heartstring",
  "key-to-my-heart-bovski",
  "everytime-idemi",
  "vanished-crystal-castles",
  "genesis-grimes",
  "samurai-schwert-yung-hurn",
  "europatraume-brutalismus-3000",
  "ten-fred-again",
  "vhs-01099",
  "pushe-packs-kev-koko",
  "shabab-e-s-im-vip-pashanim",
  "get-buck-lugatti",
  "camilla-yung-saint-paul",
  "sundress-a-ap-rocky",
  "ufo361-match-3",
];

const musicTracksById = new Map(musicTrackLibrary.map((track) => [track.id, track]));
const musicTracks = musicTrackOrder.map((id) => {
  const track = musicTracksById.get(id);

  if (!track) {
    throw new Error(`Missing music track: ${id}`);
  }

  return track;
});

const timeline = [
  {
    icon: BriefcaseBusiness,
    logo: "/brand/stayvera-symbol.webp",
    date: "Mar 2026 - now",
    role: "Technical Co-Founder",
    org: "Stayvera Inc.",
    text: "Building the product side of an AI-native booking platform for modern group travel: host onboarding, guest flows, property intelligence, and the small details that make trips feel effortless.",
  },
  {
    icon: BriefcaseBusiness,
    logo: "/brand/cloudflight.webp",
    date: "Jul 2025",
    role: "Software Engineering Intern",
    org: "Cloudflight",
    text: "Independently led a research project around machine learning for geographic and time-based event clustering, with a React visualization, local LLM hosting, and LLM-powered event classification.",
  },
  {
    icon: BriefcaseBusiness,
    logo: "/brand/cloudflight.webp",
    date: "Aug 2024",
    role: "Software Engineering Intern",
    org: "Cloudflight",
    text: "Worked on a customer-facing logistics service portal with Angular and Java/Spring, and wrote end-to-end Cypress tests in TypeScript. Youngest intern at Cloudflight, and the only intern not coming from university or a specialized technical school.",
  },
  {
    icon: Trophy,
    logo: "/brand/cloudflight-coding-contest.webp",
    date: "Nov 2025",
    role: "1st place, Cloudflight Coding Contest Vienna",
    org: "41st Classic CCC",
    text: "Won the Vienna site, placed 5th globally among more than 2400 participants, and built custom LLM agents to support contest solutions.",
  },
  {
    icon: GraduationCap,
    logo: "/brand/keimgasse.webp",
    date: "2018 - 2026",
    role: "High school",
    org: "BG/BRG Keimgasse Mödling",
    text: "Completed the Austrian Matura with an average grade of 1.4 (1 is the best in Austria)",
  },
];

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

function PageMeta({
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

function Root() {
  return (
    <div className="min-h-screen bg-black text-white">
      <DitherBackground />
      <Outlet />
    </div>
  );
}

function useLiveAge() {
  const [age, setAge] = useState("18.000000000");

  useEffect(() => {
    const birth = new Date("2008-01-11T09:00:00+01:00").getTime();
    const tropicalYearMs = 365.2425 * 24 * 60 * 60 * 1000;

    const tick = () => {
      setAge(((Date.now() - birth) / tropicalYearMs).toFixed(9));
    };

    tick();
    const interval = window.setInterval(tick, 75);
    return () => window.clearInterval(interval);
  }, []);

  return age;
}

function useStartOnView<T extends HTMLElement>(rootMargin = "0px 0px 18% 0px") {
  const ref = useRef<T | null>(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (hasStarted) {
      return undefined;
    }

    const node = ref.current;
    if (!node) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold: 0.12 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [hasStarted, rootMargin]);

  return [ref, hasStarted] as const;
}

function TypingText({
  text,
  as: Component = "span",
  className,
  delay = 0,
  speed = 22,
  start,
  adaptive = false,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  speed?: number;
  start?: boolean;
  adaptive?: boolean;
}) {
  const shouldReduceMotion = useReducedMotion();
  const [ownRef, ownStart] = useStartOnView<HTMLElement>();
  const isStarted = start ?? ownStart;
  const [visibleCharacters, setVisibleCharacters] = useState(0);

  useEffect(() => {
    if (!isStarted) {
      return undefined;
    }

    if (shouldReduceMotion) {
      setVisibleCharacters(text.length);
      return undefined;
    }

    setVisibleCharacters(0);

    if (adaptive) {
      let frame: number;
      let previousTime = performance.now();
      let previousScrollY = window.scrollY;
      let scrollVelocity = 0;
      let typedCharacters = 0;

      const tick = (time: number) => {
        const delta = Math.max(1, time - previousTime);
        const scrollY = window.scrollY;
        const instantVelocity = Math.abs(scrollY - previousScrollY) / delta;
        const element = ownRef.current;
        const rect = element?.getBoundingClientRect();
        const behindViewportLine = rect
          ? Math.max(0, window.innerHeight * 0.55 - rect.top)
          : 0;

        scrollVelocity = scrollVelocity * 0.72 + instantVelocity * 0.28;
        typedCharacters +=
          (delta / speed) *
          Math.min(3.2, 1 + scrollVelocity * 0.55 + behindViewportLine / 320);

        const nextCharacter = Math.min(text.length, Math.floor(typedCharacters));
        setVisibleCharacters(nextCharacter);

        previousTime = time;
        previousScrollY = scrollY;

        if (nextCharacter < text.length) {
          frame = window.requestAnimationFrame(tick);
        }
      };

      frame = window.requestAnimationFrame(tick);

      return () => window.cancelAnimationFrame(frame);
    }

    let typeTimer: number | undefined;
    const startTimer = window.setTimeout(() => {
      let nextCharacter = 0;
      typeTimer = window.setInterval(() => {
        nextCharacter += 1;
        setVisibleCharacters(nextCharacter);

        if (nextCharacter >= text.length) {
          window.clearInterval(typeTimer);
        }
      }, speed);
    }, delay);

    return () => {
      window.clearTimeout(startTimer);
      if (typeTimer) {
        window.clearInterval(typeTimer);
      }
    };
  }, [adaptive, delay, isStarted, ownRef, shouldReduceMotion, speed, text]);

  return createElement(
    Component,
    {
      ref: ownRef,
      className: `typing-text${visibleCharacters < text.length ? " is-typing" : ""}${
        className ? ` ${className}` : ""
      }`,
    },
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{text.slice(0, visibleCharacters)}</span>
    </>,
  );
}

function ScrollResponsiveArticle({
  children,
  className,
}: {
  children: ReactNode | ((isVisible: boolean) => ReactNode);
  className?: string;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const [hasEntered, setHasEntered] = useState(false);
  const [hasSettled, setHasSettled] = useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 94%", "start 54%"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.86], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [26, 0]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > 0) {
      setHasEntered(true);
    }

    if (latest >= 1) {
      setHasSettled(true);
    }
  });
  const renderedChildren =
    typeof children === "function" ? children(shouldReduceMotion || hasEntered) : children;

  if (shouldReduceMotion) {
    return <article className={className}>{renderedChildren}</article>;
  }

  return (
    <motion.article
      ref={ref}
      layout="position"
      className={className}
      style={hasSettled ? undefined : { opacity, y }}
      animate={hasSettled ? { opacity: 1, y: 0 } : undefined}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.16, ease: "easeOut" }}
    >
      {renderedChildren}
    </motion.article>
  );
}

function TerminalOutput({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const [ref, hasStarted] = useStartOnView<HTMLDivElement>();
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={`terminal-output${className ? ` ${className}` : ""}`}
      initial={{ opacity: 0, y: 10 }}
      animate={hasStarted ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
      transition={{ duration: 0.26, delay: shouldReduceMotion ? 0 : delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

const decryptCharacters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789#%&*+-<>";

function randomDecryptCharacter() {
  return decryptCharacters[Math.floor(Math.random() * decryptCharacters.length)] ?? "#";
}

function DecryptedText({
  text,
  as: Component = "span",
  className,
  delay = 0,
  revealStep = 1,
  interval = 28,
}: {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  revealStep?: number;
  interval?: number;
}) {
  const shouldReduceMotion = useReducedMotion();
  const [ref, hasStarted] = useStartOnView<HTMLElement>();
  const [visibleCharacters, setVisibleCharacters] = useState(0);
  const [scrambledText, setScrambledText] = useState(text);

  useEffect(() => {
    if (!hasStarted) {
      return undefined;
    }

    if (shouldReduceMotion) {
      setVisibleCharacters(text.length);
      setScrambledText(text);
      return undefined;
    }

    setVisibleCharacters(0);
    setScrambledText(
      text
        .split("")
        .map((character) => (character.trim() ? randomDecryptCharacter() : character))
        .join(""),
    );

    let revealTimer: number | undefined;
    const startTimer = window.setTimeout(() => {
      revealTimer = window.setInterval(() => {
        setVisibleCharacters((current) => {
          const next = Math.min(text.length, current + revealStep);

          setScrambledText(
            text
              .split("")
              .map((character, index) => {
                if (index < next || !character.trim()) {
                  return character;
                }

                return randomDecryptCharacter();
              })
              .join(""),
          );

          if (next >= text.length && revealTimer) {
            window.clearInterval(revealTimer);
          }

          return next;
        });
      }, interval);
    }, delay);

    return () => {
      window.clearTimeout(startTimer);
      if (revealTimer) {
        window.clearInterval(revealTimer);
      }
    };
  }, [delay, hasStarted, interval, revealStep, shouldReduceMotion, text]);

  return createElement(
    Component,
    {
      ref,
      className: `decrypted-text${visibleCharacters < text.length ? " is-decrypting" : ""}${
        className ? ` ${className}` : ""
      }`,
    },
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{scrambledText}</span>
    </>,
  );
}

function TypedIntroDescription({ age, delay = 0 }: { age: string; delay?: number }) {
  const prefix = "Developer in Vienna, Austria. Currently ";
  const suffix =
    " years old. I build AI-native products, privacy-minded tools, and calm software.";
  const shouldReduceMotion = useReducedMotion();
  const [ref, hasStarted] = useStartOnView<HTMLParagraphElement>();
  const [visibleCharacters, setVisibleCharacters] = useState(0);
  const totalCharacters = prefix.length + suffix.length;
  const visiblePrefix = prefix.slice(0, Math.min(visibleCharacters, prefix.length));
  const visibleSuffix = suffix.slice(0, Math.max(0, visibleCharacters - prefix.length));
  const showAge = visibleCharacters > prefix.length || shouldReduceMotion;

  useEffect(() => {
    if (!hasStarted) {
      return undefined;
    }

    if (shouldReduceMotion) {
      setVisibleCharacters(totalCharacters);
      return undefined;
    }

    setVisibleCharacters(0);
    let typeTimer: number | undefined;
    const startTimer = window.setTimeout(() => {
      let nextCharacter = 0;
      typeTimer = window.setInterval(() => {
        nextCharacter += 1;
        setVisibleCharacters(nextCharacter);

        if (nextCharacter >= totalCharacters) {
          window.clearInterval(typeTimer);
        }
      }, 8);
    }, delay);

    return () => {
      window.clearTimeout(startTimer);
      if (typeTimer) {
        window.clearInterval(typeTimer);
      }
    };
  }, [delay, hasStarted, shouldReduceMotion, totalCharacters]);

  return (
    <p
      ref={ref}
      className={`intro typing-text${visibleCharacters < totalCharacters ? " is-typing" : ""}`}
    >
      <span className="sr-only">{`${prefix}${age}${suffix}`}</span>
      <span aria-hidden="true">
        {visiblePrefix}
        {showAge ? <span className="age">{age}</span> : null}
        {visibleSuffix}
      </span>
    </p>
  );
}

function ShellLine({ command, delay = 0 }: { command: string; delay?: number }) {
  const [ref, hasStarted] = useStartOnView<HTMLDivElement>();

  return (
    <div className="shell-line" ref={ref}>
      <span>sevi@sevi.sh</span>
      <span className="muted">~</span>
      <span className="muted">$</span>
      <TypingText text={command} start={hasStarted} delay={delay} speed={28} />
    </div>
  );
}

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds)) {
    return "0:00";
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${remainingSeconds}`;
}

function musicUrl(service: "apple" | "spotify", query: string) {
  const encodedQuery = encodeURIComponent(query);
  return service === "apple"
    ? `https://music.apple.com/search?term=${encodedQuery}`
    : `https://open.spotify.com/search/${encodedQuery}`;
}

function MusicTrackRow({
  track,
  index,
  activeTrackId,
  setActiveTrackId,
}: {
  track: MusicTrack;
  index: number;
  activeTrackId: string | null;
  setActiveTrackId: (id: string | null) => void;
}) {
  const waveformRef = useRef<HTMLDivElement | null>(null);
  const playerRef = useRef<WaveSurfer | null>(null);
  const sourceLoadRef = useRef<Promise<void> | null>(null);
  const hasLoadedSourceRef = useRef(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const peakData = musicPeaks[track.id];
  const [duration, setDuration] = useState(peakData?.duration ?? 0);
  const isActive = activeTrackId === track.id;

  useEffect(() => {
    if (!waveformRef.current) {
      return undefined;
    }

    const media = new Audio();
    media.preload = "none";

    const player = WaveSurfer.create({
      container: waveformRef.current,
      duration: peakData?.duration,
      height: 42,
      barWidth: 2,
      barGap: 2,
      barRadius: 2,
      barMinHeight: 2,
      cursorColor: "#d9f99d",
      cursorWidth: 1,
      dragToSeek: true,
      hideScrollbar: true,
      interact: true,
      media,
      normalize: true,
      peaks: peakData?.peaks,
      progressColor: "#d9f99d",
      sampleRate: 8000,
      waveColor: "#3f3f46",
    });

    playerRef.current = player;
    setIsReady(true);

    const handlePlayError = (error: unknown) => {
      console.error(`Could not play preview for ${track.title}`, error);
      setIsPlaying(false);
      setActiveTrackId(null);
    };

    player.on("ready", (loadedDuration) => {
      setDuration(loadedDuration);
      setIsReady(true);
    });
    player.on("play", () => {
      setIsPlaying(true);
      setActiveTrackId(track.id);
    });
    player.on("pause", () => setIsPlaying(false));
    player.on("finish", () => {
      setIsPlaying(false);
      setCurrentTime(0);
      player.setTime(0);
      setActiveTrackId(null);
    });
    player.on("timeupdate", (time) => setCurrentTime(time));
    player.on("interaction", () => {
      setActiveTrackId(track.id);
      if (!player.isPlaying()) {
        void playTrack().catch(handlePlayError);
      }
    });
    player.on("error", (error) => {
      console.error(`Could not load preview for ${track.title}`, error);
      setIsReady(false);
    });

    return () => {
      player.destroy();
      playerRef.current = null;
      sourceLoadRef.current = null;
      hasLoadedSourceRef.current = false;
    };
  }, [peakData?.duration, peakData?.peaks, setActiveTrackId, track.id, track.preview, track.title]);

  useEffect(() => {
    if (!isActive && playerRef.current?.isPlaying()) {
      playerRef.current.pause();
    }
  }, [isActive]);

  const ensureSource = async () => {
    const player = playerRef.current;
    if (!player) {
      throw new Error("Track player is not ready yet");
    }

    if (hasLoadedSourceRef.current) {
      return;
    }

    if (!sourceLoadRef.current) {
      sourceLoadRef.current = player
        .load(track.preview, peakData?.peaks, peakData?.duration)
        .then(() => {
          hasLoadedSourceRef.current = true;
        })
        .finally(() => {
          sourceLoadRef.current = null;
        });
    }

    await sourceLoadRef.current;
  };

  const playTrack = async () => {
    await ensureSource();
    await playerRef.current?.play();
  };

  const togglePlayback = () => {
    const player = playerRef.current;
    if (!player || !isReady) {
      return;
    }

    if (player.isPlaying()) {
      player.pause();
      setActiveTrackId(null);
    } else {
      setActiveTrackId(track.id);
      void playTrack().catch((error) => {
        console.error(`Could not play preview for ${track.title}`, error);
        setIsPlaying(false);
        setActiveTrackId(null);
      });
    }
  };

  return (
    <ScrollResponsiveArticle className={`music-track${isActive ? " is-active" : ""}`}>
      <div className="music-row-command">
        <span className="music-index">{String(index + 1).padStart(2, "0")}</span>
        <span className="terminal-arrow">&gt;</span>
      </div>
      <div className="music-cover-wrap">
        <img
          src={track.cover}
          alt={`${track.title} cover`}
          className="music-cover"
          loading="lazy"
          decoding="async"
        />
        <button
          type="button"
          className="music-play"
          onClick={togglePlayback}
          disabled={!isReady}
          aria-label={isPlaying ? `Pause ${track.title}` : `Play ${track.title}`}
        >
          {isPlaying ? <Pause className="size-4" /> : <Play className="size-4" />}
        </button>
      </div>
      <div className="music-main">
        <div className="music-heading">
          <div>
            <h3>
              <span className="music-command-name">play</span> {track.title}
            </h3>
            <p>--artist="{track.artist}"</p>
          </div>
          <span className="music-status">{isPlaying ? "streaming" : "ready"}</span>
        </div>
        <div
          className="music-waveform"
          ref={waveformRef}
          aria-label={`${track.title} preview waveform`}
        />
        <div className="music-footer">
          <span className="music-time">
            time {formatTime(currentTime)} / {formatTime(duration)}
          </span>
          <div className="music-services">
            <a
              href={track.appleMusicUrl ?? musicUrl("apple", track.query)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Listen to ${track.title} on Apple Music`}
              className="music-service apple"
            >
              <img
                src="/brand/apple-music-icon.png"
                alt="Apple Music"
                loading="lazy"
                decoding="async"
              />
            </a>
            <a
              href={track.spotifyUrl ?? musicUrl("spotify", track.query)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Listen to ${track.title} on Spotify`}
              className="music-service spotify"
            >
              <img
                src="/brand/spotify-icon.png"
                alt="Spotify"
                loading="lazy"
                decoding="async"
              />
            </a>
          </div>
        </div>
      </div>
    </ScrollResponsiveArticle>
  );
}

function IntroSection() {
  const age = useLiveAge();

  return (
    <section className="hero">
      <div className="page">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <ShellLine command="whoami" />
          <TypingText as="h1" text={"Severin\nHilbert"} className="typed-heading" delay={220} />
          <TypedIntroDescription age={age} delay={620} />
          <TerminalOutput delay={1.68}>
            <div className="hero-links">
              <a href="mailto:severin.hilbert@gmail.com">
                <Mail className="size-4" />
                severin.hilbert@gmail.com
              </a>
              <span>
                <MapPin className="size-4" />
                Vienna, Austria
              </span>
            </div>
          </TerminalOutput>
          <TerminalOutput delay={1.82}>
            <div className="social-row">
              {socials.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <IconComponent className="size-5" style={{ color: social.color }} />
                  </a>
                );
              })}
            </div>
          </TerminalOutput>
        </motion.div>
      </div>
    </section>
  );
}

function BottomLegalLinks() {
  return (
    <div className="bottom-legal">
      <Link to="/imprint">imprint</Link>
      <Link to="/privacy">privacy</Link>
    </div>
  );
}

function FeaturedProject() {
  return (
    <section id="projects" className="section">
      <div className="page section-stack">
        <div>
          <ShellLine command="open featured-project" />
          <div className="project-title-row">
            <a
              href="https://tnyr.me"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit tnyr.me"
            >
              <img src="/brand/tnyr.webp" alt="tnyr.me logo" loading="lazy" decoding="async" />
            </a>
            <h2>
              <a href="https://tnyr.me" target="_blank" rel="noopener noreferrer">
                <DecryptedText text="tnyr.me" delay={180} interval={82} />
              </a>
            </h2>
          </div>
        </div>
        <TerminalOutput className="prose-block">
          <DecryptedText
            as="p"
            className="project-summary"
            text="Privacy-focused, open-source URL shortener with passwordless zero-trust encryption for links and metadata."
            delay={140}
            interval={30}
            revealStep={2}
          />
          <DecryptedText
            as="p"
            text="The browser does the sensitive work. The server stores only a storage key and encrypted destination data, so the original link stays private by design."
            delay={360}
            interval={28}
            revealStep={2}
          />
          <div className="inline-list">
            <span>
              <DecryptedText text="AES-256" delay={760} interval={40} revealStep={1} />
            </span>
            <span>
              <DecryptedText text="no tracking" delay={840} interval={38} revealStep={1} />
            </span>
            <span>
              <DecryptedText text="self-hostable" delay={920} interval={38} revealStep={1} />
            </span>
            <span>
              <DecryptedText text="150+ GitHub stars" delay={1000} interval={36} revealStep={1} />
            </span>
          </div>
          <div className="link-row">
            <a href="https://tnyr.me" target="_blank" rel="noopener noreferrer">
              visit <ArrowUpRight className="size-4" />
            </a>
            <a
              href="https://github.com/Sevi-py/tnyr.me"
              target="_blank"
              rel="noopener noreferrer"
            >
              source <SiGithub className="size-4" />
            </a>
          </div>
        </TerminalOutput>
      </div>
    </section>
  );
}

function StackSection() {
  return (
    <section id="stack" className="section">
      <div className="page section-stack">
        <ShellLine command="ls things-i-like" />
        <TypingText as="h2" text="Things I like" delay={160} />
        <div className="tool-list">
          {tools.map((tool, index) => {
            const IconComponent = tool.icon;
            return (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px 18% 0px" }}
                transition={{ duration: 0.22, delay: 0.44 + Math.min(index, 6) * 0.018 }}
                className="tool-item"
              >
                {tool.logo ? (
                  <img src={tool.logo} alt={`${tool.name} logo`} loading="lazy" decoding="async" />
                ) : IconComponent ? (
                  <IconComponent className="size-6" style={{ color: tool.color }} />
                ) : null}
                <span>{tool.name}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function MusicSection() {
  const [activeTrackId, setActiveTrackId] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const visibleTracks = isExpanded ? musicTracks : musicTracks.slice(0, 4);

  useEffect(() => {
    if (!isExpanded && activeTrackId) {
      const activeTrackIndex = musicTracks.findIndex((track) => track.id === activeTrackId);

      if (activeTrackIndex >= 4) {
        setActiveTrackId(null);
      }
    }
  }, [activeTrackId, isExpanded]);

  return (
    <section id="music" className="section music-section">
      <div className="page section-stack">
        <div>
          <ShellLine command="cat music/currently.looping" />
          <TypingText as="h2" text="Music I like" className="music-title" adaptive />
          <TerminalOutput>
            <TypingText
              as="p"
              className="section-note"
              text="Current rotation from the local playlist."
              adaptive
              speed={14}
            />
          </TerminalOutput>
        </div>
        <motion.div className="music-grid" layout>
          <AnimatePresence initial={false}>
            {visibleTracks.map((track, index) => (
              <MusicTrackRow
                key={track.id}
                track={track}
                index={index}
                activeTrackId={activeTrackId}
                setActiveTrackId={setActiveTrackId}
              />
            ))}
          </AnimatePresence>
        </motion.div>
        <motion.button
          type="button"
          className="music-expand"
          onClick={() => setIsExpanded((current) => !current)}
          aria-expanded={isExpanded}
          whileHover={{ y: -1 }}
          whileTap={{ y: 0 }}
          transition={{ duration: 0.16 }}
        >
          <motion.span
            className="terminal-arrow"
            animate={{ rotate: isExpanded ? 90 : 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            &gt;
          </motion.span>
          {isExpanded ? "show less" : `show all ${musicTracks.length}`}
        </motion.button>
      </div>
    </section>
  );
}

function TimelineSection() {
  return (
    <section id="timeline" className="section">
      <div className="page">
        <ShellLine command="cat cv.timeline" />
        <div className="section-stack">
          <div>
            <TypingText as="h2" text="Work, school, wins" adaptive />
          </div>
          <div className="timeline">
            {timeline.map((item) => {
              const IconComponent = item.icon;
              return (
                <ScrollResponsiveArticle key={`${item.role}-${item.date}`} className="timeline-item">
                  {(isVisible) => (
                    <>
                      <div className="timeline-meta">
                        <span className="timeline-date">
                          <IconComponent className="size-4" />
                          {item.date}
                        </span>
                        <span className="timeline-logo">
                          <img
                            src={item.logo}
                            alt={`${item.org} logo`}
                            loading="lazy"
                            decoding="async"
                          />
                        </span>
                      </div>
                      <TypingText as="h3" text={item.role} adaptive speed={24} start={isVisible} />
                      <TypingText
                        as="p"
                        className="org"
                        text={item.org}
                        adaptive
                        speed={24}
                        start={isVisible}
                      />
                      <TypingText as="p" text={item.text} adaptive speed={15} start={isVisible} />
                    </>
                  )}
                </ScrollResponsiveArticle>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function StayveraSection() {
  const [sectionRef, sectionStarted] = useStartOnView<HTMLElement>("0px 0px 4% 0px");

  return (
    <section className="section" ref={sectionRef}>
      <div className="page section-stack">
        <div>
          <ShellLine command="curl stayvera.com/about" />
          <h2 className="stayvera-heading">
            <TypingText text="Currently building " delay={180} />
            <motion.a
              href="https://stayvera.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit Stayvera"
              className="stayvera-brand"
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.2, delay: 0.5 }}
            >
              <img src="/brand/stayvera-symbol.webp" alt="" loading="lazy" decoding="async" />
              <span>Stayvera</span>
            </motion.a>
          </h2>
        </div>
        <TerminalOutput className="prose-block">
          <TypingText
            as="p"
            text="Stayvera is a premium rental and group-travel platform focused on fair fees, trust, host support, instant listing import, and an AI copilot for guest communication and operations."
            delay={140}
            speed={14}
            start={sectionStarted}
          />
          <div className="inline-list">
            <TypingText
              as="span"
              text="fair host economics"
              delay={1320}
              speed={22}
              start={sectionStarted}
            />
            <TypingText
              as="span"
              text="group travel"
              delay={1480}
              speed={22}
              start={sectionStarted}
            />
            <TypingText
              as="span"
              text="AI guest ops"
              delay={1600}
              speed={22}
              start={sectionStarted}
            />
            <TypingText
              as="span"
              text="transparent fees"
              delay={1720}
              speed={22}
              start={sectionStarted}
            />
          </div>
        </TerminalOutput>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section className="section final-section">
      <div className="page">
        <ShellLine command="ssh severin@sevi.sh" />
        <TypingText as="h2" text="Want to build something?" delay={180} />
        <TerminalOutput delay={0.62}>
          <div className="link-row">
            <a href="mailto:severin.hilbert@gmail.com">
              send mail <Mail className="size-4" />
            </a>
            <a href="https://github.com/Sevi-py" target="_blank" rel="noopener noreferrer">
              GitHub <ArrowUpRight className="size-4" />
            </a>
          </div>
        </TerminalOutput>
      </div>
    </section>
  );
}

function Home() {
  return (
    <main>
      <PageMeta title={DEFAULT_TITLE} description={DEFAULT_DESCRIPTION} path="/" />
      <IntroSection />
      <StayveraSection />
      <StackSection />
      <TimelineSection />
      <FeaturedProject />
      <MusicSection />
      <ContactSection />
      <BottomLegalLinks />
    </main>
  );
}

function Imprint() {
  return (
    <main className="imprint-page">
      <PageMeta
        title="Imprint - Severin Hilbert"
        description="Site operator and contact information for Severin Hilbert."
        path="/imprint"
      />
      <section className="page">
        <ShellLine command="cat imprint.txt" />
        <h1>Imprint</h1>
        <div className="imprint-grid">
          <div>
            <h2>Site operator</h2>
            <p>Severin Hilbert</p>
            <p>Herbert Rauch-Gasse 16</p>
            <p>2361 Laxenburg</p>
            <p>Austria</p>
          </div>
          <div>
            <h2>Contact</h2>
            <p>severin.hilbert@gmail.com</p>
          </div>
        </div>
        <Link to="/" className="back-link">
          <ChevronRight className="size-4 rotate-180" />
          back home
        </Link>
      </section>
    </main>
  );
}

function Privacy() {
  return (
    <main className="imprint-page">
      <PageMeta
        title="Privacy - Severin Hilbert"
        description="Privacy information for sevi.sh, including hosting, analytics, cookies, contact, and data rights."
        path="/privacy"
      />
      <section className="page">
        <ShellLine command="cat privacy.txt" />
        <h1>Privacy</h1>
        <div className="imprint-grid privacy-grid">
          <div>
            <h2>Controller</h2>
            <p>Severin Hilbert</p>
            <p>Herbert Rauch-Gasse 16</p>
            <p>2361 Laxenburg</p>
            <p>Austria</p>
            <p>severin.hilbert@gmail.com</p>
          </div>
          <div>
            <h2>Hosting and delivery</h2>
            <p>
              This website is delivered through Cloudflare. When you visit it,
              technical request data such as your IP address, requested pages,
              browser information, timestamps, and security events may be
              processed to serve, protect, cache, and route the site.
            </p>
          </div>
          <div>
            <h2>Analytics</h2>
            <p>
              I use Cloudflare's built-in, privacy-minded analytics to understand
              basic traffic patterns. The analytics setup is intended for
              aggregate page-view and performance insight, not for identifying
              individual visitors or tracking them across websites.
            </p>
          </div>
          <div>
            <h2>Cookies</h2>
            <p>
              This site does not use advertising or marketing cookies. Cloudflare
              Web Analytics does not rely on client-side state such as cookies or
              local storage for usage metrics.
            </p>
          </div>
          <div>
            <h2>Contact</h2>
            <p>
              If you contact me by email, I use the information you send only to
              read and reply to your message. I do not sell personal data.
            </p>
          </div>
          <div>
            <h2>Your rights</h2>
            <p>
              You can ask for access, correction, deletion, restriction, or
              portability of personal data, or object to processing where the law
              gives you that right. You may also contact the Austrian data
              protection authority.
            </p>
          </div>
        </div>
        <p className="legal-updated">Last updated: June 2026</p>
        <Link to="/" className="back-link">
          <ChevronRight className="size-4 rotate-180" />
          back home
        </Link>
      </section>
    </main>
  );
}

const rootRoute = createRootRoute({ component: Root });
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});
const imprintRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/imprint",
  component: Imprint,
});
const privacyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/privacy",
  component: Privacy,
});
const routeTree = rootRoute.addChildren([indexRoute, imprintRoute, privacyRoute]);
const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById("app")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
