export const getQueryFromObject = obj => {
  let query = '?';
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      query += key + '=' + obj[key] + '&'; /*todo:query-string*/
    }
  }
  return query.slice(0, query.length - 1);
};
