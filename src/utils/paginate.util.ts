export const getRange = (pageParam: number, limit: number) => {
  const from = (pageParam - 1) * limit;
  const to = pageParam * limit - 1;

  return [from, to];
};

export const getTotalPages = (count: number | null, limit: number) => {
  return count ? Math.ceil(count / limit) : 0;
};
