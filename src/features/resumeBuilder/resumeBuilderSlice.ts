"use client";

import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { apiFetch } from "@/lib/api";
import { ResumeShape, TemplateType } from "@/types/resumeTemplate";
import type { RootState } from "@/store";

type Theme = { mode: "light" | "dark"; color: string };

export type ResumeChangeEvent = {
  seq: number;
  ts: number;
  changed: "data" | "templateType" | "step" | "external";
  step?: number;
  note?: string;
};

const stepsConst = [
  "personal",
  "contact",
  "experience",
  "education",
  "skills",
  "projects",
  "certifications",
  "additional",
] as const;

export type StepKey = (typeof stepsConst)[number];

export type ResumeBuilderState = {
  resumeId?: string; // current resume id (builder ke liye)
  templateType: TemplateType;
  data: ResumeShape;
  step: number;
  steps: typeof stepsConst;
  completion: number;
  dirty: boolean;
  theme: Theme;
  loading: boolean;
  lastChangeSeq: number;
  lastChangeTs: number;
};

const initialData: ResumeShape = {
  resumeName: "",
  personal: { fullName: "", designation: "", summary: "" },
  contact: {
    address: "",
    email: "",
    phone: "",
    linkedin: "",
    github: "",
    website: "",
  },
  experience: [],
  education: [],
  skills: [],
  projects: [],
  certifications: [],
  additional: { languages: [], interests: [] },
  order: [...stepsConst],
};

const initialState: ResumeBuilderState = {
  resumeId: undefined,
  templateType: "classic",
  data: initialData,
  step: 0,
  steps: stepsConst,
  completion: 0,
  dirty: false,
  theme: { mode: "light", color: "#2563eb" },
  loading: false,
  lastChangeSeq: 0,
  lastChangeTs: 0,
};

function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}
function isPhone10(v: string) {
  return /^\d{10}$/.test(v);
}

function computeCompletion(data: ResumeShape): number {
  let total = 0,
    filled = 0;

  // personal: fullName, designation, summary
  total += 3;
  filled += Number(Boolean(data.personal.fullName.trim()));
  filled += Number(Boolean(data.personal.designation.trim()));
  filled += Number(Boolean(data.personal.summary.trim()));

  // contact: email, phone
  total += 2;
  filled += Number(isEmail(data.contact.email));
  filled += Number(isPhone10(data.contact.phone));

  // experience, education, skills, projects
  total += 4;
  filled += Number(data.experience.length > 0);
  filled += Number(data.education.length > 0);
  filled += Number(data.skills.length > 0);
  filled += Number(data.projects.length > 0);

  return total ? (filled / total) * 100 : 0;
}

// 🔹 API: load ek resume for builder
export const loadResumeForBuilder = createAsyncThunk<
  {
    resumeId: string;
    templateType: TemplateType;
    data: ResumeShape;
    theme: Theme;
  },
  string
>("resumeBuilder/loadResumeForBuilder", async (resumeId: string) => {
  const res = await apiFetch<{ item: any }>(`/v1/resumes/${resumeId}`, {
    method: "GET"
  });
  const it = res.item || {};
  return {
    resumeId,
    templateType: (it.templateType as TemplateType) || "classic",
    data: { ...initialData, ...(it.resumeData || {}), resumeName: it.resumeName || it.resumeData?.resumeName || "", },
    theme: it.theme ?? { mode: "light", color: "#2563eb" },
  };
});

// 🔹 API: save resume (PUT)
export const saveResume = createAsyncThunk<void, void, { state: RootState }>(
  "resumeBuilder/saveResume",
  async (_, thunkApi) => {
    
    const state = thunkApi.getState().resumeBuilder;
    const { resumeId, templateType, data, theme } = state;

    if (!resumeId) return;

    await apiFetch(`/v1/resumes/${resumeId}`, {
      method: "PUT",
      // headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ templateType, resumeData: data, theme, resumeName: data.resumeName }),
    });
  },
);

const resumeBuilderSlice = createSlice({
  name: "resumeBuilder",
  initialState,
  reducers: {
    setResumeId(state, action: PayloadAction<string | undefined>) {
      state.resumeId = action.payload;
    },

    setTemplateType(state, action: PayloadAction<TemplateType>) {
      state.templateType = action.payload;
      state.dirty = true;
      state.completion = computeCompletion(state.data);
      state.lastChangeSeq += 1;
      state.lastChangeTs = Date.now();
    },

    setData(state, action: PayloadAction<Partial<ResumeShape> | ResumeShape>) {
      state.data = { ...state.data, ...action.payload };
      state.dirty = true;
      state.completion = computeCompletion(state.data);
      state.lastChangeSeq += 1;
      state.lastChangeTs = Date.now();
    },

    // more granular update helper (eg. only personal / contact)
    updateData(
      state,
      action: PayloadAction<(prev: ResumeShape) => ResumeShape>,
    ) {
      state.data = action.payload(state.data);
      state.dirty = true;
      state.completion = computeCompletion(state.data);
      state.lastChangeSeq += 1;
      state.lastChangeTs = Date.now();
    },

    setStep(state, action: PayloadAction<number>) {
      state.step = action.payload;
      state.lastChangeSeq += 1;
      state.lastChangeTs = Date.now();
    },

    setTheme(state, action: PayloadAction<Theme>) {
      state.theme = action.payload;
      state.dirty = true;
      state.lastChangeSeq += 1;
      state.lastChangeTs = Date.now();
    },

    setDirty(state, action: PayloadAction<boolean>) {
      state.dirty = action.payload;
    },

    resetBuilder(state) {
      Object.assign(state, initialState);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadResumeForBuilder.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadResumeForBuilder.fulfilled, (state, action) => {
        state.loading = false;
        state.resumeId = action.payload.resumeId;
        state.templateType = action.payload.templateType;
        state.data = action.payload.data;
        state.theme = action.payload.theme;
        state.completion = computeCompletion(state.data);
        state.dirty = false;
        state.lastChangeSeq += 1;
        state.lastChangeTs = Date.now();
      })
      .addCase(loadResumeForBuilder.rejected, (state) => {
        state.loading = false;
      })
      .addCase(saveResume.fulfilled, (state) => {
        state.dirty = false;
        state.lastChangeSeq += 1;
        state.lastChangeTs = Date.now();
      });
  },
});

export const {
  setResumeId,
  setTemplateType,
  setData,
  updateData,
  setStep,
  setTheme,
  setDirty,
  resetBuilder,
} = resumeBuilderSlice.actions;

export default resumeBuilderSlice.reducer;
