const paginate = require("jw-paginate");

function getUniqueCategories(_array) {
  let newArray = _array.filter(
    (element, index, array) => array.indexOf(element) === index
  );
  return newArray;
}

function pagination(res, result, page) {
  const pageSize = 6;
  const pager = paginate(result.length, page, pageSize);
  const moviesList = result.slice(pager.startIndex, pager.endIndex + 1);
  return res.json({ pager, moviesList });
}

module.exports = { getUniqueCategories, pagination };
