export const savePlayers = (player1, player2) => {
  localStorage.setItem("player1", player1);
  localStorage.setItem("player2", player2);
};

export const loadPlayers = () => {
  return {
    player1: localStorage.getItem("player1") || "",
    player2: localStorage.getItem("player2") || ""
  };
};