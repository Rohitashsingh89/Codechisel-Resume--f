"use client";

import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "@/hook/reduxHooks";
import { fetchActiveTemplates } from "@/features/themeRegistry/themeRegistrySlice";

export function useThemeRegistry() {
  const dispatch = useAppDispatch();
  const { templates, loading } = useAppSelector(
    (state) => state.themeRegistry
  );

  useEffect(() => {
    if (!templates.length) {
      dispatch(fetchActiveTemplates());
    }
  }, [dispatch, templates.length]);

  const bySlug = useMemo(
    () => Object.fromEntries(templates.map((t) => [t.slug, t])),
    [templates]
  );

  const refresh = () => dispatch(fetchActiveTemplates());

  return { templates, bySlug, loading, refresh };
}
