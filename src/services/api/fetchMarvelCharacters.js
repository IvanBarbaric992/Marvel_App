const fetchApi = async ({
  method = "get",
  baseUrl = "",
  params = {},
  optionalParams = {}
}) => {
  const headers = new Headers();
  headers.append("Accept", "application/json");
  headers.append("Content-Type", "application/json");

  const url = new URL(baseUrl);
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
  Object.keys(optionalParams).forEach(
    key =>
      !!optionalParams[key] && url.searchParams.append(key, optionalParams[key])
  );
  const response = await fetch(url, { method, headers });

  const json = await response.json();

  return json;
};

const fetchMarvelCharactersFromApi = async ({
  limit = 20,
  offset = 0,
  searchField = ""
}) => {
  const charactersFromApi = await fetchApi({
    baseUrl: process.env.REACT_APP_MARVEL_API_ENDPOINT,
    params: {
      ts: 1,
      apikey: process.env.REACT_APP_MARVEL_API_PUBLIC_KEY,
      hash: process.env.REACT_APP_MARVEL_API_HASH,
      limit,
      offset
    },
    optionalParams: {
      nameStartsWith: searchField
    }
  });

  const recordsCount = charactersFromApi?.data?.total;

  const characters = charactersFromApi?.data?.results?.reduce((result, obj) => {
    const pickedProperties = (({
      id,
      name,
      thumbnail: { path, extension }
    }) => ({
      id,
      name,
      thumbnail: { path, extension }
    }))(obj);
    result?.push(pickedProperties);
    return result;
  }, []);

  return {
    characters,
    recordsCount
  };
};

export default fetchMarvelCharactersFromApi;
