import React, { useState, useCallback } from "react";
import Button from "../Button";
import WordByWordReveal from "../WordByWordReveal";
import Tick from "../../assets/icons-tick.png";

export default function NarratorModal({ onClose }) {
  const [step, setStep] = useState(1);
  const [showButton, setShowButton] = useState(false);

  // const handleComplete = () => {
  //   setShowButton(true);
  // };
  const handleComplete = useCallback(() => {
    setShowButton(true); // or whatever you do
  }, []);

  const nextStep = () => {
    setShowButton(false);
    setStep((prev) => prev + 1);
  };

  // const texts = [
  //   "In a 1920s speakeasy in Chicago, you’re a cunning informant posing as a bartender during Prohibition. Your goal: gather secrets from shady patrons to sell to the highest bidder (a crime boss) without getting caught. But here’s the catch—trust no one. Every patron has hidden motives: some are undercover cops, others are rival informants, and a few are just drunks spilling nonsense. You must whisper rumors, eavesdrop on conversations, and deduce who’s who, all while keeping your cover. The atmosphere is chaotic—patrons randomly turn on each other, and one wrong move could expose you...",
  //   "The second phase of your mission begins as a new wave of patrons enters. This time, you notice someone familiar from the police bulletin board. Can you maintain your cover and continue gathering whispers without attracting suspicion?",
  //   "In the final round, time is running out. Loyalties are thin, and someone might be onto you. Make your final choices—who do you trust, who do you betray, and what secrets are worth your life?",
  // ];

  return (
    // <div className="p-6 space-y-4 max-w-xl mx-auto">
    //   {step <= texts.length && (
    //     <WordByWordReveal
    //       text={texts[step - 1]}
    //       delay={100}
    //       onComplete={handleComplete}
    //     />
    //   )}

    //   {showButton && step < texts.length && (
    //     <button
    //       onClick={nextStep}
    //       className="mt-4 bg-blue-600 text-white px-4 py-2 rounded shadow"
    //     >
    //       Continue
    //     </button>
    //   )}

    //   {step === texts.length && showButton && (
    //     <div className="mt-4 text-green-700 font-bold">
    //       All reveals complete!
    //     </div>
    //   )}
    // </div>
    <div className="px-6 py-16 max-w-[600px] relative w-full mx-auto mafia-frame bg-gray-800 special-elite rounded-lg shadow-lg">
      <div>
        {step === 1 && (
          <WordByWordReveal
            key={1}
            delay={100}
            onComplete={() => handleComplete()}
            text={`In a 1920s speakeasy in Chicago, you’re a cunning informant posing as a
        bartender during Probation. Your goal: gather secrets from shady
        patrons to sell to the highest bidder (a crime boss) without getting
        caught. But here’s the catch—trust no one. Every patron has hidden
        motives: some are undercover cops, others are rival informants, and a
        few are just drunks spilling nonsense. You must eavesdrop on
        conversations, and deduce who’s who, all while keeping your cover. The
        atmosphere is chaotic—patrons randomly turn on each other, and one wrong
        move could expose you...`}
          />
        )}
      </div>

      {step === 2 && (
        <WordByWordReveal
          delay={100}
          onComplete={handleComplete}
          text={`Gather 5 valuable secrets and sell them to the crime boss without being
        exposed as an informant. Get through your shift without raising
        suspicion to yourself from the patrons.`}
        />
      )}

      {step === 3 && (
        <WordByWordReveal
          delay={100}
          onComplete={handleComplete}
          text={`You have 7 rounds and to serve patrons. Each round is timed. Try to
        serve all patrons in the round to avoid being fired.`}
        />
      )}

      <div className="flex justify-end">
        {step !== 3 && (
          <button
            className="italic text-white px-4 py-2 rounded shadow"
            onClick={onClose}
          >
            {"Skip>>>"}
          </button>
        )}
      </div>

      <div className="absolute bottom-[-32px] left-[0] w-full mt-4 flex justify-center gap-2">
        {(step === 1 || step === 2) && showButton && (
          <button className="text-white rounded shadow" onClick={nextStep}>
            <img src={Tick} alt="Tick" className="h-[72px] w-[72px]" />
          </button>
        )}

        {step === 3 && showButton && (
          <Button.Primary title={"Start Game"} onClick={onClose} />
        )}
      </div>
    </div>
  );
}
