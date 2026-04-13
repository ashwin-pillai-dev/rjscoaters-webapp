export const params:requestParams={
    page: typeof(page) === 'string'?Number(page):1,
    limit:typeof(limit) === 'string'?Number(limit):10,
    filters:filter,
    orderBy:'id,ASC',
    fullTextSearch:''
  }