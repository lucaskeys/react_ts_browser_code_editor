import MDEditor from '@uiw/react-md-editor';
import React, { useEffect, useState, useRef } from 'react';

import './text-editor.scss';

const TextEditor: React.FC = () => {
  const [mdValue, setMdValue] = useState('# Header');
  const ref = useRef<HTMLDivElement | null>(null);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (ref.current && event.target && ref.current.contains(event.target as Node)) {
        return;
      }
      setEditing(false);
    };
    document.addEventListener('click', listener, { capture: true });

    return () => {
      document.removeEventListener('click', listener, { capture: true });
    };
  }, []);

  if (editing) {
    return (
      <div className="text-editor" ref={ref}>
        <MDEditor value={mdValue} onChange={(v) => setMdValue(v || '')} />
      </div>
    );
  }
  return (
    <div className="text-editor card" onClick={() => setEditing(true)}>
      <div className="card-content">
        <MDEditor.Markdown source={mdValue} />
      </div>
    </div>
  );
};

export default TextEditor;
