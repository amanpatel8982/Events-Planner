import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
} from "lucide-react";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";
import SectionHeading from "../components/SectionHeading";
import ceremonyImage from "../assets/background.jpg";
import coupleImage from "../assets/back4.jpg";
import plannerImage from "../assets/back3.jpg";
import receptionImage from "../assets/back1.jpg";
import stageImage from "../assets/entrance.jpg";

const filters = [
  "All",
  "Ceremonies",
  "Receptions",
  "Design details",
  "Planning",
];

const galleryItems = [
  {
    id: "garden-portrait",
    src: coupleImage,
    category: "Ceremonies",
    title: "After the vows",
    caption:
      "A quiet portrait in the garden, held between the ceremony and the celebration.",
    alt: "A newly married couple standing together in a sunlit garden",
    size: "md:col-span-2 md:row-span-2",
    position: "center",
  },
  {
    id: "ivory-stage",
    src: stageImage,
    category: "Design details",
    title: "Soft architectural florals",
    caption:
      "An ivory stage composed with balanced floral arrangements and an open central frame.",
    alt: "An ivory event stage with symmetrical flowers and a central bench",
    size: "md:col-span-1 md:row-span-1",
    position: "center",
  },
  {
    id: "hand-tied-bouquet",
    src: "/gallery-5.jpg",
    category: "Design details",
    title: "A restrained bouquet",
    caption:
      "A hand-tied arrangement with gentle texture and a neutral, modern palette.",
    alt: "A person in white holding a hand-tied neutral flower bouquet",
    size: "md:col-span-1 md:row-span-1",
    position: "center 38%",
  },
  {
    id: "candlelit-table",
    src: receptionImage,
    category: "Receptions",
    title: "Dinner in warm light",
    caption:
      "Layered candles, foliage and place settings prepared for an intimate evening reception.",
    alt: "A reception table arranged with candles, greenery and formal place settings",
    size: "md:col-span-1 md:row-span-2",
    position: "center",
  },
  {
    id: "traditional-ceremony",
    src: ceremonyImage,
    category: "Ceremonies",
    title: "A ceremony with presence",
    caption:
      "A traditional stage set within a bright vaulted space, designed to remain open and welcoming.",
    alt: "A traditional wedding ceremony beneath a white vaulted canopy",
    size: "md:col-span-2 md:row-span-1",
    position: "center 42%",
  },
  {
    id: "banquet-layout",
    src: "/back1.avif",
    category: "Receptions",
    title: "Guest flow, considered",
    caption:
      "A banquet layout planned around comfortable sightlines, service access and easy movement.",
    alt: "A formal banquet hall arranged with round tables and white chairs",
    size: "md:col-span-1 md:row-span-1",
    position: "center",
  },
  {
    id: "evening-arch",
    src: "/backgroundimage.avif",
    category: "Ceremonies",
    title: "An intimate evening aisle",
    caption:
      "A focused ceremony setting framed by greenery, warm light and a clear guest approach.",
    alt: "An illuminated ceremony arch at the end of an evening aisle",
    size: "md:col-span-2 md:row-span-1",
    position: "center",
  },
  {
    id: "planning-table",
    src: plannerImage,
    category: "Planning",
    title: "The work before the room",
    caption:
      "Floral notes, layouts and final decisions reviewed together before production begins.",
    alt: "An event planner reviewing notes beside white floral samples",
    size: "md:col-span-1 md:row-span-1",
    position: "center",
  },
];

const Gallery = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeIndex, setActiveIndex] = useState(null);
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);
  const lastTriggerRef = useRef(null);

  const filteredItems = useMemo(
    () =>
      activeFilter === "All"
        ? galleryItems
        : galleryItems.filter((item) => item.category === activeFilter),
    [activeFilter],
  );

  const closeLightbox = useCallback(() => {
    setActiveIndex(null);
    window.requestAnimationFrame(() => {
      lastTriggerRef.current?.focus();
    });
  }, []);

  const showPrevious = useCallback(() => {
    setActiveIndex((currentIndex) => {
      if (currentIndex === null) return null;
      return (
        (currentIndex - 1 + filteredItems.length) % filteredItems.length
      );
    });
  }, [filteredItems.length]);

  const showNext = useCallback(() => {
    setActiveIndex((currentIndex) => {
      if (currentIndex === null) return null;
      return (currentIndex + 1) % filteredItems.length;
    });
  }, [filteredItems.length]);

  useEffect(() => {
    if (activeIndex === null) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeLightbox();
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        showPrevious();
        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        showNext();
        return;
      }

      if (event.key === "Tab" && dialogRef.current) {
        const focusableElements = Array.from(
          dialogRef.current.querySelectorAll("button, a[href]"),
        ).filter((element) => !element.hasAttribute("disabled"));

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault();
          lastElement?.focus();
        } else if (
          !event.shiftKey &&
          document.activeElement === lastElement
        ) {
          event.preventDefault();
          firstElement?.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    activeIndex,
    closeLightbox,
    showNext,
    showPrevious,
  ]);

  const activeItem =
    activeIndex === null ? null : filteredItems[activeIndex];

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    setActiveIndex(null);
  };

  const openLightbox = (index, event) => {
    lastTriggerRef.current = event.currentTarget;
    setActiveIndex(index);
  };

  return (
    <main>
      <PageHero
        eyebrow="Selected celebrations"
        title="Real spaces. Thoughtful details. Distinctly personal events."
        description="Explore ceremony settings, reception rooms and the planning work that turns a visual idea into a complete guest experience."
        image={ceremonyImage}
        imageAlt="A traditional wedding ceremony staged beneath a bright vaulted canopy"
        primaryAction={{ label: "Plan your event", to: "/contact" }}
        secondaryAction={{ label: "Meet the studio", to: "/about" }}
      />

      <section className="section-space bg-[var(--paper)]">
        <div className="page-shell">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHeading
              eyebrow="The portfolio"
              title="A closer look at how moments take shape."
              description="Browse by part of the experience, then open any image for a focused view and the story behind it."
            />

            <div
              className="inline-flex max-w-full flex-wrap gap-1 self-start rounded-lg border border-[var(--line)] bg-white p-1"
              role="group"
              aria-label="Filter gallery by category"
            >
              {filters.map((filter) => {
                const isActive = activeFilter === filter;

                return (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => handleFilterChange(filter)}
                    aria-pressed={isActive}
                    className={[
                      "min-h-10 rounded-md px-3 py-2 text-sm font-semibold transition-colors",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--rose)] focus-visible:ring-offset-2",
                      isActive
                        ? "bg-[var(--rose)] text-white"
                        : "text-[var(--muted)] hover:bg-[var(--surface)] hover:text-[var(--ink)]",
                    ].join(" ")}
                  >
                    {filter}
                  </button>
                );
              })}
            </div>
          </div>

          <p className="mt-8 text-sm text-[var(--muted)]" aria-live="polite">
            Showing {filteredItems.length}{" "}
            {filteredItems.length === 1 ? "moment" : "moments"}
          </p>

          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 md:auto-rows-[250px] md:grid-flow-dense md:grid-cols-3">
            {filteredItems.map((item, index) => (
              <button
                key={item.id}
                type="button"
                onClick={(event) => openLightbox(index, event)}
                className={[
                  "group relative aspect-[4/3] min-h-0 overflow-hidden rounded-lg bg-[var(--surface)] text-left",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--rose)] focus-visible:ring-offset-4",
                  "md:aspect-auto md:h-full",
                  item.size,
                ].join(" ")}
                aria-label={"Open " + item.title + " in the gallery viewer"}
              >
                <img
                  src={item.src}
                  alt={item.alt}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  style={{ objectPosition: item.position }}
                  loading="lazy"
                  decoding="async"
                />

                <span className="absolute inset-x-0 bottom-0 bg-black/70 p-4 text-white sm:p-5">
                  <span className="block text-xs font-semibold text-white/70">
                    {item.category}
                  </span>
                  <span className="mt-1 block text-base font-semibold sm:text-lg">
                    {item.title}
                  </span>
                </span>

                <span className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-md border border-white/30 bg-black/55 text-white opacity-100 transition-opacity md:opacity-0 md:group-hover:opacity-100 md:group-focus-visible:opacity-100">
                  <Maximize2 className="h-4 w-4" aria-hidden="true" />
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space border-t border-[var(--line)] bg-[var(--surface)]">
        <div className="page-shell flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Create your own"
            title="The strongest portfolio image is the one that still feels like you."
            description="Share the occasion, the guest experience you want and any decisions already made. We will help turn that starting point into a coherent plan."
          />
          <Link
            to="/contact"
            className="button-primary inline-flex shrink-0 items-center justify-center gap-2"
          >
            Start your brief
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      {activeItem && (
        <div
          ref={dialogRef}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-3 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="gallery-lightbox-title"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeLightbox();
          }}
        >
          <div className="relative flex max-h-[94vh] w-full max-w-6xl flex-col overflow-hidden rounded-lg bg-[var(--ink)] shadow-2xl">
            <button
              ref={closeButtonRef}
              type="button"
              onClick={closeLightbox}
              className="absolute right-3 top-3 z-10 flex h-11 w-11 items-center justify-center rounded-md border border-white/25 bg-black/65 text-white hover:bg-white hover:text-[var(--ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Close gallery viewer"
              title="Close"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>

            <div className="flex min-h-0 flex-1 items-center justify-center bg-black">
              <img
                src={activeItem.src}
                alt={activeItem.alt}
                className="max-h-[70vh] w-full object-contain"
              />
            </div>

            <div className="grid grid-cols-[3rem_1fr_3rem] items-center gap-3 border-t border-white/10 p-3 sm:grid-cols-[3.5rem_1fr_3.5rem] sm:gap-5 sm:p-5">
              <button
                type="button"
                onClick={showPrevious}
                className="flex h-11 w-11 items-center justify-center rounded-md border border-white/20 text-white hover:bg-white hover:text-[var(--ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:h-12 sm:w-12"
                aria-label="Show previous image"
                title="Previous image"
              >
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>

              <div className="min-w-0 text-center">
                <p className="text-xs font-semibold text-[var(--brass)]">
                  {activeItem.category} - {activeIndex + 1} of{" "}
                  {filteredItems.length}
                </p>
                <h2
                  id="gallery-lightbox-title"
                  className="mt-1 text-base font-semibold text-white sm:text-xl"
                >
                  {activeItem.title}
                </h2>
                <p className="mt-1 hidden text-sm leading-6 text-white/65 sm:block">
                  {activeItem.caption}
                </p>
              </div>

              <button
                type="button"
                onClick={showNext}
                className="flex h-11 w-11 items-center justify-center rounded-md border border-white/20 text-white hover:bg-white hover:text-[var(--ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white sm:h-12 sm:w-12"
                aria-label="Show next image"
                title="Next image"
              >
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Gallery;
