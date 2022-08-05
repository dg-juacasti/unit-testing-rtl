export const useFetch = () => {

  const refetch = async () => {
    const response = await fetch("https://api.chucknorris.io/jokes/random");
    const result = await response.json();
    return result;
  };

  return refetch ;
};
