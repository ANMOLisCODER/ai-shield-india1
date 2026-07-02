export type Threat = {
  state: string;
  threat_score: number;
  threat_level: string;
  incidents: number;
  latest_alert: string | null;
  updated_at: string | null;
};

export type TooltipState = {
  visible: boolean;
  x: number;
  y: number;

  state: string;

  score: number;

  level: string;

  incidents: number;

  latestAlert: string;

  updatedAt: string;
};