"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import ResumeHeader from "./ResumeHeader";
import ResumePreview from "./ResumePreview";
import PreviewModal from "./modal/PreviewModal";
import ResumeResizableTwoColumn from "./dnd/ResumeResizableTwoColumn";

import ProgressBar from "./controls/ProgressBar";
import StepFooter from "./controls/StepFooter";

import PersonalStep from "./steps/PersonalStep";
import ContactStep from "./steps/ContactStep";
import ExperienceStep from "./steps/ExperienceStep";
import EducationStep from "./steps/EducationStep";
import SkillsStep from "./steps/SkillsStep";
import ProjectsStep from "./steps/ProjectsStep";
import CertificationsStep from "./steps/CertificationsStep";
import AdditionalStep from "./steps/AdditionalStep";

import { useResumeBuilder } from "@/hook/useResumeBuilder";
import { ResumeShape } from "@/types/resumeTemplate";
import MobileStickyBar from "./mobile/MobileStickyBar";
import MobileSheet from "./mobile/MobileSheet";
import ThemeModal from "./modal/ThemeModal";
import { updateField } from "@/utils/apiUtility";
import { apiFetch } from "@/lib/api";

const SectionOrder = dynamic(
  () => import("@/components/(resumes)/resume/SectionOrder"),
  {
    ssr: false,
  },
);

const StepRenderer = ({
  stepKey,
  data,
  setData,
}: {
  stepKey: string;
  data: ResumeShape;
  setData: (patch: ResumeShape | Partial<ResumeShape>) => void;
}) => {
  switch (stepKey) {
    case "personal":
      return <PersonalStep data={data} setData={setData} />;
    case "contact":
      return <ContactStep data={data} setData={setData} />;
    case "experience":
      return <ExperienceStep data={data} setData={setData} />;
    case "education":
      return <EducationStep data={data} setData={setData} />;
    case "skills":
      return <SkillsStep data={data} setData={setData} />;
    case "projects":
      return <ProjectsStep data={data} setData={setData} />;
    case "certifications":
      return <CertificationsStep data={data} setData={setData} />;
    case "additional":
      return <AdditionalStep data={data} setData={setData} />;
    default:
      return null;
  }
};

export default function BuilderClient({ id }: { id: string }) {
  const router = useRouter();
  const {
    templateType,
    setTemplateType,
    data,
    setData,
    step,
    setStep,
    steps,
    completion,
    canProceed,
    save,
    load,
    theme,
    selectedTemplateSlug,
    config,
    configLoading,
    isFallback,
    setConfig,
    setIsFallback,
    setConfigLoading,
  } = useResumeBuilder();

  const [previewOpen, setPreviewOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  const [heading, setHeading] = useState("Untitled Resume");
  const [showSectionOrder, setShowSectionOrder] = useState(false);

  useEffect(() => {
    const slug = data.selectedTemplateSlug || templateType;
    if (!slug) {
      setConfig(null);
      setIsFallback(true);
      return;
    }

    let cancelled = false;

    (async () => {
      try {
        setConfigLoading(true);
        const res = await apiFetch<{ template?: { config?: any } }>(
          `/v1/templates/${slug}`,
        );

        if (cancelled) return;

        if (res?.template?.config) {
          let parsedConfig: any;

          if (typeof res.template.config === "string") {
            try {
              parsedConfig = JSON.parse(res.template.config);
            } catch {
              parsedConfig = null;
            }
          } else {
            parsedConfig = res.template.config;
          }

          if (parsedConfig) {
            setConfig(parsedConfig);
            setIsFallback(false);
          } else {
            setConfig(null);
            setIsFallback(true);
          }
        } else {
          setConfig(null);
          setIsFallback(true);
        }
      } catch {
        if (!cancelled) {
          setConfig(null);
          setIsFallback(true);
        }
      } finally {
        if (!cancelled) setConfigLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [
    data.selectedTemplateSlug,
    templateType,
    setConfig,
    setIsFallback,
    setConfigLoading,
  ]);

  const handleSetData = useCallback(
    (patch: ResumeShape | Partial<ResumeShape>) => {
      setData(patch);
    },
    [setData],
  );

  useEffect(() => {
    if (id) load(id);
  }, [id, load]);

  useEffect(() => {
    if (data?.personal?.fullName?.trim()) {
      setHeading(data.personal.fullName.trim());
    } else {
      setHeading("Untitled Resume");
    }
  }, [data?.personal?.fullName]);

  const goNext = async () => {
    if (!canProceed()) return;
    await save();
    if (step < steps.length - 1) setStep(step + 1);
  };

  const goBack = () => setStep(Math.max(0, step - 1));

  const onSaveExit = async () => {
    await save();
    router.push("/user-dashboard");
  };

  const isLast = step === steps.length - 1;

  return (
    <>
      <MobileStickyBar
        title={heading}
        onLeft={() => setDetailsOpen(true)}
        onRight={() => setThemeOpen(true)}
      />

      {/* Mobile: full-width preview; details in sheet */}
      <section className="min-h-screen bg-gray-50 md:hidden dark:bg-gray-950">
        <div className="px-3 pt-2 pb-24">
          <ResumePreview
            data={data}
            completion={completion}
            templateType={templateType}
            config={config}
            isFallback={isFallback}
          />
        </div>

        <MobileSheet
          open={detailsOpen}
          title="Resume Details"
          onClose={() => setDetailsOpen(false)}
        >
          <div className="space-y-4">
            <ProgressBar
              completion={completion}
              step={step}
              total={steps.length}
              color={theme.color}
            />
            {/* <TemplateSelector value={templateType} onChange={setTemplateType} /> */}
            <div className="mb-2 flex items-center justify-between">
              <span className="font-medium text-gray-700 dark:text-gray-300">
                Sections
              </span>
              <button
                title={
                  showSectionOrder ? "Hide Section Order" : "Show Section Order"
                }
                className="text-dark rounded bg-gray-200 px-2 py-1 text-sm hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                onClick={() => setShowSectionOrder(!showSectionOrder)}
              >
                {/* Show short text on small screens, full text on md+ */}
                <span className="md:hidden">
                  {showSectionOrder ? "Hide" : "Show"}
                </span>
                <span className="hidden md:inline">
                  {showSectionOrder
                    ? "Hide Section Order"
                    : "Show Section Order"}
                </span>
              </button>
            </div>

            {showSectionOrder && (
              <div className="rounded-lg border border-gray-300 bg-gray-50 p-3 dark:border-gray-700 dark:bg-gray-800">
                {/* <h3 className="mb-2 font-semibold text-gray-800 dark:text-gray-100">
                  Section Order
                </h3> */}
                <SectionOrder
                  order={data.order}
                  onChange={(next: string[]) => setData({ order: next as any })}
                />
              </div>
            )}

            <div className="rounded border border-gray-200 p-3 dark:border-gray-700">
              <StepRenderer
                stepKey={steps[step]}
                data={data}
                setData={handleSetData}
              />

              <StepFooter
                canGoBack={step > 0}
                canProceed={canProceed()}
                isLast={isLast}
                onBack={goBack}
                onNext={goNext}
                onSaveExit={async () => {
                  await save();
                  setDetailsOpen(false);
                }}
                onPreview={() => setPreviewOpen(true)}
              />
            </div>
          </div>
        </MobileSheet>

        {themeOpen && (
          <ThemeModal
            current={templateType}
            onClose={() => setThemeOpen(false)}
            onSelect={async (t) => {
              setTemplateType(t);
              setThemeOpen(false);
              await updateField(id, {
                templateType: t,
                selectedTemplateSlug: t,
              });
            }}
          />
        )}
      </section>

      {/* Desktop/tablet: keep your existing two-column layout */}
      <section className="hidden min-h-screen bg-gray-50 py-24 md:block dark:bg-gray-950">
        <div className="container mx-auto grid grid-cols-1 gap-4 rounded bg-white p-4 shadow-sm dark:bg-gray-900">
          <ResumeHeader id={id} />

          <div className="no-scrollbar h-[calc(100vh-0px)]">
            <ResumeResizableTwoColumn
              initial={50}
              minLeft={360}
              minRight={360}
              className="rounded border border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-800"
              left={
                <div className="h-full space-y-5 px-4 py-4">
                  <ProgressBar
                    completion={completion}
                    step={step}
                    total={steps.length}
                    color={theme.color}
                  />

                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                      Sections
                    </span>
                    <button
                      title={
                        showSectionOrder
                          ? "Hide Section Order"
                          : "Show Section Order"
                      }
                      className="text-dark rounded bg-gray-200 px-2 py-1 text-sm hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                      onClick={() => setShowSectionOrder(!showSectionOrder)}
                    >
                      <span className="md:hidden">
                        {showSectionOrder ? "Hide" : "Show"}
                      </span>
                      <span className="hidden md:inline">
                        {showSectionOrder
                          ? "Hide Section Order"
                          : "Show Section Order"}
                      </span>
                    </button>
                  </div>

                  {showSectionOrder && (
                    <div className="rounded-lg border border-gray-300 bg-gray-50 p-3 dark:border-gray-700 dark:bg-gray-800">
                      {/* <h3 className="mb-2 font-semibold text-gray-800 dark:text-gray-100">
                        Section Order
                      </h3> */}
                      <SectionOrder
                        order={data.order}
                        onChange={(next: string[]) =>
                          setData({ order: next as any })
                        }
                      />
                    </div>
                  )}

                  <div className="rounded border border-gray-300 p-4 dark:border-gray-700 dark:bg-gray-800">
                    <StepRenderer
                      stepKey={steps[step]}
                      data={data}
                      setData={handleSetData}
                    />

                    <StepFooter
                      canGoBack={step > 0}
                      canProceed={canProceed()}
                      isLast={isLast}
                      onBack={goBack}
                      onNext={goNext}
                      onSaveExit={onSaveExit}
                      onPreview={() => setPreviewOpen(true)}
                    />
                  </div>
                </div>
              }
              right={
                <div className="no-scrollbar h-full overflow-auto rounded-r">
                  <ResumePreview
                    data={data}
                    completion={completion}
                    templateType={templateType}
                    config={config}
                    isFallback={isFallback}
                  />
                </div>
              }
            />
          </div>
        </div>
      </section>

      <PreviewModal
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        data={data}
        templateType={templateType}
        completion={completion}
      />
    </>
  );
}
