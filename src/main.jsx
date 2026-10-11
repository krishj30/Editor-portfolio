import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import "./styles.css";

/* =========================================================
   PORTFOLIO DATA
   Replace only the file names when the real assets arrive.
   No extra project folders are required.
========================================================= */

const brandReels = [

  {
    id: "brand-reel-01",
    name: "Client 01",
    src: "/videos/Client2.mp4",
    featured: true,
  },
   {
    id: "brand-reel-02",
    name: "Dettol 02",
    src: "/videos/dettol-2.mp4",
  },

   {
    id: "brand-reel-03",
    name: "Dettol 03",
    src: "/videos/Dettol-3.mp4",
  },

  {
    id: "brand-reel-04",
    name: "Dettol 01",
    src: "/videos/Dettol-1.mp4",
  },

  {
    id: "brand-reel-05",
    name: "Client 05",
    src: "/videos/papa%20johns.mp4",
  },
 

];


const motionGraphics = [
  {
    id: "motion-graphic-01",
    name: "Kinetic  Typography",
    src: "/videos/Motions/kinetic.mp4",
    featured: true,
  },
  {
    id: "motion-graphic-02",
    name: "Motion Poster",
    src: "/videos/Motions/wednesday.mp4",
  },
  {
    id: "motion-graphic-03",
    name: "HUD Animation",
    src: "/videos/Motions/hud.mp4",
  },
    {
    id: "motion-graphic-04",
    name: "Festival Post",
    src: "/videos/Motions/christmas.mp4",
  },
    {
    id: "motion-graphic-05",
    name: "Product Ad",
    src: "/videos/Motions/product2.mp4",
  },
];

const videoEditing = [
  {
    id: "video-edit-01",
    name: "Spider-man edit",
    src: "/videos/Video-edit/spider-man.mp4",
    featured: true,
  },
  {
    id: "video-edit-02",
    name: "Vlog",
    src: "/videos/Video-edit/jaipur.mp4",
  },
  {
    id: "video-edit-03",
    name: "Movie Trailer",
    src: "/videos/Video-edit/titantic.mp4",
  },
  {
    id: "video-edit-04",
    name: "Montage",
    src: "/videos/Video-edit/spider.mp4",
  },
  
];

const graphicCategories = [
{
  slug: "logo-design",
  name: "Logo Design",
  
  type: "images",

  items: [
    {
      id: "logo-01",
      name: "Original Logo",
      type: "img",
      src: "/videos/Graphic/logo/logo.png",
    },

    {
      id: "logo-02",
      name: "Logo Mockup",
      type: "img",
      src: "/videos/Graphic/logo/mockup.jpg",
    },
  ],
},
  {
    slug: "packaging-design",
    name: "Packaging Design",
    description: "Packaging artwork and its real-world presentation together.",
    type: "paired",
    items: [
      {
  id: "packaging-01",
  name: "Packaging Mockup 1",
  image: "/videos/Graphic/brand%20pack/mockup.png",
  original: "/videos/Graphic/brand%20pack/desing.png",
},
       {
        id: "packaging-01",
        name: "Packaging-01",
        image: "/videos/Graphic/brand%20pack/desing.png",
        original:"/videos/Graphic/brand%20pack/desing.png",
      },
       {
        id: "packaging-01",
        name: "Packaging outline",
        image: "/videos/Graphic/brand%20pack/outline.jpg",
        original: "/videos/Graphic/brand%20pack/outline.jpg",
      },
    ],
  },
  {
    slug: "poster-design",
    name: "Poster Design",
    description: "Poster artwork presented directly without mockups.",
    type: "images",
    items: [
      { id: "poster-01", name: "Poster 1", image: "/videos/Graphic/poster/poster-1.jpg" },
      { id: "poster-02", name: "Poster 2", image: "/videos/Graphic/poster/poster-2.jpg" },
    ],
  },
  {
    slug: "double-exposure",
    name: "Double Exposure",
    description: "Double exposure artwork presented as finished designs.",
    type: "images",
    items: [
      {
        id: "double-exposure-01",
        name: "Design 1",
        image: "/videos/Graphic/double-exposure/design-1.jpg",
      },
      {
        id: "double-exposure-02",
        name: "Design 2",
        image: "/videos/Graphic/double-exposure/design-2.jpg",
      },
    ],
  },
  {
    slug: "photo-manipulation",
    name: "Photo Manipulation",
    description: "Four finished photo manipulation artworks.",
    type: "images",
    items: [
      {
        id: "photo-manipulation-01",
        name: "Artwork 1",
        image: "/videos/Graphic/manipulation/Photo-manipulation 1.jpg",
      },
      {
        id: "photo-manipulation-02",
        name: "Artwork 2",
        image: "/videos/Graphic/manipulation/independence.jpg",
      },
      {
        id: "photo-manipulation-03",
        name: "Artwork 3",
        image: "/videos/Graphic/manipulation/Photo-manipulation 3.jpg",
      },
      {
        id: "photo-manipulation-04",
        name: "Artwork 4",
        image: "/videos/Graphic/manipulation/Photo-manipulation 2.png",
      },
    ],
  },
  {
    slug: "menu-brochure",
    name: "Menu & Brochure",
    description: "Menu design plus the complete brochure front and back.",
    type: "images",
    items: [
  {
  id: "menu-01",
  name: "Menu Design 1",
  type: "pdf",
  pdf: "/videos/Graphic/menu-brochure/Restaurant-Menu.pdf",
},
      {
        id: "brochure-front",
        name: "Brochure Design 1 — Front",
        image: "/videos/Graphic/menu-brochure/Front.jpg",
      },
      {
        id: "brochure-back",
        name: "Brochure Design 1 — Back",
        image: "/videos/Graphic/menu-brochure/back.png",
      },
      {
        id: "brochure-mockup",
        name: "Brochure Design 1 — Mockup",
        image: "/videos/Graphic/menu-brochure/mockup.png",
      },
    ],
  },
  {
    slug: "social-media-post",
    name: "Social Media Post",
    description: "Social media creatives designed for strong visual communication and brand presence.",
    type: "images",
    items: [
      {
        id: "social-01",
        name: "Social Media Post 1",
        type: "img",
        src: "/videos/Graphic/social-media/love.png",
      },
      {
        id: "social-02",
        name: "Social Media Post 2",
        type: "img",
        src: "/videos/Graphic/social-media/Product.png",
      },
      {
        id: "social-03",
        name: "Social Media Post 3",
        type: "img",
        src: "/videos/Graphic/social-media/rare.png",
      },
      {
        id: "social-04",
        name: "Social Media Post 4",
        type: "img",
        src: "/videos/Graphic/social-media/RareB.png",
      },
      {
        id: "social-05",
        name: "Social Media Post 5",
        type: "img",
        src: "/videos/Graphic/social-media/RR5.png",
      },
      {
        id: "social-06",
        name: "Social Media Post 6",
        type: "img",
        src: "/videos/Graphic/social-media/Tread.png",
      },
    ],
  },
{
  slug: "booklet",
  name: "Booklet",
  description: "Booklet pages and spreads presented together.",
  type: "pdf",

  items: [
    {
      id: "booklet-01",
      name: "Product Campaign",
      type: "pdf",
      pdf: "/videos/Graphic/booklet/booklet.pdf",
      image: "/videos/Graphic/booklet/Booklet.png",
    },
  ],
},
];

function useReveal() {
  const ref = useRef(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setShow(true),
      { threshold: 0.12 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return [ref, show];
}

function Noise() {
  return <div className="noise" />;
}
function Orb({ className = "" }) {
  return (
    <div className={`orb ${className}`}>
      <span />
    </div>
  );
}
function Glass({ children, className = "" }) {
  return <div className={`glass ${className}`}>{children}</div>;
}
function Section({ children, className = "", id }) {
  const [ref, show] = useReveal();
  return (
    <section
      id={id}
      ref={ref}
      className={`section ${className} ${show ? "revealed" : ""}`}
    >
      {children}
    </section>
  );
}

function Nav() {
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const go = (id) => {
    setOpen(false);
    if (pathname === "/")
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    else window.location.href = `/#${id}`;
  };
  return (
    <header className="nav">
      <Link to="/" className="brand">
        MS <span>♡</span>
      </Link>
      <nav className={open ? "open" : ""}>
        <button onClick={() => go("work")}>Work</button>
        <button onClick={() => go("about")}>About</button>
        <button onClick={() => go("services")}>Services</button>
        <button onClick={() => go("process")}>Process</button>
        <button onClick={() => go("contact")}>Contact</button>
      </nav>
      <button className="create" onClick={() => go("contact")}>
        Let’s Create <span>↗</span>
      </button>
      <button className="menu" onClick={() => setOpen(!open)} aria-label="menu">
        <i />
        <i />
      </button>
    </header>
  );
}

function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  return (
    <section ref={ref} className="hero">
      <div className="hero-copy" style={{ opacity }}>
        <p className="eyebrow">VIDEO EDITOR</p>
        <h1>
          Turning
          <br />
          Moments
          <br />
          Into <em>Forever.</em>
        </h1>
        <p className="lead">
          Video editing that feels, connects, and stays — for the people and
          stories that matter.
        </p>
        <a className="pill" href="#work">
          <span className="play">▶</span> Watch My Showreel
        </a>
        <div className="scrollhint">
          ↕{" "}
          <span>
            SCROLL
            <br />
            TO EXPLORE
          </span>
        </div>
      </div>
      <motion.div className="hero-art" style={{ y }}>
        <div className="ring ring-a" />
        <div className="ring ring-b" />
        <div className="film-ribbon">
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
        <Glass className="hero-screen main-screen">
          <div className="screen-line">
            GOOD
            <br />
            STORIES
            <br />
            <b>NEVER</b>
            <br />
            FADE
          </div>
          <div className="screen-glow" />
        </Glass>
        <Glass className="hero-screen side-screen">
          <div className="mini-mountains" />
        </Glass>
        <Orb className="orb-a" />
        <Orb className="orb-b" />
        <div className="spark s1" />
        <div className="spark s2" />
        <div className="spark s3" />
      </motion.div>
      <div className="side-note">
        Same
        <br />
        Moments
        <br />
        <i>Different</i>
        <br />
        Feelings ♡
      </div>
      <div className="hero-index">
        01
        <br />
        <span>02</span>
        <br />
        <span>03</span>
      </div>
    </section>
  );
}

function HomeProject({ title, subtitle, link, kind = "image", src }) {
  return (
    <Link to={link} className="project-card">
      <div className="project-media">
        {kind === "video" ? (
          <>
            <video muted playsInline preload="metadata" src={src} />
            <div className="media-fallback">
              <span>PLAY</span>
            </div>
          </>
        ) : (
          <div className="graphic-abstract">
            <div className="g-shape" />
            <div className="g-type">{title.split(" ")[0]}</div>
          </div>
        )}
        <div className="play-dot">▶</div>
      </div>
      <div className="project-meta">
        <strong>{title}</strong>
        <span>{subtitle}</span>
      </div>
    </Link>
  );
}

function Work() {
  const featuredProjects = [
 {
  number: "01",
  category: "BRAND REELS",
  title: "Client Work",
  video: "/videos/Client2.mp4",
  description:
    "Cinematic storytelling built for modern brands.",
  path: "/brand-reels",
  size: "large",
},
 {
  number: "02",
  category: "GRAPHIC DESIGN",
  title: "Graphic Design",
  image:
    graphicCategories[0]?.items?.find(
      (item) => item.type !== "pdf" && (item.image || item.src)
    )?.image ||
    graphicCategories[0]?.items?.find(
      (item) => item.type !== "pdf" && (item.image || item.src)
    )?.src,
  description:
    graphicCategories[0]?.description ||
    "Bold visual systems, compositions and creative direction.",
  path: "/graphic-design",
  size: "small",
},
  {
  number: "03",
  category: "MOTION GRAPHICS",
  title: "Motion Graphics",
  video: motionGraphics[1]?.src,
  description:
    "Motion designed to make ideas move.",
  path: "/motion-graphics",
  size: "small",
},
  {
  number: "04",
  category: "VIDEO EDITING",
  title: "Video Editing",
  video: videoEditing[0]?.src,
  description:
    "Story-driven edits with rhythm, emotion and atmosphere.",
  path: "/video-editing",
  size: "wide",
},
  ];

  return (
    <section className="featured-work" id="work">

      {/* HEADER */}

      <div className="featured-header">

        <div>
          <p className="eyebrow">
            SELECTED WORK
          </p>

          <h2>
            client
            <br />
            <em>Work.</em>
          </h2>
        </div>

        <div className="featured-header-right">
          <span>04 / SELECTED PROJECTS</span>

          <p>
            A selection of visual work,
            <br />
            crafted with intention.
          </p>
        </div>

      </div>


      {/* PROJECT STAGE */}

      <div className="featured-stage">

        {featuredProjects.map((project, index) => (

          <FeaturedProject
            key={project.number}
            project={project}
            index={index}
          />

        ))}

      </div>


      {/* BOTTOM */}

      <div className="featured-bottom">

        <span>
          MORE PROJECTS
        </span>

        <Link
          to="/graphic-design"
          className="featured-view-all"
        >
          VIEW ALL WORK
          <span>↗</span>
        </Link>

      </div>

    </section>
  );
}
function FeaturedProject({ project, index }) {
  const [mouse, setMouse] = useState({
    x: 50,
    y: 50,
  });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();

    setMouse({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const handleMouseLeave = () => {
    setMouse({
      x: 50,
      y: 50,
    });
  };

  return (
    <Link
      to={project.path}
      className={`featured-project featured-${project.size}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        "--mouse-x": `${mouse.x}%`,
        "--mouse-y": `${mouse.y}%`,
      }}
    >

 <div className="featured-media">

  {project.video ? (
    <video
      src={project.video}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
    />
  ) : project.image ? (
    <img
      src={project.image}
      alt={project.title}
    />
  ) : (
    <div className="featured-placeholder">
      <span>{project.category}</span>
    </div>
  )}

  <div className="featured-image-overlay" />
  <div className="featured-cursor-light" />
  <div className="featured-scan-line" />

</div>


      {/* TOP META */}

      <div className="featured-meta">

        <span>
          {project.number}
        </span>

        <span>
          {project.category}
        </span>

      </div>


      {/* PROJECT INFO */}

      <div className="featured-info">

        <div>

          <span className="featured-category">
            {project.category}
          </span>

          <h3>
            {project.title}
          </h3>

          <p>
            {project.description}
          </p>

        </div>


        <div className="featured-arrow">
          ↗
        </div>

      </div>


      {/* PROJECT INDEX */}

      <div className="featured-index">
        0{index + 1}
      </div>

    </Link>
  );
}
function About() {
  return (
    <Section id="about" className="about">
      <div className="about-copy">
        <p className="eyebrow">ABOUT ME</p>
        <h2>
          More Than
          <br />
          Just <em>Editing.</em>
        </h2>
        <p>
          I’m a video editor who believes every moment has a story. I focus on
          creating visuals that feel real, beautiful and memorable.
        </p>
        <div className="stats">
          <div>
            <b>3+</b>
            <span>Years Learning</span>
          </div>
          <div>
            <b>100+</b>
            <span>Projects</span>
          </div>
          <div>
            <b>∞</b>
            <span>Ideas to Explore</span>
          </div>
        </div>
      </div>
      <div className="about-art">
        <div className="editing-window">
          <div className="window-top">
            <i />
            <i />
            <i />
          </div>
          <div className="timeline">
            <b />
            <b />
            <b />
            <b />
            <b />
          </div>
          <div className="timeline tracks">
            <b />
            <b />
            <b />
          </div>
        </div>
        <div className="glass-frame f1" />
        <div className="glass-frame f2" />
        <div className="glass-frame f3" />
        <Orb className="about-orb" />
      </div>
    </Section>
  );
}

function ServiceCard({ icon, title, description, active }) {
  const [mouse, setMouse] = useState({
    x: 50,
    y: 50,
  });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setMouse({
      x,
      y,
    });
  };

  const handleMouseLeave = () => {
    setMouse({
      x: 50,
      y: 50,
    });
  };

  return (
    <motion.div
      className={`service-card ${active ? "active" : ""}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        "--mouse-x": `${mouse.x}%`,
        "--mouse-y": `${mouse.y}%`,
      }}
      whileHover={{
        y: -10,
        rotateX: 3,
        rotateY: -3,
        scale: 1.02,
      }}
      transition={{
        type: "spring",
        stiffness: 250,
        damping: 20,
      }}
    >
      {/* Cursor-following glow */}
      <div className="service-glow" />

      {/* Glass reflection */}
      <div className="service-reflection" />

      <div className="service-content">

        <div className="service-icon">
          {icon}
        </div>

        <h3>{title}</h3>

        <p>{description}</p>

       

      </div>
    </motion.div>
  );
}


function Services() {
  const services = [
    [
      "▣",
      "Video Editing",
      "Cinematic, clean and engaging edits.",
    ],
    [
      "●",
      "Graphic Design",
      "Aesthetic and professional looks.",
    ],
    [
      "▱",
      "Motion Graphics",
      "Smooth and eye-catching visuals.",
    ],
    [
      "▶",
      "Short & LongForm Content",
      "Reels, Shorts, TikToks that stand out.",
    ],
    [
      "✦",
      "UI/UX Design",
      "Turning ideas into emotional stories.",
    ],
  ];

  return (
    <Section id="services" className="services">

      <div className="section-head">

        <div>
          <p className="eyebrow">
            SERVICES
          </p>

          <h2>
            What I <em>Do.</em>
          </h2>
        </div>

        <p>
          From personal memories to brand stories,
          <br />
          I create edits that look good and feel even better.
        </p>

      </div>


      <div className="service-grid">

        {services.map(([icon, title, description], i) => (

          <ServiceCard
            key={title}
            icon={icon}
            title={title}
            description={description}
            active={i === 0}
          />

        ))}

      </div>

    </Section>
  );
}

function Process() {
  return (
    <Section id="process" className="process">
      <div className="process-title">
        <p className="eyebrow">MY PROCESS</p>
        <h2>
          From Idea
          <br />
          to <em>Emotion.</em>
        </h2>
      </div>
      <div className="process-line">
        {[
          ["01", "Understand", "Your Vision", "♧"],
          ["02", "Plan", "The Story", "☷"],
          ["03", "Edit", "With Details", "✂"],
          ["04", "Review", "& Refine", "♡"],
          ["05", "Final", "Masterpiece", "✦"],
        ].map((x) => (
          <div className="step" key={x[0]}>
            <div className="step-icon">{x[3]}</div>
            <small>{x[0]}</small>
            <b>{x[1]}</b>
            <span>{x[2]}</span>
          </div>
        ))}
      </div>
      <div className="process-ribbon" />
    </Section>
  );
}

function Tools() {
  return (
   <Section className="tools">

  <div className="tools-intro">

    <p className="eyebrow">TOOLS I USE</p>

    <h2>
      Crafted With
      <br />
      the Right <em>Tools.</em>
    </h2>

    <p>
      The tools help me create magic,
      <br />
      but the real magic is in the stories.
    </p>

  </div>


  <div className="tool-list">

    {[
      ["Pr", "Premiere Pro"],
      ["Ae", "After Effects"],
      ["Ps", "Photoshop"],
      ["Ai", "Illustrator"],
      ["Id", "InDesign"],
      ["CD", "CorelDRAW"],
      ["F", "Figma"],
      ["XD", "Adobe XD"],
      ["VN", "VN"],
      ["Ed", "Edits"],
      ["CC", "CapCut"],
      
    ].map((x, i) => (

      <Glass
        className="tool"
        key={x[1]}
        style={{
          "--tool-index": i,
        }}
      >

        <div className="tool-number">
          {String(i + 1).padStart(2, "0")}
        </div>

        <div className="tool-logo">
          <span>{x[0]}</span>
        </div>

        <div className="tool-info">
          <span>CREATIVE TOOL</span>
          <strong>{x[1]}</strong>
        </div>

        <div className="tool-arrow">
          ↗
        </div>

        <div className="tool-shine" />

      </Glass>

    ))}

  </div>

</Section>
  );
}
function Contact() {
  const contacts = [
   
 {
    number: "01",
    label: "WHATSAPP",
    value: "Chat with me",
    href: "https://wa.me/918591373120",
    icon: "◉",
  },
  {
    number: "02",
    label: "EMAIL",
    value: "maahisadh6@gmail.com",
    href: "mailto:maahisadh6@gmail.com",
    icon: "@",
  },
  {
    number: "03",
    label: "PHONE",
    value: "+91 85913 73120",
    href: "tel:+918591373120",
    icon: "⌕",
  },
  ];

  return (
    <Section id="contact" className="contact">

      <div className="contact-inner">

        {/* LEFT */}
        <div className="contact-intro">

          <p className="eyebrow">LET'S WORK TOGETHER</p>

          <h2>
            Let's create
            <br />
            something <em>special.</em>
          </h2>

          <p className="contact-description">
            Have a project, idea, or story in mind?
            <br />
            Let's turn it into something beautiful together.
          </p>

          <div className="contact-status">
            <span className="status-dot" />
            AVAILABLE FOR PROJECTS
          </div>

        </div>


        {/* RIGHT */}
        <div className="contact-panel">

          <div className="contact-panel-glow" />

          <div className="contact-orb">
            <span>✦</span>
          </div>

          <div className="contact-orb-line line-one" />
          <div className="contact-orb-line line-two" />


          <div className="contact-grid">

            {contacts.map((contact) => (
              <a
                key={contact.number}
                href={contact.href}
                target={
                  contact.href.startsWith("http")
                    ? "_blank"
                    : undefined
                }
                rel="noreferrer"
                className="contact-card"
              >

                <div className="contact-card-top">

                  <span className="contact-number">
                    {contact.number}
                  </span>

                  <span className="contact-icon">
                    {contact.icon}
                  </span>

                  <span className="contact-arrow">
                    ↗
                  </span>

                </div>

                <div className="contact-card-info">

                  <span>{contact.label}</span>

                  <strong>
                    {contact.value}
                  </strong>

                </div>

              </a>
            ))}

          </div>

        </div>

      </div>


      {/* MINI FORM */}

      <div className="contact-form">

        <div className="contact-form-heading">
          <span>QUICK INQUIRY</span>
          <p>Tell me a little about your project.</p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();

            const form = new FormData(e.currentTarget);

            const name = form.get("name");
            const email = form.get("email");
            const project = form.get("project");

            const message = `
New Project Inquiry

Name: ${name}
Email: ${email}

Project:
${project}
            `;

            window.open(
  `https://wa.me/918591373120?text=${encodeURIComponent(
    message
  )}`,
  "_blank"
);
          }}
        >

          <div className="contact-input">
            <span>01</span>

            <input
              name="name"
              placeholder="Your name"
              required
            />
          </div>


          <div className="contact-input">
            <span>02</span>

            <input
              name="email"
              type="email"
              placeholder="Your email"
              required
            />
          </div>


          <div className="contact-input contact-message">
            <span>03</span>

            <textarea
              name="project"
              placeholder="Tell me about your project..."
              required
            />
          </div>


          <button type="submit" className="contact-submit">
            SEND INQUIRY
            <span>↗</span>
          </button>

        </form>

      </div>

    </Section>
  );
}

function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Work />
        <About />
        <Services />
        <Process />
        <Tools />
        <Contact />
      </main>
      <Noise />
      <footer>
        © {new Date().getFullYear()} MS · Crafted with intention.
      </footer>
    </>
  );
}

function PageHero({ eyebrow, title, accent, description }) {
  return (
    <div className="inner-head">
      <p className="eyebrow">{eyebrow}</p>
      <h1>
        {title}
        <br />
        <em>{accent}</em>
      </h1>
      <p>{description}</p>
    </div>
  );
}

function ReelShowcase({ items }) {
  return (
    <section className="reel-showcase">
      <div className="showcase-head">
        <div>
          <p className="eyebrow">FEATURED WORK</p>
          <h2>
            Stories
            <br />
            Made <em>Beautiful.</em>
          </h2>
        </div>
        <div className="showcase-side">
          <p>
            All projects from this
            <br />
            creative discipline.
          </p>
          <span className="showcase-count">
            {String(items.length).padStart(2, "0")} PROJECTS
          </span>
        </div>
      </div>
      <div className="reel-strip">
        {items.map((item, i) => (
          <a
            className={`reel-placeholder reel-${i + 1}`}
            href={`#${item.id}`}
            key={item.id}
          >
            <div className="reel-art">
              <div className="reel-glow" />
              <div className="reel-film" />
              <div className="reel-orb" />
              <div className="reel-scene">
                <span>{String(i + 1).padStart(2, "0")}</span>
              </div>
              <div className="reel-play">▶</div>
            </div>
            <div className="reel-caption">
              <strong>{item.name}</strong>
              <span>Video · Cinematic</span>
            </div>
          </a>
        ))}
      </div>
      <div className="showcase-line">
        <span>ALL WORK</span>
        <span>{String(items.length).padStart(2, "0")} ITEMS</span>
      </div>
    </section>
  );
}

function VideoPortfolioPage({ title, eyebrow, description, items }) {
  return (
    <>
      <Nav />

      <main className="inner-page clean-video-page">

        {/* PAGE HEADER */}
        <section className="video-page-hero">
          <div className="video-page-eyebrow">
            {eyebrow}
          </div>

          <h1>
            {title}
            <br />
            <em>In Motion.</em>
          </h1>

          <p>
            {description}
          </p>

          <div className="video-page-meta">
            <span>SELECTED WORK</span>
            <span>{String(items.length).padStart(2, "0")} PROJECTS</span>
          </div>
        </section>


        {/* REAL VIDEOS ONLY */}
        <section className="real-video-showcase">

          {items.map((item, index) => (
            <article
              className="real-video-card"
              id={item.id}
              key={item.id}
            >

              {/* NUMBER */}
              <div className="real-video-number">
                {String(index + 1).padStart(2, "0")}
              </div>


              {/* VIDEO */}
              <div className="real-video-frame">

                <video
                  controls
                  playsInline
                  preload="metadata"
                  src={item.src}
                />

              </div>


              {/* INFO */}
              <div className="real-video-info">

                <div>
                  <span className="real-video-type">
                    {eyebrow}
                  </span>

                  <h2>{item.name}</h2>
                </div>

                <div className="real-video-details">
                  <span>VIDEO</span>
                  <span>2026</span>
                  <span>CINEMATIC</span>
                </div>

              </div>

            </article>
          ))}

        </section>

      </main>


      <footer className="inner-footer">
        <Link to="/">
          ← Back to portfolio
        </Link>
      </footer>
    </>
  );
}

function GraphicDesignPage() {
const getThumbnail = (category) => {
  const imageItem = category.items?.find(
    (item) => item.image
  );

  if (imageItem) {
    return imageItem.image;
  }

  const srcItem = category.items?.find(
    (item) => item.src && item.type !== "pdf"
  );

  if (srcItem) {
    return srcItem.src;
  }

  return null;
};

  return (
    <>
      <Nav />

      <main className="inner-page graphic-design-index">

        <PageHero
          eyebrow="GRAPHIC DESIGN"
          title="Designs Made"
          accent="to Be Seen."
          description="Choose a category and immediately see every piece of work inside it. Designs and mockups stay together — no unnecessary folders."
        />

        <div className="category-page-grid">

          {graphicCategories.map((category, i) => {
            const thumbnail = getThumbnail(category);

            return (
              <Link
                className="category-tile"
                to={`/graphic-design/${category.slug}`}
                key={category.slug}
              >

                {/* VISUAL */}
               <div className="category-tile-art">

  <div className="category-number">
    {String(i + 1).padStart(2, "0")}
  </div>

  {thumbnail ? (
    <img
      className="category-tile-image"
      src={thumbnail}
      alt={category.name}
    />
  ) : (
    <div className="category-tile-fallback">
      <span>{category.name}</span>
    </div>
  )}

  <div className="category-image-overlay" />

</div>

                {/* TEXT */}
                <div className="category-tile-copy">

                  <span>GRAPHIC DESIGN</span>

                  <h3>
                    {category.name}
                  </h3>

                  <p>
                    {category.description}
                  </p>

                  <b>
                    View Work ↗
                  </b>

                </div>

              </Link>
            );
          })}

        </div>

      </main>

      <footer>
        ← <Link to="/">Back to portfolio</Link>
      </footer>
    </>
  );
}

function GraphicCategoryPage({ category }) {
  return (
    <>
      <Nav />

<main className={`graphic-category-page ${category.slug}`}>
        {/* HEADER */}
        <section className="graphic-category-hero">

          <p className="eyebrow">
            GRAPHIC DESIGN / {category.name.toUpperCase()}
          </p>

          <h1>
            {category.name}
          </h1>

          <p>
            {category.description}
          </p>

          <div className="graphic-category-meta">
            <span>SELECTED WORK</span>

            <span>
              {String(category.items.length).padStart(2, "0")} PROJECTS
            </span>
          </div>

        </section>


        {/* WORK GRID */}
        <section className="graphic-work-grid">

  {category.items.map((item, index) => {
    const pdfSrc = item.pdf || item.src;

    return (
      <article
        className="graphic-work-card"
        key={item.id}
      >

        <div className="graphic-work-number">
          {String(index + 1).padStart(2, "0")}
        </div>

        <div className="graphic-work-image">

          {item.type === "pdf" ? (
            <iframe
              src={`${pdfSrc}#toolbar=0&navpanes=0&scrollbar=0`}
              title={item.name}
            />
          ) : (
            <img
              src={item.image || item.src}
              alt={item.name}
              loading="lazy"
            />
          )}

        </div>

        <div className="graphic-work-info">

          <div>
            <span>{category.name.toUpperCase()}</span>
            <h2>{item.name}</h2>
          </div>

          {item.type === "pdf" && pdfSrc && (
            <a
              href={pdfSrc}
              target="_blank"
              rel="noopener noreferrer"
            >
              OPEN PDF ↗
            </a>
          )}

        </div>

      </article>
    );
  })}

</section>

      </main>


      <footer className="inner-footer">

        <Link to="/graphic-design">
          ← Back to Graphic Design
        </Link>

      </footer>
    </>
  );
}

{/* CONTACT SECTION */}


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/brand-reels"
          element={
            <VideoPortfolioPage
              eyebrow="BRAND REELS"
              title="Brand Reels"
              description="Four brand reels. One focused page. The best reel is featured on the homepage, and all four are available here."
              items={brandReels}
            />
          }
        />
        <Route
          path="/motion-graphics"
          element={
            <VideoPortfolioPage
              eyebrow="MOTION GRAPHICS"
              title="Motion Graphics"
              description="One featured motion graphic on the homepage, with every motion graphics project available here."
              items={motionGraphics}
            />
          }
        />
        <Route
          path="/video-editing"
          element={
            <VideoPortfolioPage
              eyebrow="VIDEO EDITING"
              title="Video Editing"
              description="One signature edit on the homepage, with the complete video editing portfolio available here."
              items={videoEditing}
            />
          }
        />
        <Route path="/graphic-design" element={<GraphicDesignPage />} />
        {graphicCategories.map((category) => (
          <Route
            key={category.slug}
            path={`/graphic-design/${category.slug}`}
            element={<GraphicCategoryPage category={category} />}
          />
        ))}
      </Routes>
    </BrowserRouter>
    
  );
  
}

createRoot(document.getElementById("root")).render(<App />);

