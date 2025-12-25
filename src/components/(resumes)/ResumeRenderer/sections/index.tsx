"use client";

import sectionRegistry from "./registry";
import FallbackSection from "./FallbackSection";

type Props = {
  sectionKey: string;
  data: any;
  config?: any;
};

export default function SectionRenderer({ sectionKey, data, config }: Props) {
  const Component = sectionRegistry[sectionKey] ?? FallbackSection;

  return <Component data={data} config={config} sectionKey={sectionKey} />;
}
