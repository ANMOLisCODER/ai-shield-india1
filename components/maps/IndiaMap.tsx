"use client";

import { Dispatch, SetStateAction, useState } from "react";

import IndiaSVG from "./IndiaSVG";
import IndiaTooltip from "./IndiaTooltip";

import { TooltipState, Threat } from "./types";
import { useThreatMap } from "./useThreatMap";

type Props = {
  selectedState: Threat | null;
  setSelectedState: Dispatch<
    SetStateAction<Threat | null>
  >;
};

export default function IndiaMap({
  selectedState,
  setSelectedState,
}: Props) {
  const { threats } = useThreatMap();

  const [tooltip, setTooltip] =
    useState<TooltipState>({
      visible: false,

      x: 0,
      y: 0,

      state: "",

      score: 0,

      level: "",

      incidents: 0,

      latestAlert: "",

      updatedAt: "",
    });

  return (
    <div className="relative flex justify-center items-center rounded-3xl bg-[#08101f] p-2 min-h-[700px] xl:min-h-[760px] overflow-hidden">

      <IndiaSVG
        threats={threats}
        setTooltip={setTooltip}
        setSelectedState={setSelectedState}
      />

      {!selectedState && (
        <IndiaTooltip
          tooltip={tooltip}
        />
      )}

      

    </div>
  );
}