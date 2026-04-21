// [PLACEHOLDER] Blog content — swap for CMS/API later
export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: "AI & Automation" | "Energy Sector" | "Financial Planning" | "Industry News";
  date: string;
  readTime: string;
  author: string;
  content: string;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "ai-transforming-renewable-energy",
    title: "How AI Is Transforming Renewable Energy Operations",
    excerpt: "From predictive maintenance on wind turbines to grid balancing, AI is reshaping the renewables landscape.",
    category: "Energy Sector",
    date: "2025-03-12",
    readTime: "6 min",
    author: "Editorial Team",
    content: "AI is moving from buzzword to backbone in modern renewables. Operators are using machine learning models to forecast wind patterns hours in advance, schedule maintenance before failures occur, and stabilize grids with real-time storage decisions.\n\nIn this article we explore three case studies and the implementation playbook our consultants use with mid-market operators.",
  },
  {
    slug: "small-business-ai-playbook",
    title: "The Small Business Guide to Adopting AI in 2025",
    excerpt: "A practical, no-jargon framework for SMB leaders evaluating AI investments this year.",
    category: "AI & Automation",
    date: "2025-02-28",
    readTime: "8 min",
    author: "Editorial Team",
    content: "Most AI articles target enterprises with massive data teams. This piece is for the operators running businesses with 20–500 employees who want measurable ROI in 90 days, not 9 months.",
  },
  {
    slug: "ai-financial-planning-revolution",
    title: "Personalized Financial Planning, Powered by AI",
    excerpt: "How AI is making sophisticated financial planning accessible to everyone—not just high-net-worth clients.",
    category: "Financial Planning",
    date: "2025-02-15",
    readTime: "5 min",
    author: "Editorial Team",
    content: "For decades, real financial planning was reserved for those who could afford a private advisor. AI is rewriting that equation.",
  },
  {
    slug: "predictive-maintenance-oil-gas",
    title: "Predictive Maintenance ROI in Oil & Gas Midstream",
    excerpt: "Real numbers from operators who deployed AI-driven asset intelligence on critical infrastructure.",
    category: "Energy Sector",
    date: "2025-02-04",
    readTime: "7 min",
    author: "Editorial Team",
    content: "Unplanned downtime on a midstream compressor can cost $50K–$250K per day. Predictive models trained on vibration, temperature, and pressure data are bringing that number to near-zero for early adopters.",
  },
  {
    slug: "grid-modernization-utilities",
    title: "Grid Modernization: A Roadmap for Mid-Sized Utilities",
    excerpt: "Five priorities for utilities navigating the energy transition without billion-dollar budgets.",
    category: "Industry News",
    date: "2025-01-22",
    readTime: "9 min",
    author: "Editorial Team",
    content: "Mid-sized utilities face a unique squeeze: rising customer expectations, regulatory pressure, and aging infrastructure—without the capital of investor-owned giants.",
  },
  {
    slug: "wills-trusts-modern-families",
    title: "Wills & Trusts: A Modern Family's Starter Guide",
    excerpt: "Estate planning isn't just for the wealthy. Here's what every family should put in place today.",
    category: "Financial Planning",
    date: "2025-01-10",
    readTime: "4 min",
    author: "Editorial Team",
    content: "Estate planning has a perception problem. People assume it's complex, expensive, and only relevant after a certain net worth. None of that is true anymore.",
  },
];

export const BLOG_CATEGORIES = [
  "All",
  "AI & Automation",
  "Energy Sector",
  "Financial Planning",
  "Industry News",
] as const;