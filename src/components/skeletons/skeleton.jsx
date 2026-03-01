import React from 'react';
import './skeleton.css';

export default function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skeleton-image pulse"></div>
      <div className="skeleton-body">
        <div className="skeleton-text title pulse"></div>
        <div className="skeleton-text subtitle pulse"></div>
      </div>
    </div>
  );
}

export function SkeletonGrid({ count = 12 }) {
  return (
    <div className="movie-card-grid">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
