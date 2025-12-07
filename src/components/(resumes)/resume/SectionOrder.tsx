'use client';

import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function Row({ id, label }: { id: string; label: string }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });
  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <div ref={setNodeRef} style={style} className="border border-gray-300 dark:border-gray-700 rounded px-3 py-2 flex justify-between items-center dark:bg-gray-900 bg-white text-dark dark:text-gray-200">
      <span>{label}</span>
      <button className="text-sm" {...attributes} {...listeners} aria-label="Drag">↕</button>
    </div>
  );
}

const LABELS: Record<string, string> = {
  personal: 'Personal Information',
  contact: 'Contact Information',
  experience: 'Work Experience',
  education: 'Education',
  skills: 'Skills',
  projects: 'Projects',
  certifications: 'Certifications',
  additional: 'Additional Information',
};

export default function SectionOrder({ order, onChange }: { order: string[]; onChange: (next: string[]) => void }) {
  const sensors = useSensors(useSensor(PointerSensor));
  return (
    <div className="space-y-2">
      <h4 className="font-semibold text-dark dark:text-gray-200">Reorder Sections</h4>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={({ active, over }) => {
        if (!over || active.id === over.id) return;
        const oldIndex = order.indexOf(String(active.id));
        const newIndex = order.indexOf(String(over.id));
        onChange(arrayMove(order, oldIndex, newIndex));
      }}>
        <SortableContext items={order} strategy={verticalListSortingStrategy}>
          <div className="space-y-2">
            {order.map(id => <Row key={id} id={id} label={LABELS[id]} />)}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}
