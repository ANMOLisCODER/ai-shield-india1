export function getNewsImportance(text: string): number {
  const lower = text.toLowerCase();

  // Critical incidents
  if (
    lower.includes("ransomware") ||
    lower.includes("data breach") ||
    lower.includes("database leak") ||
    lower.includes("critical vulnerability") ||
    lower.includes("zero-day") ||
    lower.includes("cyber attack")
  ) {
    return 100;
  }

  // Large frauds
  if (
    lower.includes("crore") ||
    lower.includes("lakhs") ||
    lower.includes("thousands of users") ||
    lower.includes("millions of users") ||
    lower.includes("massive fraud") ||
    lower.includes("financial loss")
  ) {
    return 80;
  }

  // Common scams
  if (
    lower.includes("upi") ||
    lower.includes("bank fraud") ||
    lower.includes("phishing") ||
    lower.includes("otp") ||
    lower.includes("digital arrest")
  ) {
    return 60;
  }

  // Awareness / advisory
  if (
    lower.includes("advisory") ||
    lower.includes("warning") ||
    lower.includes("awareness") ||
    lower.includes("tips") ||
    lower.includes("prevent") ||
    lower.includes("how to avoid")
  ) {
    return 30;
  }

  return 40;
}