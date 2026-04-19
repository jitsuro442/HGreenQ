import { useState, useEffect } from 'react';

let _id = 0;
const _listeners = [];

export function showToast(msg, icon = '🌿') {
  const id = ++_id;
  _listeners.forEach(fn => fn({ id, msg, icon }));
}

export function ToastContainer() {
  const [toasts, setToasts] = useState([]);
  useEffect(() => {
    const add = t => {
      setToasts(p => [...p, t]);
      setTimeout(() => setToasts(p => p.filter(x => x.id !== t.id)), 2800);
    };
    _listeners.push(add);
    return () => { const i = _listeners.indexOf(add); if (i > -1) _listeners.splice(i, 1); };
  }, []);
  return (
    <div className="toast-wrap">
      {toasts.map(t => (
        <div className="toast" key={t.id}>
          <span>{t.icon}</span>{t.msg}
        </div>
      ))}
    </div>
  );
}
