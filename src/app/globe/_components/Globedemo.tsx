
"use client";

import { GlobeWithSpinningText } from "@/components/globe-with-spinning-text";

export const GlobeDemo = () => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="relative w-full aspect-square max-w-[600px] mx-auto">
        <GlobeWithSpinningText
          text="Aspiration matters • Aspiration matters • Aspiration matters •"
          textDuration={120}
          fontSize="text-base md:text-lg lg:text-xl"
          reverseTextDirection={true}
          className="drop-shadow-2xl"
        />
      </div>
    </div>
  );
};
