import React from 'react';
import ExploreCard from './ExploreCard';
import { exploreItems } from '../data/mockData';

const Explore = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {exploreItems.map((item, index) => (
        <ExploreCard key={index} item={item} />
      ))}
    </div>
  );
};

export default Explore;