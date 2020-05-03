const textElement = document.getElementById("text");
const optionButtonsElement = document.getElementById("option-buttons");

let state = {};

function startGame() {
  state = {};
  showTextNode(1);
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find((textNode) => textNode.id === textNodeIndex);
  textElement.innerText = textNode.text;
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild);
  }

  textNode.options.forEach((option) => {
    if (showOption(option)) {
      const button = document.createElement("button");
      button.innerText = option.text;
      button.classList.add("btn");
      button.addEventListener("click", () => selectOption(option));
      optionButtonsElement.appendChild(button);
    }
  });
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state);
}

function selectOption(option) {
  const nextTextNodeId = option.nextText;
  if (nextTextNodeId <= 0) {
    return startGame();
  }
  state = Object.assign(state, option.setState);
  showTextNode(nextTextNodeId);
}

const textNodes = [
  {
    id: 1,
    text:
      "You wake up in a strange place and you see a jar of blue goo near you.",
    options: [
      {
        text: "Take goo",
        setState: { blueGoo: true },
        nextText: 2,
      },
      {
        text: "Leave goo",
        nextText: 2,
      },
    ],
  },
  {
    id: 2,
    text:
      "You venture forth in search of answers to where you are when you come across a merchant.",
    options: [
      {
        text: "Trade the goo for a sword",
        requiredState: (currentState) => currentState.blueGoo,
        setState: { blueGoo: false, sword: true },
        nextText: 3,
      },
      {
        text: "Trade the goo for a shield",
        requiredState: (currentState) => currentState.blueGoo,
        setState: { blueGoo: false, shield: true },
        nextText: 3,
      },
      {
        text: "Ignore the merchant",
        nextText: 3,
      },
    ],
  },
  {
    id: 3,
    text:
      "After leaving the merchant, you stumble upon a small dangerous town.",
    options: [
      {
        text: "Explore the town",
        nextText: 4,
      },
      {
        text: "Find a place to stay",
        nextText: 5,
      },
      {
        text: "Find a weapon",
        nextText: 6,
      },
    ],
  },
  {
    id: 4,
    text:
      "You are so tired that you fall asleep so deeply that you actually die.",
    options: [
      {
        text: "Restart",
        nextText: -1,
      },
    ],
  },
];

startGame();
