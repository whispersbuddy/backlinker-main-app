'use client'

import { useState } from 'react';
import Image from 'next/image';

interface CompanyCardProps {
  logoSrc: string;
  name: string;
  description: string;
}

const CompanyCard: React.FC<CompanyCardProps> = ({ logoSrc, name, description }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="relative w-56 h-40 perspective-1000 cursor-pointer group"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div className={`absolute w-full h-full transition-transform duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''} rounded-xl shadow-lg`}>
        {/* Front of the card */}
        <div className="absolute w-full h-full backface-hidden bg-white rounded-xl p-6 flex items-center justify-center">
          <div className="relative w-full h-full">
            <Image
              src={logoSrc}
              alt={`${name} Logo`}
              layout="fill"
              objectFit="contain"
              className="p-3"
            />
          </div>
        </div>
        
        {/* Back of the card */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-5 flex items-center justify-center text-center text-white">
          <div>
            <h3 className="font-bold mb-2">{name}</h3>
            <p className="text-sm">{description}</p>
          </div>
        </div>
      </div>
      
      {/* Hover effect */}
      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300"></div>
    </div>
  );
};

export default CompanyCard;
