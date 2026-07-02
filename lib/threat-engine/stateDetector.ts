const cityStateMap: Record<string, string> = {
  // Maharashtra
  mumbai: "Maharashtra",
  pune: "Maharashtra",
  thane: "Maharashtra",
  nagpur: "Maharashtra",
  nashik: "Maharashtra",
  aurangabad: "Maharashtra",
  solapur: "Maharashtra",
  kolhapur: "Maharashtra",
  amravati: "Maharashtra",
  jalgaon: "Maharashtra",

  // Gujarat
  ahmedabad: "Gujarat",
  surat: "Gujarat",
  vadodara: "Gujarat",
  rajkot: "Gujarat",
  gandhinagar: "Gujarat",
  bhavnagar: "Gujarat",
  jamnagar: "Gujarat",
  junagadh: "Gujarat",

  // Karnataka
  bengaluru: "Karnataka",
  bangalore: "Karnataka",
  mysuru: "Karnataka",
  mangalore: "Karnataka",
  hubli: "Karnataka",
  belagavi: "Karnataka",
  davangere: "Karnataka",

  // Delhi
  delhi: "Delhi",
  "new delhi": "Delhi",

  // Uttar Pradesh
  noida: "Uttar Pradesh",
  ghaziabad: "Uttar Pradesh",
  lucknow: "Uttar Pradesh",
  kanpur: "Uttar Pradesh",
  varanasi: "Uttar Pradesh",
  agra: "Uttar Pradesh",
  prayagraj: "Uttar Pradesh",
  meerut: "Uttar Pradesh",

  // Rajasthan
  jaipur: "Rajasthan",
  jodhpur: "Rajasthan",
  udaipur: "Rajasthan",
  kota: "Rajasthan",
  ajmer: "Rajasthan",
  bikaner: "Rajasthan",

  // Haryana
  gurugram: "Haryana",
  gurgaon: "Haryana",
  faridabad: "Haryana",
  panipat: "Haryana",
  sonipat: "Haryana",
  ambala: "Haryana",

  // Telangana
  hyderabad: "Telangana",
  warangal: "Telangana",
  nizamabad: "Telangana",

  // Andhra Pradesh
  visakhapatnam: "Andhra Pradesh",
  vijayawada: "Andhra Pradesh",
  guntur: "Andhra Pradesh",
  tirupati: "Andhra Pradesh",

  // Tamil Nadu
  chennai: "Tamil Nadu",
  coimbatore: "Tamil Nadu",
  madurai: "Tamil Nadu",
  salem: "Tamil Nadu",
  tiruchirappalli: "Tamil Nadu",

  // Kerala
  kochi: "Kerala",
  kozhikode: "Kerala",
  trivandrum: "Kerala",
  thiruvananthapuram: "Kerala",
  kannur: "Kerala",

  // West Bengal
  kolkata: "West Bengal",
  howrah: "West Bengal",
  siliguri: "West Bengal",
  durgapur: "West Bengal",

  // Punjab
  amritsar: "Punjab",
  ludhiana: "Punjab",
  jalandhar: "Punjab",
  patiala: "Punjab",

  // Bihar
  patna: "Bihar",
  gaya: "Bihar",
  muzaffarpur: "Bihar",

  // Odisha
  bhubaneswar: "Odisha",
  cuttack: "Odisha",
  rourkela: "Odisha",

  // Assam
  guwahati: "Assam",
  dibrugarh: "Assam",
  silchar: "Assam",

  // Madhya Pradesh
  bhopal: "Madhya Pradesh",
  indore: "Madhya Pradesh",
  gwalior: "Madhya Pradesh",
  jabalpur: "Madhya Pradesh",

  // Jharkhand
  ranchi: "Jharkhand",
  jamshedpur: "Jharkhand",
  dhanbad: "Jharkhand",

  // Chhattisgarh
  raipur: "Chhattisgarh",
  bilaspur: "Chhattisgarh",
  durg: "Chhattisgarh",

  // Uttarakhand
  dehradun: "Uttarakhand",
  haridwar: "Uttarakhand",

  // Himachal Pradesh
  shimla: "Himachal Pradesh",

  // Goa
  panaji: "Goa",
  margao: "Goa",

  // Jammu & Kashmir
  srinagar: "Jammu and Kashmir",
  jammu: "Jammu and Kashmir",

  // Chandigarh
  chandigarh: "Chandigarh",

  // North East
  imphal: "Manipur",
  agartala: "Tripura",
  aizawl: "Mizoram",
  kohima: "Nagaland",
  itanagar: "Arunachal Pradesh",
  shillong: "Meghalaya",
  gangtok: "Sikkim",

  // UTs
  puducherry: "Puducherry",
  "port blair": "Andaman and Nicobar Islands",
  leh: "Ladakh",
  kargil: "Ladakh",
};

const stateNames = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Chandigarh",
  "Puducherry",
  "Andaman and Nicobar Islands",
];

export function detectState(text: string): string | null {
  const lower = text.toLowerCase();

  console.log("=================================");
  console.log("ARTICLE:");
  console.log(text.substring(0, 600));
  console.log("=================================");

  // STEP 1 → Direct state names
  for (const state of stateNames) {
    if (lower.includes(state.toLowerCase())) {
      console.log("STATE FOUND:", state);
      return state;
    }
  }

  // STEP 2 → City names
  for (const [city, state] of Object.entries(cityStateMap)) {
    if (lower.includes(city.toLowerCase())) {
      console.log("CITY FOUND:", city);
      console.log("STATE FOUND:", state);
      return state;
    }
  }

  return null;
}