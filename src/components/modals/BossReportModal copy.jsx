import React from "react";
import WordByWordReveal from "../WordByWordReveal";
import Boss from "../../assets/profile-1.png";
import Bartender from "../../assets/profile-2.png"

// import Button from "../Button";

const BossReportModal = ({
  keptSecrets,
  onClose,
  secrets,
  suspicion,
  totalPatronsLeft,
  totalTurns,
}) => {
  const MAX_PATRONS_LEAVING = 6;
  const categories = [...new Set(keptSecrets.map((s) => s.category))];

  // Category-specific reactions
  const reactions = {
    Smuggling:
      "‘Whiskey flowing like the Chicago River, eh? That dockmaster’s worth his weight in gold. We’ll double the shipments—cops won’t touch us.’",
    LawEnforcement:
      "‘Those badge-wearing rats think they can corner me? We’ll move the goods to the docks before they kick the door down.’",
    Betrayal: "‘My own blood, stealing from me? He’ll be fish food by dawn.’",
    Corruption:
      "‘The mayor’s in our pocket now. That casino deal’s just the start—City Hall’s ours.’",
    Assets:
      "‘Cash under our feet? You’re sharper than I thought. We’ll crack it open tonight.’",
    Sabotage:
      "‘Someone’s playing dirty in my own house? They’ll regret crossing me.’",
    Suspicion:
      "‘Bloodstains, huh? Someone’s got explaining to do—or they’re done.’",
    Nonsense:
      "‘Time traveler? Save that for the funny papers. Stick to the real dirt.’",
  };
  return (
    <div className="flex gap-4 items-center">
      <img src={Boss} alt="Profile1" />
      <div className="p-6 max-w-[600px] w-full mx-auto mafia-frame bg-gray-800 text-white rounded-lg shadow-lg">
        <h2 className="special-elite text-xl font-bold mb-4">
          Report to Don Moretti’s sanctum
        </h2>
        <p className="mb-4 italic">
          You've stepped into Don Moretti’s sanctum. The weight of your secrets
          are heavy as the revolver in his holster.
        </p>

        <div className="mb-5 flex justify-end">
          <div className="w-full max-w-[320px] bg-[#6d300d5e] px-2 py-0.5 rounded-lg">
            <WordByWordReveal
              delay={100}
              text={`Speak, bartender, What’ve you got for me? And it better
          be worth my time.`}
            />
          </div>
        </div>

        <h3 className="text-lg font-semibold mb-2">Your Secrets:</h3>
        <ul className="mb-4 max-h-64 overflow-y-auto">
          {keptSecrets.map((secret, index) => (
            <li key={index} className="mb-2">
              {/* Secret */}
              {/* <span className="text-sm">- {secret.text}</span> */}
              <div className="mb-5 flex justify-start">
                <div className="w-full max-w-[320px] bg-[#6d300d5e] px-2 py-0.5 rounded-lg">
                  <WordByWordReveal delay={100} text={`- ${secret.text}`} />
                </div>
              </div>

              {/* Reaction */}
              <div className="mb-5 flex justify-end">
                <div className="w-full max-w-[320px] bg-[#6d300d5e] px-2 py-0.5 rounded-lg">
                  <WordByWordReveal
                    delay={100}
                    text={reactions[secret.category.replace(" ", "")]}
                  />
                </div>
              </div>

              {/* <p className="text-white text-sm ml-4">
              {reactions[secret.category.replace(" ", "")]}
            </p> */}
            </li>
          ))}
        </ul>

        <div>
          <p className="mb-4">
            <span className="font-semibold">Key Intelligence:</span>{" "}
            {categories.join(", ")}.<br />
            ‘You’ve got a nose for trouble, kid. This kind of dirt keeps my
            empire standing. Keep your ears open and your mouth shut, and you’ll
            go far. For now, take your cut and don’t cross me.’ He slides a wad
            of bills across the table—your share of the profits.
          </p>
          <p className="mb-4 text-sm text-gray-600">
            Secrets: {secrets}/5 | Suspicion: {Math.round(suspicion)}/100 |
            Patrons Left: {totalPatronsLeft}/{MAX_PATRONS_LEAVING}
          </p>
          <button
            className="bg-amber-900 text-white px-4 py-2 rounded w-full"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>

      <img src={Bartender} alt="Profile1" />
    </div>
  );
};

export default BossReportModal;
