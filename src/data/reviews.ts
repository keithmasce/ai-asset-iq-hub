// [PLACEHOLDER] Reviews — swap for CMS/API later
export type Review = {
  id: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
  name: string;
  role: string;
  date: string;
  service: "Enterprise" | "Financial";
};

export const REVIEWS: Review[] = [
  { id: "1", rating: 5, text: "AI Asset IQ helped us cut unplanned downtime on our compressor fleet by 38% in six months. Their team is sharp, pragmatic, and refreshingly free of buzzwords.", name: "Marcus Whitfield", role: "VP Operations, Midstream Energy Co.", date: "2025-03-01", service: "Enterprise" },
  { id: "2", rating: 5, text: "I came in overwhelmed by debt and a confusing pile of insurance policies. The plan they built me was the first time anything financial actually made sense.", name: "Priya Ramaswamy", role: "Software Engineer", date: "2025-02-22", service: "Financial" },
  { id: "3", rating: 5, text: "Their AI strategy roadmap saved us from a six-figure mistake. Instead of a flashy platform, they pushed us to fix our data foundation first.", name: "Daniel Okafor", role: "CTO, Regional Utility", date: "2025-02-10", service: "Enterprise" },
  { id: "4", rating: 4, text: "Friendly, knowledgeable, and patient. The retirement calculator alone changed how my husband and I think about the next decade.", name: "Sarah Lindgren", role: "Teacher", date: "2025-01-30", service: "Financial" },
  { id: "5", rating: 5, text: "The Safety Agent prototype they walked us through was honestly the most impressive AI demo we've seen this year. Can't wait for GA.", name: "Elena Vasquez", role: "Director of HSE, Solar Developer", date: "2025-01-18", service: "Enterprise" },
  { id: "6", rating: 5, text: "I used the financial plan builder, then booked a consult. Worth every minute. Got referred to a refinancing product that saved $340/mo.", name: "James O'Connor", role: "Small Business Owner", date: "2024-12-29", service: "Financial" },
  { id: "7", rating: 4, text: "Their grid optimization workshop reframed three projects on our 2025 roadmap. Strong technical depth.", name: "Hiroshi Tanaka", role: "Engineering Lead, Co-op Utility", date: "2024-12-15", service: "Enterprise" },
  { id: "8", rating: 5, text: "Clear, kind, and deeply competent. They treat your future like it's their own.", name: "Aisha Bello", role: "Nurse Practitioner", date: "2024-11-30", service: "Financial" },
];