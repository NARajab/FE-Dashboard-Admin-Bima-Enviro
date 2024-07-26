import React from 'react';

const SuccessMessage: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <div className="text-2xl text-center mb-4">
        Your password has been successfully reset, please return to the login
        page
      </div>
    </div>
  );
};

export default SuccessMessage;
