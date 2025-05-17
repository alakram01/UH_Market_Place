'use client'

import React, { useState } from 'react';
import SellerSummaryCard from './sellerCard';

interface CarouselItem {
  id: number;
  sellerName: string;
  sellerImage: string;
  rating: number;
  totalProducts: number;
  bio: string;
}

interface SellerCarouselProps {
  sellers: CarouselItem[];
}


const SellerCarousel: React.FC<SellerCarouselProps> = ({ sellers }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="relative">
      {/* Carousel Container */}
      <div className="flex gap-8 pb-4 pt-2 overflow-x-auto scroll-smooth">
        {/* Using responsive classes for different screen sizes */}
        <div className="flex gap-4">
          {sellers.map((seller, index) => (
            <div
              className="grid grid-columns-5"
            >
              <SellerSummaryCard
                sellerName={seller.sellerName}
                sellerImage={seller.sellerImage}
                rating={seller.rating}
                totalProducts={seller.totalProducts}
                bio={seller.bio}
              />
            </div>
          ))}
        </div>
      </div>

      
    </div>
  );
};

export default SellerCarousel;