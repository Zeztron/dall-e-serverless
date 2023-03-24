const fetchSuggestion = async () => {
  const suggestion = await fetch('/api/suggestion', { cache: 'no-store' }).then(
    (response) => response.json()
  );

  return suggestion;
};

export default fetchSuggestion;
