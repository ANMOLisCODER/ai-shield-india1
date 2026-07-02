"use client";

import { useEffect, useRef } from "react";
import SVG from "react-inlinesvg";

import { Threat, TooltipState } from "./types";
import {
  stateIdMap,
  getThreatColor,
  getGlow,
} from "./constants";

type Props = {
  threats: Threat[];

  setTooltip: React.Dispatch<
    React.SetStateAction<TooltipState>
  >;

  setSelectedState: React.Dispatch<
    React.SetStateAction<Threat | null>
  >;
};

export default function IndiaSVG({
  threats,
  setTooltip,
  setSelectedState,
}: Props) {

  const loaded = useRef(false);

  useEffect(() => {

    if (!loaded.current) return;

    threats.forEach((item) => {

      const svgId = stateIdMap[item.state];

      if (!svgId) return;

      const state =
        document.getElementById(svgId);

      if (!state) return;

      state.setAttribute(
        "fill",
        getThreatColor(item.threat_score)
      );

      state.style.cursor = "pointer";
      state.style.transition = "all .35s ease";
      state.style.filter = getGlow(
        item.threat_score
      );

      if (item.threat_score >= 75) {

        state.animate(
          [
            { opacity: 1 },
            { opacity: .55 },
            { opacity: 1 },
          ],
          {
            duration: 1200,
            iterations: Infinity,
          }
        );

      }

      state.onmouseenter = (e: any) => {


        state.style.opacity = ".9";
        state.style.stroke = "#22d3ee";
        state.style.strokeWidth = "2";
        state.style.transformOrigin =
          "center";
        state.style.transform =
          "scale(1.03)";

        setTooltip({
          visible: true,

          x: e.clientX,
          y: e.clientY,

          state: item.state,
          score: item.threat_score,
          level: item.threat_level,
          incidents: item.incidents,

          latestAlert:
            item.latest_alert ??
            "No recent alert available.",

          updatedAt:
            item.updated_at
              ? new Date(
                  item.updated_at
                ).toLocaleString()
              : "Unknown",
        });

      };

      state.onmousemove = (e: any) => {

        setTooltip((prev) => ({
          ...prev,
          x: e.clientX,
          y: e.clientY,
        }));

      };
      state.onclick = () => {
  setSelectedState(item);
};

      state.onmouseleave = () => {

        state.style.opacity = "1";
        state.style.stroke = "";
        state.style.strokeWidth = "";
        state.style.transform = "scale(1)";
        state.style.filter =
          getGlow(item.threat_score);

        setTooltip((prev) => ({
          ...prev,
          visible: false,
        }));

      };

    });

  }, [threats, setTooltip]);

  return (

    <SVG
      src="/maps/india.svg"
      width="100%"
      height="1050px"
      className="w-full max-w-[1150px]"

      onLoad={() => {
        loaded.current = true;
      }}
    />

  );
}