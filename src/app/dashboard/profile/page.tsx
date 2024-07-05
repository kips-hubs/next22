// app/profile/page.tsx

'use client';

import { useState } from 'react';
import axios from 'axios';

interface UserProfile {
  id: number;
  name: string;
  email: string;
}

interface ProfilePageProps {
  user: UserProfile;
}

const ProfilePage = ({ user }: ProfilePageProps) => {
//   const [profile, setProfile] = useState(user);
//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState({ name: user.name, email: user.email });

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleEditClick = () => {
//     setIsEditing(true);
//   };

//   const handleSaveClick = async () => {
//     try {
//       const response = await axios.put(`/api/profile/${profile.id}`, formData);
//       setProfile(response.data);
//       setIsEditing(false);
//     } catch (error) {
//       console.error('Error updating profile:', error);
//     }
//   };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            // value={formData.name}
            // onChange={handleInputChange}
            // disabled={!isEditing}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline `}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            // value={formData.email}
            // onChange={handleInputChange}
            // disabled={!isEditing}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline `}
          />
        </div>
        <div className="flex items-center justify-between">
          {'' ? (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={()=>({})}
            >
              Save
            </button>
          ) : (
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
