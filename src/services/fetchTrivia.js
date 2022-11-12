const getTrivia = async (token) => {
  // console.log(token);
  const ENDPOINT = `https://opentdb.com/api.php?amount=5&token=${token}`;
  const response = await fetch(ENDPOINT);
  const json = await response.json();
  return json;
};

export default getTrivia;
