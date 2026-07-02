"use client";

import { useEffect, useState } from "react";
import { Threat } from "./types";

export function useThreatMap() {
  const [threats, setThreats] = useState<Threat[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadThreats() {
    try {

      // STEP 1
      // Latest news process karo

      await fetch("/api/update-threat-map", {
        cache: "no-store",
      });

      // STEP 2
      // Updated states lao

      const res = await fetch("/api/state-threats", {
        cache: "no-store",
      });

      const data = await res.json();

      setThreats(data ?? []);

    } catch (err) {

      console.error(err);

    } finally {

      setLoading(false);

    }
  }

  useEffect(() => {

    loadThreats();

    const interval = setInterval(() => {
      loadThreats();
    }, 30000);

    return () => clearInterval(interval);

  }, []);

  return {
    threats,
    loading,
    reload: loadThreats,
  };
}