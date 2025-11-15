import React from 'react';

export default function KPI({ label, value }) {
  return (
    <div style={{ width: '23%', backgroundColor: '#f1f1f1', padding: '15px', borderRadius: '8px', textAlign: 'center' }}>
      <div>{label}</div>
      <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{value ?? '-'}</div>
    </div>
  );
}
