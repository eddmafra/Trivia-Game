const getToken = async () => {
  const ENDPOINT = 'https://opentdb.com/api_token.php?command=request';
  const response = await fetch(ENDPOINT);
  const json = await response.json();
  return response.ok ? Promise.resolve(json) : Promise.reject(json);
};
export default getToken;

// const getTrivia = async () => {
//   const ENDPOINT = `https://opentdb.com/api.php?amount=5&token=${getToken}`;
//   const response = await fetch(ENDPOINT);
//   const json = await response.json();
//   return response.ok ? Promise.resolve(json) : Promise.reject(json);
// };
