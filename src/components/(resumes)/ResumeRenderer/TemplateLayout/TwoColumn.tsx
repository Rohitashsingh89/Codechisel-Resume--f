"use client";

import SectionRenderer from "../sections";

export default function TwoColumn({ data, layout, sections }: any) {
  const ratio = layout.columnRatio ?? "70:30";
  const [left, right] = ratio.split(":").map(Number);

  return (
    <div
      className="grid gap-6"
      style={{ gridTemplateColumns: `${left}fr ${right}fr` }}
    >
      <div className="space-y-4">
        {layout.leftColumnSections.map((k: string) => (
          <SectionRenderer
            key={k}
            sectionKey={k}
            data={data}
            config={sections?.[k]}
          />
        ))}
      </div>

      <div className="space-y-4">
        {layout.rightColumnSections.map((k: string) => (
          <SectionRenderer
            key={k}
            sectionKey={k}
            data={data}
            config={sections?.[k]}
          />
        ))}
      </div>
    </div>
  );
}
