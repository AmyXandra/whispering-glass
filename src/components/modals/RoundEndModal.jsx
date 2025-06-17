import React from "react";
import Button from "../Button";

const RoundEndModal = ({
  onNextRound,
  patronsServed,
  roundPatronsLeft,
  totalPatronsLeft,
}) => {
  const MAX_PATRONS_LEAVING = 6;
  return (
    <div className="p-4 sm:py-8 sm:px-6 max-w-[600px] w-full mx-auto bg-gray-800 mafia-frame rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-8 special-elite text-white text-center">
        Round Ended
      </h2>
      <div className="grid grid-cols-3 gap-2 mb-12">
        <div className="text-center">
          <label className="block mb-1 text-sm text-[#8da2bf]">
            Patrons served:
          </label>
          <p className="text-white text-lg">{patronsServed.length}/4</p>
        </div>
        <div className="text-center">
          <label className="block mb-1 text-sm text-[#8da2bf]">
            Patrons left this round:
          </label>
          <p className="text-white text-lg">{roundPatronsLeft}</p>
        </div>
        <div className="text-center">
          <label className="block mb-1 text-sm text-[#8da2bf]">
            Total patrons left:
          </label>
          <p className="text-white text-lg">
            {totalPatronsLeft}/{MAX_PATRONS_LEAVING}
          </p>
        </div>
      </div>

      <div className="flex justify-center">
        <Button.Primary title={"Start Next Round"} onClick={onNextRound} />
      </div>
    </div>
  );
};

export default RoundEndModal;
