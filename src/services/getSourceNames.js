export const getSourceNames = (res) => res.map(elem => elem['name']);

export const getSourceNamesWithId = (res) => {
  let sourcesWithId = new Map();
  res.forEach(elem => sourcesWithId.set(elem['name'], elem['id']));
  return sourcesWithId;
}