import React from 'react';

interface CardProps {
  title: string;
  description: string;
  date: string;
}

const Card: React.FC<CardProps> = ({ title, description, date }) => {
  return (
    <div className="relative overflow-hidden rounded-xl bg-white p-4 shadow-sm">
      <div className="mb-2 flex justify-between items-center">
        <h2 className="text-xl font-semibold">{title}</h2>
        <span className="text-sm text-gray-500">{date}</span>
      </div>
      <p className="text-gray-700">{description}</p>
      <div className="flex mt-4 space-x-4">
        <button className="px-4 py-2 bg-blue-500 text-white rounded-md">Read more</button>
        <button className="px-4 py-2 bg-green-500 text-white rounded-md">Hide</button>
        {/* <button className="px-4 py-2 bg-yellow-500 text-white rounded-md">Decrypt</button> */}
      </div>
    </div>
  );
};

export default Card;
