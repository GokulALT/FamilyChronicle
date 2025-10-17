'use client';

import React from 'react';

export const MaleIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="4" />
    <line x1="12" y1="16" x2="12" y2="22" />
    <line x1="10" y1="20" x2="14" y2="20" />
    <line x1="12" y1="2" x2="12" y2="8" />
    <line x1="14" y1="4" x2="10" y2="4" />

  </svg>
);

export const FemaleIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="4" />
    <line x1="12" y1="16" x2="12" y2="22" />
    <line x1="10" y1="20" x2="14" y2="20" />
  </svg>
);