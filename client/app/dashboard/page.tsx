"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { Coffee, Utensils } from 'lucide-react';

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [access, setAccess] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      router.push('/');
      return;
    }
    const userData = JSON.parse(storedUser);
    setUser(userData);

    // Fetch access privileges
    api.get(`/membership/${userData._id}/access`)
      .then(res => setAccess(res.data))
      .catch(err => console.error(err));
  }, [router]);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Welcome, {user.username}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Membership Card */}
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
          <h2 className="text-xl font-semibold mb-4">Membership Details</h2>
          <div className="space-y-2">
            <p><span className="font-medium">Type:</span> {user.membershipType}</p>
            <p><span className="font-medium">Status:</span> Active</p>
          </div>
        </div>

        {/* Privileges Card */}
        {access && (
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
            <h2 className="text-xl font-semibold mb-4">Your Privileges</h2>
            <div className="flex flex-col gap-3">
              <div className={`flex items-center gap-2 ${access.food ? 'text-green-600' : 'text-gray-400'}`}>
                <Utensils className="w-5 h-5" />
                <span>Food Access: {access.food ? 'Granted' : 'Denied'}</span>
              </div>
              <div className={`flex items-center gap-2 ${access.drink ? 'text-green-600' : 'text-gray-400'}`}>
                <Coffee className="w-5 h-5" />
                <span>Drink Access: {access.drink ? 'Granted' : 'Denied'}</span>
              </div>
              <p className="text-sm text-gray-500 mt-2">{access.description}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
