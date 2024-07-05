'use client'
import { generateData } from '@/lib/dataGenerator';
import CardEnc from '@/ui/dashboard/overview';
import { CardsSkeleton } from '@/ui/skeletons';
import React, { useState, useEffect } from 'react';

const Dashboard: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a data fetching process
    setTimeout(() => {
      const fetchedData = generateData(6); // Generate 6 items
      setData(fetchedData);
      setLoading(false);
    }, 2000); // Simulate a 2-second loading time
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      {loading ? (
        <CardsSkeleton />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <CardEnc algorithms={data} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
