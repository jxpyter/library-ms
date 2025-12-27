"use client";
import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { HelpCircle } from 'lucide-react';
import 'intro.js/introjs.css';

interface Desk {
  _id: string;
  number: number;
  isOccupied: boolean;
}

export default function DesksPage() {
  const [desks, setDesks] = useState<Desk[]>([]); // Fixed Type
  const [selectedDesk, setSelectedDesk] = useState<string | null>(null);
  const [duration, setDuration] = useState(1);
  const [startTime, setStartTime] = useState('');
  const [user, setUser] = useState<any>(null);
  
  const startTutorial = async () => {
    const introJs = (await import('intro.js')).default;
    
    introJs().setOptions({
      steps: [
        {
          element: '.desk-grid',
          intro: 'This grid shows real-time availability of desks. In the backend, we query the "Desks" collection via Mongoose.',
          position: 'right',
        },
        {
          element: '.desk-item',
          intro: 'Each desk has a unique ID. When you click one, we select it for the reservation payload.',
        },
        {
          element: '.duration-select',
          intro: '<h3>Logic Check!</h3><p>We only allow 1 to 4 hours. The backend <code>/desks/reserve</code> endpoint validates: <code>if (duration < 1 || duration > 4) throw Error</code>.</p>',
        },
        {
          element: '.submit-btn',
          intro: 'Clicking this sends a POST request with { userId, deskId, startTime, endTime }.',
        }
      ],
      showProgress: true,
      showBullets: false,
    }).start();
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
    fetchDesks();
  }, []);

  const fetchDesks = async () => {
    try {
      const res = await api.get('/desks');
      setDesks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleReserve = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDesk || !user) return;

    const start = new Date(startTime);
    const end = new Date(start.getTime() + duration * 60 * 60 * 1000);

    try {
      await api.post('/desks/reserve', {
        userId: user._id,
        deskId: selectedDesk,
        startTime: start,
        endTime: end
      });
      alert('Desk reserved successfully!');
      setSelectedDesk(null);
      fetchDesks(); // Refresh to show changes if we had real-time status
    } catch (err: any) {
      alert(err.response?.data?.error || 'Failed to reserve');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Desk Reservation</h1>
        <button 
          onClick={startTutorial}
          className="flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full hover:bg-purple-200"
        >
          <HelpCircle className="w-5 h-5" />
          Explain Logic
        </button>
      </div>
      
      {/* Tutorial Component removed, logic moved to startTutorial function */}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Desk Map (Grid) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md desk-grid">
           <h2 className="text-xl font-semibold mb-4">Select a Desk</h2>
           <div className="grid grid-cols-4 gap-4">
              {desks.map((desk) => (
                <button
                  key={desk._id}
                  onClick={() => setSelectedDesk(desk._id)}
                  className={`desk-item p-4 rounded-lg border-2 flex flex-col items-center justify-center transition ${
                    selectedDesk === desk._id 
                      ? 'border-blue-600 bg-blue-50' 
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <span className="font-bold text-lg">#{desk.number}</span>
                  <span className="text-sm text-gray-500">Available</span>
                </button>
              ))}
              {desks.length === 0 && <p className="col-span-4 text-gray-500">No desks found. (Seed database first)</p>}
           </div>
        </div>

        {/* Right: Reservation Form */}
        <div className="bg-white p-6 rounded-lg shadow-md h-fit">
          <h2 className="text-xl font-semibold mb-4">Reservation Details</h2>
          {selectedDesk ? (
            <form onSubmit={handleReserve} className="space-y-4">
               <div>
                  <label className="block text-sm font-medium text-gray-700">Selected Desk</label>
                  <div className="mt-1 p-2 bg-gray-100 rounded">
                    {desks.find((d) => d._id === selectedDesk)?.number || selectedDesk}
                  </div>
               </div>

               <div>
                 <label className="block text-sm font-medium text-gray-700">Date & Time</label>
                 <input 
                   type="datetime-local" 
                   value={startTime}
                   onChange={(e) => setStartTime(e.target.value)}
                   className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                   required
                 />
               </div>

               <div className="duration-select">
                 <label className="block text-sm font-medium text-gray-700">Duration (Hours)</label>
                 <select 
                   value={duration}
                   onChange={(e) => setDuration(Number(e.target.value))}
                   className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                 >
                   <option value={1}>1 Hour</option>
                   <option value={2}>2 Hours</option>
                   <option value={3}>3 Hours</option>
                   <option value={4}>4 Hours</option>
                 </select>
               </div>

               <button 
                 type="submit" 
                 className="submit-btn w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
               >
                 Confirm Reservation
               </button>
            </form>
          ) : (
            <p className="text-gray-500">Please select a desk from the grid to make a reservation.</p>
          )}
        </div>
      </div>
    </div>
  );
}
