"use client";

import { ResumeShape, TemplateConfig } from "@/types/resumeTemplate";
import TwoColumn from "./TemplateLayout/TwoColumn";
import SingleColumn from "./TemplateLayout/SingleColumn";

export default function LayoutRenderer({
  data,
  config,
}: {
  data: ResumeShape;
  config: TemplateConfig;
}) {
  switch (config?.layout?.type) {
    case "two-column":
      return (
        <TwoColumn
          data={data}
          layout={config.layout}
          sections={config.sections}
        />
      );
    case "single-column":
    default:
      return (
        <SingleColumn
          data={data}
          layout={config.layout}
          sections={config.sections}
        />
      );
  }
}
