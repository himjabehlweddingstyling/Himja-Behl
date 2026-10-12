export interface JourneySection {
  id: string;
  number: string;
  title: string;
  text: string;
  image: string;
  imageCaption: string;
  imageAlt: string;
}

export interface Journey {
  id: string;
  slug: string;
  title: string;
  client: string;
  context: string;
  quote: string;
  image: string;
  aspectRatio: string;
  styleDirection: string;
  tags: string[];
  description: string;
  brief: string;
  process: string;
  result: string;
  sections: JourneySection[];
}

export const journeys: Journey[] = [
  {
    id: "01",
    slug: "tushar-behl",
    title: "A Legacy, Restyled",
    client: "Tushar Behl — Groom & Venture Capitalist",
    context: "Wedding · Delhi",
    quote: "The overall look came together as a nice modern groom while still having the family vibe to it.",
    image: "/journey-tushar.jpg",
    aspectRatio: "aspect-[3/4]",
    styleDirection: "Modern Groom",
    tags: ["TAILORED", "CONTEMPORARY", "SENTIMENTAL"],
    description: "With work and constant travel leaving very little time for wedding shopping, Tushar needed a process that was clear, efficient and easy to visualise. The aim was to create a groom wardrobe that felt polished and contemporary without making styling another demanding part of wedding planning.",
    brief: "Build a complete groom wardrobe around his personal style while keeping shopping focused and time-efficient. Alongside the new looks, there was one sentimental challenge: reimagine his father's 30-year-old wedding sherwani for his own wedding day. His eyewear also needed to feel intentional rather than something that disrupted the finished looks.",
    process: "The process began with detailed discovery conversations to understand what Tushar would genuinely feel comfortable wearing. Before the first shopping sprint, a curated lookbook gave him a realistic visual direction for each look. Shopping was then narrowed to a considered selection of designers and options — limited enough to save time, but varied enough to make confident choices. His father's sherwani was altered, revived and completely restyled with jewellery and a saffron-toned safa to create a modern groom look while preserving its family history. Custom eyewear was also developed for each function so that his glasses became part of the styling rather than an afterthought.",
    result: "A wardrobe that felt effortless, personal and distinctly his own. Every shopping decision became easier to navigate, a 30-year-old family sherwani was given a contemporary second life, and even his eyewear became an integral part of the final styling. The result was a modern groom wardrobe with a strong sense of family and history running through it.",
    sections: [
      {
        id: "brief",
        number: "01",
        title: "The Brief",
        text: "Build a complete groom wardrobe around his personal style while keeping shopping focused and time-efficient. Alongside the new looks, there was one sentimental challenge: reimagine his father's 30-year-old wedding sherwani for his own wedding day. His eyewear also needed to feel intentional rather than something that disrupted the finished looks.",
        image: "/journeys/tushar-brief.webp",
        imageCaption: "Cocktail & Discovery — Establishing a sharp, modern baseline and integrating bespoke eyewear seamlessly into each look.",
        imageAlt: "Tushar Behl cocktail evening styling with bespoke eyewear"
      },
      {
        id: "process",
        number: "02",
        title: "The Process",
        text: "The process began with detailed discovery conversations to understand what Tushar would genuinely feel comfortable wearing. Before the first shopping sprint, a curated lookbook gave him a realistic visual direction for each look. Shopping was then narrowed to a considered selection of designers and options — limited enough to save time, but varied enough to make confident choices. His father's sherwani was altered, revived and completely restyled with jewellery and a saffron-toned safa to create a modern groom look while preserving its family history. Custom eyewear was also developed for each function so that his glasses became part of the styling rather than an afterthought.",
        image: "/journeys/tushar-process.webp",
        imageCaption: "Heirloom Sherwani Revival — Meticulously altering his father's 30-year-old sherwani, paired with layered emerald malas and custom eyewear.",
        imageAlt: "Tushar Behl heirloom sherwani fittings and jewelry styling"
      },
      {
        id: "result",
        number: "03",
        title: "The Result",
        text: "A wardrobe that felt effortless, personal and distinctly his own. Every shopping decision became easier to navigate, a 30-year-old family sherwani was given a contemporary second life, and even his eyewear became an integral part of the final styling. The result was a modern groom wardrobe with a strong sense of family and history running through it.",
        image: "/journeys/tushar-result.webp",
        imageCaption: "The Wedding Day Celebration — A complete modern groom presence carrying deep sentimental family history.",
        imageAlt: "Tushar Behl wedding day groom look"
      }
    ]
  },
  {
    id: "02",
    slug: "vishakha-sharma",
    title: "Tradition, Reimagined",
    client: "Vishakha Sharma, 2025 Bride",
    context: "2025 Wedding · Delhi",
    quote: "I wanted our entire family to look like we belong in one frame… Especially with the decor and the entire vibe of Haldi, I think that was amazing. So Himja delivered on all these three points.",
    image: "/journeys/vishakha-hero.webp",
    aspectRatio: "aspect-[3/4] md:aspect-[3/4]",
    styleDirection: "Heritage & Cohesion",
    tags: ["TRADITIONAL", "COHESIVE", "EFFICIENT"],
    description: "A busy professional planning her Delhi wedding from Bangalore, she wanted every trip home to feel purposeful rather than overwhelming. Alongside efficiency, she wanted a wardrobe that felt modern while still carrying pieces of family tradition.",
    brief: "Three things mattered most: making every Delhi shopping trip count, bringing traditional family jewellery into a contemporary bridal wardrobe, and creating a visually cohesive family look that felt considered alongside the décor of each celebration.",
    process: "Each Delhi visit was planned around specific designers, appointments and functions so there was clarity before she even arrived. Existing gold and diamond jewellery from the family was reworked and restyled to sit naturally with her modern wedding looks. For the family, outfits were coordinated event by event — including sourcing the Haldi looks from the same designer to create one cohesive visual story with the décor.",
    result: "A wedding wardrobe that balanced efficiency, sentiment and visual cohesion. Traditional jewellery found a new life within modern looks, shopping trips became focused and productive, and the family came together beautifully as one frame — particularly for the Haldi celebration.",
    sections: [
      {
        id: "brief",
        number: "01",
        title: "The Brief",
        text: "Three things mattered most: making every Delhi shopping trip count, bringing traditional family jewellery into a contemporary bridal wardrobe, and creating a visually cohesive family look that felt considered alongside the décor of each celebration.",
        image: "/journeys/vishakha-brief.webp",
        imageCaption: "Bridal Styling & Heritage Jewelry — Curating focused shopping sprints and pairing family jewels with modern couture.",
        imageAlt: "Vishakha Sharma bridal trousseau and jewelry styling"
      },
      {
        id: "process",
        number: "02",
        title: "The Process",
        text: "Each Delhi visit was planned around specific designers, appointments and functions so there was clarity before she even arrived. Existing gold and diamond jewellery from the family was reworked and restyled to sit naturally with her modern wedding looks. For the family, outfits were coordinated event by event — including sourcing the Haldi looks from the same designer to create one cohesive visual story with the décor.",
        image: "/journeys/vishakha-process.webp",
        imageCaption: "Harmonising Family Looks — Curating cohesive palettes and restyling heirloom jewellery across celebrations.",
        imageAlt: "Coordinated family wedding styling"
      },
      {
        id: "result",
        number: "03",
        title: "The Result",
        text: "A wedding wardrobe that balanced efficiency, sentiment and visual cohesion. Traditional jewellery found a new life within modern looks, shopping trips became focused and productive, and the family came together beautifully as one frame — particularly for the Haldi celebration.",
        image: "/journeys/vishakha-result.webp",
        imageCaption: "The Wedding Day Grandeur — Timeless red bridal lehenga paired with reimagined heritage pieces.",
        imageAlt: "Vishakha Sharma bridal lehenga wedding day"
      }
    ]
  },
  {
    id: "03",
    slug: "vrinda-mittal",
    title: "The Subtle Shift",
    client: "Vrinda Mittal — Chartered Accountant",
    context: "Personal Styling · Across occasions",
    quote: "She has that rare ability to elevate a look while still making you feel completely like yourself — and I think that's what truly gives her an edge.",
    image: "/journey-vrinda.jpg",
    aspectRatio: "aspect-[3/4]",
    styleDirection: "Personal & Intentional",
    tags: ["ELEVATED", "CONSIDERED", "PERSONAL"],
    description: "For Vrinda, styling wasn't about building an entirely new wardrobe. It was about understanding how small, considered changes could make existing looks feel sharper, more intentional and more like her.",
    brief: "Create styling that felt personal rather than prescribed — taking into account not just the outfit, but the occasion, venue, overall mood and the person wearing it. The focus was on elevating looks through thoughtful details without ever making them feel over-styled or unfamiliar.",
    process: "Each look was approached as a complete picture. Sometimes that meant introducing the right belt or accessory; other times, changing how a shirt was worn or rethinking the styling altogether. Recommendations continued beyond individual conversations, with references and ideas shared whenever something particularly suited her — making the process ongoing, intuitive and highly personal.",
    result: "A more considered approach to dressing where even small adjustments could transform the finished look. The styling elevated what Vrinda already owned and wore while still allowing her to feel completely herself — creating a relationship that extended far beyond a single outfit or occasion.",
    sections: [
      {
        id: "brief",
        number: "01",
        title: "The Brief",
        text: "Create styling that felt personal rather than prescribed — taking into account not just the outfit, but the occasion, venue, overall mood and the person wearing it. The focus was on elevating looks through thoughtful details without ever making them feel over-styled or unfamiliar.",
        image: "/journeys/vrinda-brief.webp",
        imageCaption: "Everyday & Occasion Nuances — Identifying key accents, statement sunglasses, and structured silhouette proportions.",
        imageAlt: "Vrinda Mittal contemporary daytime styling"
      },
      {
        id: "process",
        number: "02",
        title: "The Process",
        text: "Each look was approached as a complete picture. Sometimes that meant introducing the right belt or accessory; other times, changing how a shirt was worn or rethinking the styling altogether. Recommendations continued beyond individual conversations, with references and ideas shared whenever something particularly suited her — making the process ongoing, intuitive and highly personal.",
        image: "/journeys/vrinda-process.webp",
        imageCaption: "Detail Elevation — Introducing intentional accessories and delicate necklaces that transform festive ensembles.",
        imageAlt: "Vrinda Mittal festive occasion styling details"
      },
      {
        id: "result",
        number: "03",
        title: "The Result",
        text: "A more considered approach to dressing where even small adjustments could transform the finished look. The styling elevated what Vrinda already owned and wore while still allowing her to feel completely herself — creating a relationship that extended far beyond a single outfit or occasion.",
        image: "/journeys/vrinda-result.webp",
        imageCaption: "Occasion Cohesion — A harmonious family aesthetic across generations that feels natural and effortless.",
        imageAlt: "Vrinda Mittal family occasion styling"
      }
    ]
  }
];

export const testimonials = [
  {
    id: "01",
    category: "CLIENT",
    role: "GROOM",
    quote: "Himja understood exactly what I wanted without making the process feel complicated. She helped me find a look that felt like me, while still fitting perfectly into the overall wedding.",
    name: "[NAME]",
    image: "/journey-groom.jpg"
  },
  {
    id: "02",
    category: "CLIENT",
    role: "BRIDE",
    quote: "What I loved most was how personal the process felt. Himja didn't just look at the outfit — she considered the entire celebration, the colours, the setting and how everything would come together.",
    name: "[NAME]",
    image: "/journey-minimalist.jpg"
  },
  {
    id: "03",
    category: "CLIENT",
    role: "WEDDING GUEST",
    quote: "I went into the process thinking I just needed an outfit. Himja helped me understand what actually worked for me, from the silhouette to the smallest details.",
    name: "[NAME]",
    image: "/journey-heritage.jpg"
  },
  {
    id: "04",
    category: "PERSONAL CIRCLE",
    role: "FRIEND & FELLOW FASHION ENTHUSIAST",
    quote: "What stands out about Himja is her eye. She notices the details most people overlook and has a very natural ability to bring an entire look together.",
    name: "[NAME]",
    image: "/hero-illustration.jpg"
  }
];
