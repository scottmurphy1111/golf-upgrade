import { useState, useCallback } from 'react';

export const useBreadcrumbs = () => {
  const [breadcrumbs, setBreadcrumbs] = useState(['shop']);

  // function setCurrentBreadcrumbs(currentBreadcrumbs) {
  //   console.log('current bs 🦈', currentBreadcrumbs);
  //   setBreadcrumbs(currentBreadcrumbs);
  // }
  // console.log('bcrumbs', breadcrumbs);
  console.log('hook ↩', breadcrumbs);

  return {
    breadcrumbs,
    setBreadcrumbs,
  };
};
