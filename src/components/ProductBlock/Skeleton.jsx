import React from 'react';
import ContentLoader from 'react-content-loader';

export const Skeleton = () => (
  <ContentLoader
    speed={2}
    width={265}
    height={325}
    viewBox="0 0 265 325"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb">
    <rect x="0" y="0" rx="0" ry="0" width="265" height="263" />
    <rect x="0" y="280" rx="0" ry="0" width="157" height="17" />
    <rect x="0" y="306" rx="0" ry="0" width="95" height="17" />
  </ContentLoader>
);
