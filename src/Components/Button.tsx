"use client";

import React from "react";
export default function Button({ image, func }: any) {
  return (
    <>
      <div className="flex justify-center">
        <button
          onClick={func}
          className="py-2 px-5 text-white text-center font-semibold bg-gradient-to-r from-orange-600 to-blue-800 rounded-full "
        >
          {image}
        </button>
      </div>
    </>
  );
}
