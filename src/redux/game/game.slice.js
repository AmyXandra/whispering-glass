import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  round: 1,
  secrets: 0,
  suspicion: 0,
  roundPatronsLeft: 0,
  totalPatronsLeft: 0,
  roundTimeLeft: 30,
  roundActive: false,
  currentPatrons: [],
  gameOver: false,
  gameResult: null,
  patronsServed: [],
  total_game_rounds: 7,
  game_rounds_left: 7,
  totalTurns: 28, // 7 rounds * 4 patrons
  keptSecrets: [], // Store kept secrets
  timerPaused: false, // Pause timer during trade
  showBossReport: false,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    startGame: (state, action) => {
      state.roundActive = true;
      state.currentPatrons = action?.payload;
      state.patronsServed = [];
      state.roundPatronsLeft = 0;
      state.feedbackMessage = "";
    },
    endRound: (state, action) => {
      state.roundPatronsLeft = 4 - state.patronsServed.length;
      state.totalPatronsLeft += state.roundPatronsLeft;
      state.round += 1;
      state.roundActive = false;
    },
    resetPatronsPerRound: (state, action) => {
      state.patronsServed = [];
      state.patronsLeft = 0;
    },
    servePatronRound: (state, action) => {
      state.patronsServed = [...state.patronsServed, action.payload];
      state.totalTurns = Math.max(0, state.totalTurns - 1);
      // console.log("Serve Patron - Total Turns:", state.totalTurns);
      // Decrement turn per patron served
    },
    upDateTotalPatronsLeft: (state, action) => {
      state.totalPatronsLeft += action.payload;
    },
    keepSecret: (state, action) => {
      if (state.secrets >= 5) {
        state.feedbackMessage = "Secrets full! Trade a secret to continue.";
        return;
      }
      state.secrets =
        action.payload.truthfulness >= 60 ? state.secrets + 1 : state.secrets;
      if (action.payload.truthfulness >= 60) {
        state.keptSecrets = [
          ...state.keptSecrets,
          {
            text: action.payload.snippet,
            truthfulness: action.payload.truthfulness,
            category: action.payload.category,
          },
        ];
      }
      state.suspicion =
        action.payload.truthfulness < 60
          ? state.suspicion + (100 - action.payload.truthfulness) / 5
          : state.suspicion;
      state.feedbackMessage =
        action.payload.truthfulness >= 60
          ? "Good call. Secret kept."
          : "Risky move. Suspicion raised.";
    },
    discardSecret: (state) => {
      state.feedbackMessage = "Secret discarded.";
    },
    tradeSecret: (state, action) => {
      const { index, newSecret } = action.payload;
      state.totalTurns = Math.max(0, state.totalTurns - 1);
      state.suspicion += 5;
      state.secrets =
        newSecret.truthfulness >= 60 ? state.secrets : state.secrets - 1;
      state.keptSecrets = state.keptSecrets.map((secret, i) =>
        i === index
          ? {
              text: newSecret.snippet,
              truthfulness: newSecret.truthfulness,
              category: newSecret.category,
            }
          : secret
      );
      state.feedbackMessage =
        "Secret traded. One turn lost, suspicion increased.";
    },
    setGameOver: (state, action) => {
      state.gameOver = true;
      state.gameResult = action.payload;
      state.roundActive = false;
      state.showBossReport = action.payload.includes("Victory");
    },
    tickTimer: (state) => {
      state.roundTimeLeft -= 1;
    },
    resetTimer: (state) => {
      state.roundTimeLeft = 40;
    },
    updateTimer: (state, action) => {
      state.roundTimeLeft = action.payload;
    },
    clearFeedback: (state) => {
      state.feedbackMessage = "";
    },
    setTimerPaused: (state, action) => {
      state.timerPaused = action.payload;
    },
    hideBossReport: (state) => {
      state.showBossReport = false;
    },
  },
});

export const {
  startGame,
  endRound,
  resetPatronsPerRound,
  servePatronRound,
  upDateTotalPatronsLeft,
  keepSecret,
  discardSecret,
  tradeSecret,
  setGameOver,
  tickTimer,
  resetTimer,
  updateTimer,
  clearFeedback,
  setTimerPaused,
  hideBossReport,
} = gameSlice.actions;

export default gameSlice.reducer;
