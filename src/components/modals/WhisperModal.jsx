import React from "react";
import WordByWordReveal from "../WordByWordReveal";

const WhisperModal = ({
  data,
  onClose,
  onKeep,
  onDiscard,
  secretsFull,
  onTradeSecrets,
}) => {
  if (!data) return null;
  return (
    <div className=" max-w-[600px] w-full mx-auto">
      <img
        src={data?.patron?.profile}
        alt="profile"
        className="max-h-[200px]"
      />
      <div className="p-6 bg-gray-800 mafia-frame rounded-lg shadow-lg">
        <WordByWordReveal delay={100} text={data.snippet} />

        {secretsFull && (
          <p className="text-red-600 font-bold mt-2">
            Cannot keep more secrets! Trade a secret to continue.
          </p>
        )}
        <div className="flex justify-between mt-4 gap-2">
          <button
            className="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50 flex-1"
            onClick={onKeep}
            disabled={secretsFull}
          >
            Keep Secret
          </button>
          <button
            className="bg-red-600 text-white px-4 py-2 rounded flex-1"
            onClick={onDiscard}
          >
            Discard Secret
          </button>
          {secretsFull && (
            <button
              className="bg-amber-900 text-white px-4 py-2 rounded flex-1"
              onClick={onTradeSecrets}
            >
              Trade Secret
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default WhisperModal;
