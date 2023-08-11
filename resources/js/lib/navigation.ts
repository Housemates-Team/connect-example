export const updateQueryParam = (
  location: Location,
  params: Record<string, string | undefined>,
) => {
  const queryParams = new URLSearchParams(location.search);

  Object.entries(params).forEach(([name, value]) => {
    if (value === undefined) {
      queryParams.delete(name);
    } else {
      queryParams.set(name, value);
    }
  });

  // Construct the new URL with the updated page parameter
  const newUrl = [location.origin, location.pathname, `?${queryParams.toString()}`].join('');

  return newUrl;
};
