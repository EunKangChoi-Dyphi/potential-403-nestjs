/**
 *  (example 1) separator: '-', strings: ['k', 'token1234' ]
 *  (result 1) 'k-token1234'
 * */
export const joinSeparators = (separator: string, ...strings: string[]) => {
  return strings.join(separator);
};

/**
 * where문의 조건이 여러개일경우 사용되는 쿼리 유틸리티 함수
 */
export const findWithWhereClauses = (filters: Record<string, any>, searchFields?: string[]) => {
  const whereClauses = {};

  for (const key in filters) {
    if (filters[key] === "") continue;

    if (searchFields?.includes(key)) {
      whereClauses[key] = { contains: filters[key] };
    } else {
      whereClauses[key] = filters[key];
    }
    return whereClauses;
  }
};
