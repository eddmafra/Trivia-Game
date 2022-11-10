const getProfile = async (hashGerada) => {
  const ENDPOINT = `https://www.gravatar.com/avatar/${hashGerada}`;
  const response = await fetch(ENDPOINT);
  const json = await response.json();
  return response.ok ? Promise.resolve(json) : Promise.reject(json);
};
export default getProfile;
