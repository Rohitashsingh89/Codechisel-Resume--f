"use client";

import { useAppDispatch, useAppSelector } from "@/hook/reduxHooks";
import {
  setTemplateType,
  setData,
  updateData,
  setStep,
  setTheme,
  setDirty,
  loadResumeForBuilder,
  saveResume,
  setConfig,
  setIsFallback,
  setConfigLoading,
} from "@/features/resumeBuilder/resumeBuilderSlice";
import { useCallback } from "react";
import type { TemplateType, ResumeShape } from "@/types/resumeTemplate";

export function useResumeBuilder() {
  const dispatch = useAppDispatch();
  const state = useAppSelector((s) => s.resumeBuilder);

  const changeTemplateType = useCallback(
    (v: TemplateType) => dispatch(setTemplateType(v)),
    [dispatch],
  );

  const changeData = useCallback(
    (patch: Partial<ResumeShape> | ResumeShape) => dispatch(setData(patch)),
    [dispatch],
  );

  const changeDataWithFn = useCallback(
    (fn: (prev: ResumeShape) => ResumeShape) => dispatch(updateData(fn)),
    [dispatch],
  );

  const changeStep = useCallback(
    (n: number) => dispatch(setStep(n)),
    [dispatch],
  );

  const changeTheme = useCallback(
    (theme: { mode: "light" | "dark"; color: string }) =>
      dispatch(setTheme(theme)),
    [dispatch],
  );

  const markDirty = useCallback(
    (v: boolean) => dispatch(setDirty(v)),
    [dispatch],
  );

  const load = useCallback(
    (resumeId: string) => dispatch(loadResumeForBuilder(resumeId)),
    [dispatch],
  );

  const save = useCallback(() => dispatch(saveResume()), [dispatch]);

  const changeConfigLoading = useCallback(
    (cfg: any | null) => dispatch(setConfigLoading(cfg)),
    [dispatch],
  );

  const changeConfig = useCallback(
    (cfg: any | null) => dispatch(setConfig(cfg)),
    [dispatch],
  );

  const changeIsFallback = useCallback(
    (v: boolean) => dispatch(setIsFallback(v)),
    [dispatch],
  );

  const canProceed = (s = state.step) => {
    const steps = state.steps;
    const data = state.data;
    const key = steps[s];

    const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
    const isPhone10 = (v: string) => /^\d{10}$/.test(v);

    if (key === "personal")
      return Boolean(
        data.personal.fullName &&
          data.personal.designation &&
          data.personal.summary,
      );
    if (key === "contact")
      return isEmail(data.contact.email) && isPhone10(data.contact.phone);
    return true;
  };

  return {
    ...state,
    setTemplateType: changeTemplateType,
    setData: changeData,
    setDataWithFn: changeDataWithFn,
    setStep: changeStep,
    setTheme: changeTheme,
    setDirty: markDirty,
    load,
    save,
    canProceed,
    setConfig: changeConfig,
    setIsFallback: changeIsFallback,
    setConfigLoading: changeConfigLoading,
  };
}
