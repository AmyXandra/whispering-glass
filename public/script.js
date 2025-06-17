const { createRoot } = ReactDOM;
const root = createRoot(document.getElementById("root"));

const patrons = [
  { id: 1, name: "Shady Guy", role: getRandomRole() },
  { id: 2, name: "Nervous Lady", role: getRandomRole() },
  { id: 3, name: "Drunk", role: getRandomRole() },
  { id: 4, name: "Quiet Man", role: getRandomRole() },
];

const SNIPPETS = [
  {
    text: "I heard the Feds are raiding the West Side tomorrow.",
    truthfulness: 80,
    patronType: "cop",
  },
  {
    text: "The Red Hat guy has a stash of moonshine under the floorboards.",
    truthfulness: 70,
    patronType: "rival",
  },
  {
    text: "My cat can sing jazz if you give her gin.",
    truthfulness: 10,
    patronType: "drunk",
  },
  {
    text: "The crime boss meets every Thursday behind the butcher shop.",
    truthfulness: 90,
    patronType: "honest",
  },
  {
    text: "Someone’s been tipping off the cops. I think it’s the bartender.",
    truthfulness: 50,
    patronType: "rival",
  },
  {
    text: "There’s gold hidden in the piano.",
    truthfulness: 20,
    patronType: "drunk",
  },
  {
    text: "That jazz singer’s brother is a bootlegger.",
    truthfulness: 60,
    patronType: "cop",
  },
  {
    text: "You didn’t hear this from me, but the mayor drinks here in disguise.",
    truthfulness: 75,
    patronType: "honest",
  },
  {
    text: "The Quiet Man is an undercover cop.",
    truthfulness: 40,
    patronType: "rival",
  },
  {
    text: "I saw a ghost in the restroom.",
    truthfulness: 5,
    patronType: "drunk",
  },
  {
    text: "There’s a secret door behind the wine rack.",
    truthfulness: 85,
    patronType: "honest",
  },
  {
    text: "You should trust no one tonight.",
    truthfulness: 50,
    patronType: "cop",
  },
  {
    text: "The new guy in suspenders is working both sides.",
    truthfulness: 65,
    patronType: "rival",
  },
  {
    text: "The moon told me secrets last night.",
    truthfulness: 5,
    patronType: "drunk",
  },
  {
    text: "The cops are bribing the delivery driver.",
    truthfulness: 70,
    patronType: "honest",
  },
  {
    text: "Someone’s watching us through that mirror.",
    truthfulness: 55,
    patronType: "cop",
  },
  {
    text: "You know, I think I’m actually a time traveler.",
    truthfulness: 0,
    patronType: "drunk",
  },
  {
    text: "A rival gang is planning a hit tonight.",
    truthfulness: 80,
    patronType: "rival",
  },
  {
    text: "The Quiet Man saved my life once. He’s clean.",
    truthfulness: 90,
    patronType: "honest",
  },
  {
    text: "If you see the cop, wink twice and walk away.",
    truthfulness: 60,
    patronType: "cop",
  },
];

function getRandomRole() {
  const roles = ["Cop", "Rival", "Drunk", "Honest"];
  return roles[Math.floor(Math.random() * roles.length)];
}

function getRandomSnippet(patronType) {
  const filtered = SNIPPETS.filter((s) => s.patronType === patronType);
  return filtered[Math.floor(Math.random() * filtered.length)];
}

const Game = () => {
  const [secrets, setSecrets] = React.useState(0);
  const [suspicion, setSuspicion] = React.useState(0);
  const [turns, setTurns] = React.useState(10);
  const [currentSnippet, setCurrentSnippet] = React.useState(null);

  const [rumorsLeft, setRumorsLeft] = useState(3);
  const [activeSnippet, setActiveSnippet] = useState(null);

  console.log("currentSnippet", currentSnippet);

  const servePatron = (patron) => {
    console.log("patron", patron);
    console.log("snippet", snippet);

    const truthfulness = Math.floor(Math.random() * 100);
    const snippet = `${patron.name}: '${getRandomSnippet(
      patron.name.toLowerCase()
    )} Truthfulness: ${truthfulness}%`;

    setCurrentSnippet({ patron, snippet, truthfulness });
  };

  const handleKeep = () => {
    if (currentSnippet.truthfulness < 50) setSuspicion((s) => s + 20);
    setSecrets((s) => s + 1);
    setCurrentSnippet(null);
    setTurns((t) => t - 1);
  };

  const handleDiscard = () => {
    setCurrentSnippet(null);
    setTurns((t) => t - 1);
  };

  React.useEffect(() => {
    if (turns <= 0) {
      if (secrets >= 5 && suspicion <= 50) {
        alert("You sold the secrets—victory!");
      } else {
        alert("Exposed as an informant!");
      }
    }
  }, [turns, secrets, suspicion]);

  return (
    <div className="bg-amber-900 min-h-screen p-4">
      <div className="flex justify-between mb-4">
        <span>Secrets: {secrets}/5</span>
        <span>Suspicion: {suspicion}/100</span>
        <span>Turns: {turns}</span>
      </div>
      <h1 className="text-2xl mb-4">The Whispering Game</h1>
      {patrons.map((patron) => (
        <button
          key={patron.id}
          className="bg-gray-800 p-2 m-2 rounded"
          onClick={() => servePatron(patron)}
        >
          Servffffffe {patron.name}
        </button>
      ))}
      {currentSnippet && (
        <div className="bg-gray-700 p-4 mt-4 rounded">
          <p>{currentSnippet.snippet}</p>
          <button className="bg-green-600 p-2 m-2 rounded" onClick={handleKeep}>
            Keep
          </button>
          <button
            className="bg-red-600 p-2 m-2 rounded"
            onClick={handleDiscard}
          >
            Discard
          </button>
        </div>
      )}
    </div>
  );
};

root.render(<Game />);
