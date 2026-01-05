import React, { useState } from 'react';

const ProfileScanner = ({ theme = 'dark' }) => {
  const [imgError, setImgError] = useState(false);

  const bgColor = theme === 'light' ? 'bg-white' : 'bg-black';

  return (
    <div className="relative w-32 h-32 mx-auto">
      {/* Rotating gradient border */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-500 via-blue-500 to-cyan-500 animate-spin-slow opacity-30" />
      
      {/* Inner background */}
      <div className={`absolute inset-1 rounded-full ${bgColor}`} />
      
      {/* Profile image container */}
      <div className="absolute inset-1 rounded-full overflow-hidden flex items-center justify-center">
        {!imgError ? (
          <img 
            src="/profile.png" 
            alt="Elias Araújo" 
            className="w-full h-full object-cover rounded-full"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="w-full h-full rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 flex items-center justify-center text-3xl font-black text-white">
            EA
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileScanner;
