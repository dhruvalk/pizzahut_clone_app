import React from "react";

export default function LoadingSpinner() {
  return (
    <div className="fixed h-screen w-full flex justify-center items-center z-50 backdrop-blur-sm">
      <img
        src="https://static.phdvasia.com/sg1/assets/images/icons/loader-bike.gif"
        alt="loading..."
      />
    </div>
  );
}
