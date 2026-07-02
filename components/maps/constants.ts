import { Threat } from "./types";

export const stateIdMap: Record<string, string> = {
  "Andaman and Nicobar": "INAN",
  "Andhra Pradesh": "INAP",
  "Arunachal Pradesh": "INAR",
  "Assam": "INAS",
  "Bihar": "INBR",
  "Chandigarh": "INCH",
  "Chhattisgarh": "INCT",
  "Dadra and Nagar Haveli and Daman and Diu": "INDH",
  "Delhi": "INDL",
  "Goa": "INGA",
  "Gujarat": "INGJ",
  "Haryana": "INHR",
  "Himachal Pradesh": "INHP",
  "Jharkhand": "INJH",
  "Karnataka": "INKA",
  "Kerala": "INKL",
  "Madhya Pradesh": "INMP",
  "Maharashtra": "INMH",
  "Manipur": "INMN",
  "Meghalaya": "INML",
  "Mizoram": "INMZ",
  "Nagaland": "INNL",
  "Odisha": "INOR",
  "Puducherry": "INPY",
  "Punjab": "INPB",
  "Rajasthan": "INRJ",
  "Sikkim": "INSK",
  "Tamil Nadu": "INTN",
  "Telangana": "INTG",
  "Tripura": "INTR",
  "Uttar Pradesh": "INUP",
  "Uttarakhand": "INUT",
  "West Bengal": "INWB",
  "Lakshadweep": "INLD",
  "Jammu and Kashmir": "INJK",
  "Ladakh": "INLA",
};

export function getThreatColor(score: number) {
  if (score >= 75) return "#ef4444";
  if (score >= 50) return "#f97316";
  if (score >= 25) return "#facc15";
  return "#22c55e";
}

export function getGlow(score: number) {
  if (score >= 75)
    return "drop-shadow(0 0 14px rgba(239,68,68,.9))";

  if (score >= 50)
    return "drop-shadow(0 0 12px rgba(249,115,22,.8))";

  if (score >= 25)
    return "drop-shadow(0 0 10px rgba(250,204,21,.8))";

  return "";
}

export function sortThreats(threats: Threat[]) {
  return [...threats].sort(
    (a, b) => b.threat_score - a.threat_score
  );
}