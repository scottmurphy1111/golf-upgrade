import { useState, useCallback } from 'react';
// import { MetaContext } from '../state/MetaContext';

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
