const getToken = async () => {
  const ENDPOINT = 'https://opentdb.com/api_token.php?command=request';
  const response = await fetch(ENDPOINT);
  const json = await response.json();
  return json;
};
export default getToken;
