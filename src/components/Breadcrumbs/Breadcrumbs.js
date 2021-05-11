import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useIsMountedRef from '../../hooks/useIsMountedRef';

const Breadcrumbs = ({ productName }) => {
  const [breadcrumbs, setBreadcrumbs] = useState(null);
  const isMountedRef = useIsMountedRef();
  const location = useLocation();

  useEffect(() => {
    function handleBreadcrumbsUpdate() {
      let createBreadcrumbs;
      const pathname = location.pathname;
      if (pathname && pathname.includes('products')) {
        createBreadcrumbs = pathname.split('/').splice(1, 2);
        setBreadcrumbs(() => ['Golf Shop', ...createBreadcrumbs]);
      } else if (pathname && pathname.includes('prod_')) {
        createBreadcrumbs = pathname.split('/').splice(1, 1);
        createBreadcrumbs.push(productName);
        setBreadcrumbs(() => ['Golf Shop', ...createBreadcrumbs]);
      } else {
        setBreadcrumbs(() => ['']);
      }
    }

    if (isMountedRef.current) {
      handleBreadcrumbsUpdate();
    }
  }, [location, isMountedRef, productName]);

  return (
    <div className="breadcrumbs-container">
      <ul>
        {breadcrumbs && breadcrumbs.length === 1 && <span>golf shop</span>}
        {breadcrumbs &&
          breadcrumbs.length &&
          breadcrumbs.map((item, i) =>
            breadcrumbs.length === i + 1 ? (
              <span key={i}>{item}</span>
            ) : (
              <li key={i} className="carot">
                <Link to={`/${item}`}>{item}</Link>
              </li>
            )
          )}
      </ul>
    </div>
  );
};

export default Breadcrumbs;
