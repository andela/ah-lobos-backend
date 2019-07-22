
const paginate = (page, pageSize) => {
  if (!page) {
    page = 1;
  }
  if (!pageSize) {
    pageSize = 10;
  }
  const offset = (page - 1) * (pageSize);
  const limit = pageSize;

  return {
    offset,
    limit
  };
};
export default paginate;
