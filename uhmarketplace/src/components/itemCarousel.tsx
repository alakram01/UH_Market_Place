// components/ItemCarousel.tsx
'use client'
import React, { useState } from 'react';
import ItemCard from './itemCard';
import { post } from '@prisma/client';
import Link from 'next/link';

interface ItemCarouselProps {
  items: post[]
}

const ItemCarousel: React.FC<ItemCarouselProps> = ({ items }) => {

  return (
    <div className="relative">
      {/* Carousel Container */}
      {/* <div className="grid grid-columns-4 gap-8 pb-4 pt-2 overflow-x-auto scroll-smooth"></div> */}
      <div className="flex gap-8 pb-4 pt-2 overflow-x-auto scroll-smooth">
        {/* Using responsive classes for different screen sizes */}
        <div className="ml-8 flex gap-4 sm:w-[calc(100%-48px)] md:w-[calc(100%-96px)] lg:w-[calc(100%-144px)] xl:w-[calc(100%-192px)]">
          {items.map((item, index) => (
            <div
              key={item.id}
            >
              <Link href={`/marketplace/${item.id}`}>
                <ItemCard
                  item={item}
                  // onAddToCart={item.onAddToCart}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-red-600 text-white p-2 rounded-full shadow-lg hover:bg-red-700"
      >
        &#8249;
      </button>
      <button
        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-red-600 text-white p-2 rounded-full shadow-lg hover:bg-red-700"
      >
        &#8250;
      </button>
    </div>
  );
};

export default ItemCarousel;