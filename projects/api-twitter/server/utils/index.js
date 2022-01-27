const config = require('../config');

const { pagination, sort } = config;

exports.paginationParams = ({
  limit = pagination.limit,
  page = pagination.page,
  skip = pagination.skip,
}) => ({
  limit: Number.parseInt(limit, 10),
  page: Number.parseInt(page, 10),
  skip: skip ? Number.parseInt(skip, 10) : (page - 1) * 10,
});

exports.sortParams = (
  { sortBy = sort.sortBy.default, direction = sort.direction.default },
  fields,
) => {
  const safeList = {
    sortBy: [...Object.getOwnPropertyNames(fields), ...sort.sortBy.fields],
    direction: sort.direction.options,
  };
  return {
    sortBy: safeList.sortBy.includes(sortBy) ? sortBy : sort.sortBy.default,
    direction: safeList.direction.includes(direction)
      ? direction
      : sort.direction.default,
  };
};

exports.sortTransform = (sortBy, direction) => {
  const dir = direction === 'desc' ? '-' : '';
  return `${dir}${sortBy}`;
};

exports.filterByNested = (params, referencesNames) => {
  const paramsName = Object.getOwnPropertyNames(params);
  const populateNames = referencesNames.filter(
    (item) => !paramsName.includes(item),
  );

  return {
    filters: params,
    populate: populateNames.join(' '),
  };
};
