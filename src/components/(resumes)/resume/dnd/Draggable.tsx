
'use client';
import { useState } from 'react';
import ResizableTwoColumn from './ResizableTwoColumn';

function InputPane() {
  return (
    <div style={{ height: '100%', padding: 16, borderRight: '1px solid #e5e7eb' }}>
      <h2 style={{ margin: 0, marginBottom: 8, fontWeight: 600 }}>Input</h2>
      <div style={{ display: 'grid', gap: 8 }}>
        <label>
          Title
          <input style={{ display: 'block', width: '100%', marginTop: 4 }} placeholder="Enter title" />
        </label>
        <label>
          Description
          <textarea rows={6} style={{ display: 'block', width: '100%', marginTop: 4 }} placeholder="Write something..." />
        </label>
      </div>
    </div>
  );
}

function PreviewPane() {
  return (
    <div style={{ height: '100%', padding: 16 }}>
      <h2 style={{ margin: 0, marginBottom: 8, fontWeight: 600 }}>Preview</h2>
      <p style={{ color: '#6b7280' }}>
        Resize the divider to make this preview wider or narrower relative to the input panel.
      </p>
      <div style={{ height: 240, border: '1px dashed #d1d5db', borderRadius: 8 }} />
    </div>
  );
}

export default function App() {
  const [leftPercent, setLeftPercent] = useState(50);
  return (
    <div style={{ height: '80vh', padding: 16, boxSizing: 'border-box' }}>
      <ResizableTwoColumn
        initial={50}      // start 50/50
        minLeft={320}     // input min width
        minRight={320}    // preview min width
        left={<InputPane />}
        right={<PreviewPane />}
        className="rounded border border-gray-200"
        onChange={setLeftPercent}
      />
      <div style={{ marginTop: 8, color: '#6b7280' }}>
        Left width: {Math.round(leftPercent)}%
      </div>
    </div>
  );
}
