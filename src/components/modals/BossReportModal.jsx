import React, { useState, useEffect, useRef } from "react";
import WordByWordReveal from "../WordByWordReveal";
import Boss from "../../assets/boss2.png";
import Bartender from "../../assets/server2.png";

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

  // State to manage conversation progress
  const [currentStep, setCurrentStep] = useState(0); // 0: Boss speak, 1+: Secrets, -1: Key Intelligence
  const [displayedContent, setDisplayedContent] = useState([]);
  const conversationRef = useRef(null);

  // Handle conversation flow
  useEffect(() => {
    if (currentStep === 0) {
      const timer = setTimeout(() => {
        setDisplayedContent((prev) => [
          ...prev,
          "Speak, bartender, What’ve you got for me? And it better be worth my time.",
        ]);
        setCurrentStep(1);
      }, 2000); // Adjust based on WordByWordReveal duration
      return () => clearTimeout(timer);
    } else if (currentStep > 0 && currentStep <= keptSecrets.length * 2) {
      const index = Math.floor((currentStep - 1) / 2);
      if ((currentStep - 1) % 2 === 0) {
        // Display secret
        const timer = setTimeout(() => {
          setDisplayedContent((prev) => [
            ...prev,
            `- ${keptSecrets[index].text}`,
          ]);
          // if (conversationRef.current) {
          //   conversationRef.current.scrollTop =
          //     conversationRef.current.scrollHeight;
          // }
          setCurrentStep(currentStep + 1);
        }, 2000); // Adjust based on WordByWordReveal duration
        return () => clearTimeout(timer);
      } else {
        // Display reaction
        const timer = setTimeout(() => {
          setDisplayedContent((prev) => [
            ...prev,
            reactions[keptSecrets[index].category.replace(" ", "")],
          ]);
          // if (conversationRef.current) {
          //   conversationRef.current.scrollTop =
          //     conversationRef.current.scrollHeight;
          // }
          setCurrentStep(currentStep + 1);
        }, 2000); // Adjust based on WordByWordReveal duration
        return () => clearTimeout(timer);
      }
    } else if (currentStep === keptSecrets.length * 2 + 1) {
      const timer = setTimeout(() => {
        setDisplayedContent((prev) => [
          ...prev,
          `Key Intelligence: ${categories.join(
            ", "
          )}.‘You’ve got a nose for trouble, kid. This kind of dirt keeps my empire standing. Keep your ears open and your mouth shut, and you’ll go far. For now, take your cut and don’t cross me.’`,
        ]);
        // if (conversationRef.current) {
        //   conversationRef.current.scrollTop =
        //     conversationRef.current.scrollHeight;
        // }
        setCurrentStep(-1);
      }, 2000); // Adjust based on WordByWordReveal duration
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line
  }, [currentStep, keptSecrets, categories]);

  useEffect(() => {
    if (conversationRef.current) {
      conversationRef.current.scrollTop = conversationRef.current.scrollHeight;
    }
  }, [displayedContent]);

  return (
    <div className="flex gap-4 items-center max-h-[75vh] max-w-7xl w-full mx-auto">
      <img
        src={Bartender}
        alt="Bartender"
        className="h-full max-h-[70vh]"
        style={{
          opacity:
            currentStep === 0
              ? 0.3
              : currentStep > 0 && currentStep % 2 === 0
              ? 1
              : 0.3,
        }}
      />

      <div
        ref={conversationRef}
        className="p-6 max-w-[600px] w-full h-full max-h-[80vh] overflow-y-scroll mx-auto mafia-frame bg-gray-800 text-white rounded-lg shadow-lg"
      >
        <h2 className="special-elite text-xl font-bold mb-4">
          Report to Don Moretti’s sanctum
        </h2>
        <p className="mb-4 italic">
          You've stepped into Don Moretti’s sanctum. The weight of your secrets
          are heavy as the revolver in his holster.
        </p>
        {/* Display accumulated conversation */}
        {displayedContent.map((text, index) => (
          <div key={index} className="mb-5">
            {index === 0 ? (
              <div className="flex justify-end">
                <div className="w-full max-w-[320px] bg-[#6d300d5e] px-2 py-0.5 rounded-lg">
                  <WordByWordReveal delay={100} text={text} />
                </div>
              </div>
            ) : index % 2 === 1 ? (
              <div className="flex justify-start">
                <div className="w-full max-w-[320px] bg-[#7ea8be6e] px-2 py-0.5 rounded-lg">
                  <WordByWordReveal delay={100} text={text} />
                </div>
              </div>
            ) : index === displayedContent.length - 1 ? (
              <div className="flex justify-end">
                <div className="w-full max-w-[320px] bg-[#6d300d5e] px-2 py-0.5 rounded-lg">
                  <WordByWordReveal delay={100} text={text} />
                </div>
              </div>
            ) : (
              <div className="flex justify-end">
                <div className="w-full max-w-[320px] bg-[#6d300d5e] px-2 py-0.5 rounded-lg">
                  <WordByWordReveal delay={100} text={text} />
                </div>
              </div>
            )}
          </div>
        ))}
        {/* 7EA8BE */}
        {/* Key Intelligence (static after conversation) */}
        {currentStep === -1 && (
          <div>
            <p className="pt-4 text-sm text-white">Your stats: </p>
            <p className="mb-4 py-3 text-sm text-white">
              Secrets: <span className="text-[#daa520]">{secrets}/5</span> |
              Suspicion:{" "}
              <span className="text-[#daa520]">
                {Math.round(suspicion)}/100
              </span>{" "}
              | Patrons Left:{" "}
              <span className="text-[#daa520]">
                {totalPatronsLeft}/{MAX_PATRONS_LEAVING}
              </span>
            </p>
            <button
              className="bg-amber-900 text-white px-4 py-2 rounded w-full"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        )}
      </div>

      <img
        src={Boss}
        alt="Boss"
        className="h-full max-h-[70vh]"
        style={{
          opacity:
            currentStep === 0 || (currentStep > 0 && currentStep % 2 === 1)
              ? 1
              : 0.3,
        }}
      />
    </div>
  );
};

export default BossReportModal;
