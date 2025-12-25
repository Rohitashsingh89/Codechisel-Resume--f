"use client";

import SectionRenderer from "../sections";

export default function SingleColumn({ data, layout, sections }: any) {
  const order = layout?.sectionsOrder ?? data?.order;

  return (
    <div className="space-y-4">
      {order.map((key: string) => (
        <SectionRenderer
          key={key}
          sectionKey={key}
          data={data}
          config={sections?.[key]}
        />
      ))}
    </div>
  );
}
