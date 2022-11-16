export const salvaJogadorStorage = (jogador) => {
  localStorage.setItem('jogadores', JSON.stringify(jogador));
};

export const pegaJogadorStorage = () => {
  const jgdr = localStorage.getItem('jogadores');
  return JSON.parse(jgdr);
};
