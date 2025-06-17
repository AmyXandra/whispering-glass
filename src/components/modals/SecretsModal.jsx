import React from "react";

const SecretsModal = ({
  keptSecrets,
  newSecret,
  onClose,
  onTrade,
  getTruthfulnessDescriptor,
}) => {
  return (
    <div className="p-6 max-w-[600px] w-full mx-auto mafia-frame bg-gray-800 text-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Trade Secrets</h2>
      <p className="mb-2">
        New Secret: {newSecret?.text} (
        {getTruthfulnessDescriptor(newSecret?.truthfulness)})
      </p>
      <p className="mb-4 text-white">
        Select a secret to replace. This will cost one turn and increase
        suspicion by 5.
      </p>
      {keptSecrets.length === 0 ? (
        <p>No secrets kept yet.</p>
      ) : (
        <ul className="mb-4 max-h-64 overflow-y-auto">
          {keptSecrets.map((secret, index) => (
            <li key={index} className="mb-2 flex justify-between items-center">
              <span className="text-sm">
                {secret.text} ({getTruthfulnessDescriptor(secret.truthfulness)})
              </span>

              <button
                className="bg-red-600 text-white px-2 py-1 rounded text-sm"
                onClick={() => onTrade(index)}
              >
                Trade
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SecretsModal;
