import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SNIPPETS } from "../utils";
import Modal from "../components/modals/Modal";
import WhisperModal from "../components/modals/WhisperModal";
import NarratorModal from "../components/modals/NarratorModal";
import RoundEndModal from "../components/modals/RoundEndModal";
import SecretsModal from "../components/modals/SecretsModal";
import BossReportModal from "../components/modals/BossReportModal";
import Patron1 from "../assets/patron-1.jpg";
import Patron2 from "../assets/patron-2.jpg";
import Patron3 from "../assets/patron-3.jpg";
import Patron4 from "../assets/patron-4.jpg";
import Profile1 from "../assets/profile-1.png";
import Profile2 from "../assets/profile-2.png";
import Profile3 from "../assets/profile-3.png";
import Profile4 from "../assets/profile-4.png";
import Tick from "../assets/icons-tick.png";
import { showToast } from "../utils/toast";

import {
  startGame,
  endRound,
  servePatronRound,
  keepSecret,
  discardSecret,
  setGameOver,
  tickTimer,
  resetTimer,
  updateTimer,
  resetPatronsPerRound,
  clearFeedback,
  tradeSecret,
  setTimerPaused,
  hideBossReport,
} from "../redux/game/game.slice";

// Constants
const TOTAL_ROUNDS = 7;
const ROUND_TIME_LATE = 25;
const MAX_PATRONS_LEAVING = 6;

const patrons = [
  {
    id: 1,
    name: "Marlowe",
    img: Patron1,
    profile: Profile1,
    role: getRandomRole(),
  },
  {
    id: 2,
    name: "Dolores",
    img: Patron2,
    profile: Profile2,
    role: getRandomRole(),
  },
  {
    id: 3,
    name: "Old Benny",
    img: Patron3,
    profile: Profile3,
    role: getRandomRole(),
  },
  {
    id: 4,
    name: "Johnny",
    img: Patron4,
    profile: Profile4,
    role: getRandomRole(),
  },
];

function getRandomRole() {
  const roles = ["Cop", "Rival", "Drunk", "Honest"];
  return roles[Math.floor(Math.random() * roles.length)];
}

function generateRoundPatrons() {
  const shuffled = [...patrons]
    .map((patron) => ({ ...patron, role: getRandomRole() }))
    .sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 4);
}

function getTruthfulnessDescriptor(truthfulness) {
  if (truthfulness >= 80) return "Seems Reliable";
  if (truthfulness >= 60) return "Fairly Trustworthy";
  if (truthfulness >= 40) return "Sounds Shaky";
  return "Highly Suspect";
}

const Game = () => {
  const dispatch = useDispatch();
  const {
    round,
    secrets,
    suspicion,
    roundPatronsLeft,
    totalPatronsLeft,
    roundTimeLeft,
    roundActive,
    currentPatrons,
    gameOver,
    gameResult,
    patronsServed,
    feedbackMessage,
    totalTurns,
    keptSecrets,
    timerPaused,
    showBossReport,
  } = useSelector((state) => state.game);
  const [modalOpen, setModalOpen] = useState(false);
  const [narratorModalVisible, setNarratorModalVisible] = useState(true);
  const [roundEndModalOpen, setRoundEndModalOpen] = useState(false);
  const [secretsModalOpen, setSecretsModalOpen] = useState(false);
  const [currentSnippet, setCurrentSnippet] = useState(null);
  const [snippets, setSnippets] = useState(SNIPPETS);

  useEffect(() => {
    if (roundActive && roundTimeLeft > 0 && !timerPaused) {
      const timer = setInterval(() => {
        dispatch(tickTimer());
        // Check if all 4 patrons are served
        if (patronsServed?.length === 4 && !modalOpen && roundTimeLeft > 4) {
          dispatch(endRound());
          showToast("You're getting good at the servings, kid! Round ended.");
          setModalOpen(false);
          setRoundEndModalOpen(true);
        }
      }, 1000);
      return () => clearInterval(timer);
    } else if (roundActive && roundTimeLeft <= 0) {
      dispatch(endRound());
      setModalOpen(false);
      setRoundEndModalOpen(true);

      // Check if any patron has left
      const hasPatronLeft = patrons.some((patron) => patron.hasLeft);
      if (hasPatronLeft) {
        showToast(
          "Be careful! Your patrons are leaving! The boss won't like this!"
        );
      }
    }
  }, [
    roundActive,
    roundTimeLeft,
    timerPaused,
    patronsServed,
    modalOpen,
    dispatch,
  ]);

  // useEffect(() => {
  //   if (totalPatronsLeft >= MAX_PATRONS_LEAVING) {
  //     dispatch(setGameOver("Fired! Too many patrons left."));
  //   } else if (round > TOTAL_ROUNDS || totalTurns <= 0) {
  //     if (secrets >= 5 && suspicion <= 60) {
  //       dispatch(setGameOver("Victory! You sold enough secrets."));
  //       setModalOpen(false);
  //       setRoundEndModalOpen(false);
  //     } else {
  //       dispatch(setGameOver("Exposed as an informant!"));
  //     }
  //   }
  // }, [totalPatronsLeft, round, secrets, suspicion, totalTurns, dispatch]);

  useEffect(() => {
    if (suspicion > 100) {
      dispatch(setGameOver("Caught by the Don! Suspicion too high."));
    } else if (totalPatronsLeft >= MAX_PATRONS_LEAVING) {
      dispatch(setGameOver("Fired! Too many patrons left."));
    } else if (round > TOTAL_ROUNDS || totalTurns <= 0) {
      if (secrets >= 5 && suspicion <= 60) {
        dispatch(setGameOver("Victory! You sold enough secrets."));
        setModalOpen(false);
        setRoundEndModalOpen(false);
      } else {
        dispatch(setGameOver("Exposed as an informant!"));
      }
    }
  }, [totalPatronsLeft, round, secrets, suspicion, totalTurns, dispatch]);

  useEffect(() => {
    if (feedbackMessage) {
      showToast(feedbackMessage);
      dispatch(clearFeedback());
    }
  }, [feedbackMessage, dispatch]);

  const startNewRound = () => {
    dispatch(resetPatronsPerRound());
    dispatch(round >= 3 ? updateTimer(ROUND_TIME_LATE) : resetTimer());
    const newPatrons = generateRoundPatrons();
    dispatch(startGame(newPatrons));
    setRoundEndModalOpen(false);
  };

  function getRandomSnippet(patronType) {
    const filtered = snippets.filter(
      (s) => s.patronType.toLowerCase() === patronType.toLowerCase()
    );
    return filtered[Math.floor(Math.random() * filtered.length)];
  }

  const servePatron = (patron) => {
    if (!roundActive || totalTurns <= 0) {
      if (totalTurns <= 0) {
        dispatch(setGameOver("No turns left! Game over."));
      }
      return;
    }
    const randomSnippet = getRandomSnippet(patron.role);
    const snippet = `${patron.name}: "${randomSnippet?.text}"`;
    setCurrentSnippet({
      patron,
      snippet,
      truthfulness: randomSnippet.truthfulness,
      category: randomSnippet.category,
      id: randomSnippet.id,
    });
    setModalOpen(true);
    dispatch(servePatronRound(patron));
  };

  const handleKeep = () => {
    if (totalTurns <= 0) {
      dispatch(setGameOver("No turns left! Game over."));
      return;
    }
    dispatch(keepSecret(currentSnippet));
    serveWhisper(currentSnippet.id);
    setModalOpen(false);
    setCurrentSnippet(null);
  };

  const handleDiscard = () => {
    if (totalTurns <= 0) {
      dispatch(setGameOver("No turns left! Game over."));
      return;
    }
    dispatch(discardSecret());
    serveWhisper(currentSnippet.id);
    setModalOpen(false);
    setCurrentSnippet(null);
  };

  const handleTradeSecret = (index) => {
    if (totalTurns <= 0) {
      dispatch(setGameOver("No turns left! Game over."));
      return;
    }
    dispatch(tradeSecret({ index, newSecret: currentSnippet }));
    serveWhisper(currentSnippet.id);
    dispatch(setTimerPaused(false));
    setSecretsModalOpen(false);
    setModalOpen(false);
    setCurrentSnippet(null);
  };

  // Function to handle serving a whisper by ID
  function serveWhisper(whisperId) {
    // Find the index of the whisper with the given ID
    const whisperIndex = snippets.findIndex(
      (whisper) => whisper.id === whisperId
    );

    if (whisperIndex !== -1) {
      // Remove the whisper from SNIPPETS
      setSnippets(snippets.filter((_, index) => index !== whisperIndex));
    }
  }

  const openSecretsModal = () => {
    if (totalTurns <= 0) {
      dispatch(setGameOver("No turns left! Game over."));
      return;
    }
    dispatch(setTimerPaused(true));
    setSecretsModalOpen(true);
  };

  const closeSecretsModal = () => {
    dispatch(setTimerPaused(false));
    setSecretsModalOpen(false);
  };

  if (gameOver && !showBossReport) {
    return (
      <div className="background-blur min-h-screen p-4 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4 special-elite">
            Game Over
          </h1>
          <p className="text-xl text-white">{gameResult}</p>
          <p className="text-white mt-2">
            Secrets: {secrets}/5 | Suspicion: {Math.round(suspicion)}/100 |
            Total Patrons Left: {totalPatronsLeft}/{MAX_PATRONS_LEAVING} | Turns
            Left: {totalTurns}
          </p>

          <button
            className="bg-amber-900 text-white px-4 py-2 rounded w-full"
            type="text"
            onClick={() => window.location.reload()}
          >
            Restart
          </button>
        </div>
      </div>
    );
  }

  return (
    // <div className="bg-amber-900 min-h-screen p-4">
    <div className="background-blur min-h-screen p-4">
      <h1 className="special-elite text-2xl font-bold text-white text-center mb-4">
        The Whispering Glass
      </h1>
      <div className="flex justify-between mb-4 text-white flex-wrap gap-2">
        <span>
          Round: {round}/{TOTAL_ROUNDS}
        </span>
        <span className={roundTimeLeft < 5 ? "text-red-600" : ""}>
          Time Left: {roundTimeLeft}s
        </span>
        <span>Secrets: {secrets}/5</span>
        <span>Suspicion: {Math.round(suspicion)}/100</span>
        <span>
          Patrons Left (Round): {roundPatronsLeft} | Total: {totalPatronsLeft}/
          {MAX_PATRONS_LEAVING}
        </span>
        <span>Turns Left: {totalTurns}</span>
      </div>

      {!modalOpen && !showBossReport && (
        <div>
          <div className="grid grid-cols-2 gap-4 max-w-[900px] mx-auto mt-24">
            {currentPatrons?.length > 0 &&
              currentPatrons.map((patron) => (
                <button
                  key={patron.id}
                  className="relative bg-gray-800 text-white p-2 sm:p-4 rounded-lg hover:bg-gray-700 disabled:opacity-50 h-[200px] sm:h-[280px] flex items-center"
                  onClick={() => servePatron(patron)}
                  disabled={
                    !roundActive ||
                    patronsServed.some((p) => p.id === patron.id) ||
                    totalTurns <= 0
                  }
                >
                  <img
                    src={patron.img}
                    alt="profile"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute left-0 h-[40px] bg-[#1f2937e8] text-white text-center w-full  flex items-center justify-center">
                    {!roundActive ||
                    patronsServed.some((p) => p.id === patron.id) ||
                    totalTurns <= 0 ? (
                      <img
                        src={Tick}
                        alt="profile"
                        className="h-[24px] w-[24px] object-cover"
                      />
                    ) : (
                      <p className={`animate-bounce`}>Serve!</p>
                    )}
                  </div>
                </button>
              ))}
          </div>

          {!narratorModalVisible && (
            <div className="max-w-[800px] mx-auto mt-16">
              <progress
                id="file"
                value={Math.round(suspicion)}
                max="100"
                className="w-full"
              >
                {Math.round(suspicion)}
              </progress>
              <label className='block text-center text-white text-sm'>Suspicion meter</label>
            </div>
          )}
        </div>
      )}

      <Modal isOpen={modalOpen}>
        <WhisperModal
          data={currentSnippet}
          onClose={() => setModalOpen(false)}
          onKeep={handleKeep}
          onDiscard={handleDiscard}
          secretsFull={secrets === 5}
          onTradeSecrets={openSecretsModal}
        />
      </Modal>

      <Modal isOpen={narratorModalVisible}>
        <NarratorModal
          onClose={() => {
            setNarratorModalVisible(false);
            startNewRound();
          }}
        />
      </Modal>

      <Modal isOpen={roundEndModalOpen}>
        <RoundEndModal
          onNextRound={startNewRound}
          patronsServed={patronsServed}
          roundPatronsLeft={roundPatronsLeft}
          totalPatronsLeft={totalPatronsLeft}
        />
      </Modal>

      <Modal isOpen={secretsModalOpen} onClose={closeSecretsModal}>
        <SecretsModal
          keptSecrets={keptSecrets}
          newSecret={currentSnippet}
          onClose={closeSecretsModal}
          onTrade={handleTradeSecret}
          getTruthfulnessDescriptor={getTruthfulnessDescriptor}
        />
      </Modal>

      <Modal isOpen={showBossReport}>
        <BossReportModal
          keptSecrets={keptSecrets}
          onClose={() => dispatch(hideBossReport())}
          secrets={secrets}
          suspicion={suspicion}
          totalPatronsLeft={totalPatronsLeft}
          totalTurns={totalTurns}
        />
      </Modal>
    </div>
  );
};

export default Game;
