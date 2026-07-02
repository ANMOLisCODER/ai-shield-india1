export interface StateThreat {
  id: string;
  state: string;
 capital: string;
  region: string;

  threatLevel: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

  threatScore: number;

  totalIncidents: number;

  topScams: string[];

  latestAlert: string;

  newsCount: number;

  color: string;
}

export const STATES: StateThreat[] = [
  {
    id: "MH",
    state: "Maharashtra",
    capital: "Mumbai",
    region: "West",

    threatLevel: "LOW",
    threatScore: 0,
    totalIncidents: 0,

    topScams: [],

    latestAlert: "",

    newsCount: 0,

    color: "#22c55e",
  },

  {
    id: "DL",
    state: "Delhi",
    capital: "New Delhi",
    region: "North",

    threatLevel: "LOW",
    threatScore: 0,
    totalIncidents: 0,

    topScams: [],

    latestAlert: "",

    newsCount: 0,

    color: "#22c55e",
  },

  {
    id: "GJ",
    state: "Gujarat",
    capital: "Gandhinagar",
    region: "West",

    threatLevel: "LOW",
    threatScore: 0,
    totalIncidents: 0,

    topScams: [],

    latestAlert: "",

    newsCount: 0,

    color: "#22c55e",
  },

  {
    id: "KA",
    state: "Karnataka",
    capital: "Bengaluru",
    region: "South",

    threatLevel: "LOW",
    threatScore: 0,
    totalIncidents: 0,

    topScams: [],

    latestAlert: "",

    newsCount: 0,

    color: "#22c55e",
  },

  {
    id: "TN",
    state: "Tamil Nadu",
    capital: "Chennai",
    region: "South",

    threatLevel: "LOW",
    threatScore: 0,
    totalIncidents: 0,

    topScams: [],

    latestAlert: "",

    newsCount: 0,

    color: "#22c55e",
  },
];