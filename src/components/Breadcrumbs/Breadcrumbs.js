import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import useIsMountedRef from '../../hooks/useIsMountedRef';
import { AppContext } from '../../state/AppContext';

const Breadcrumbs = ({ category, productName, checkout }) => {
  console.log('productName', productName);
  const [breadcrumbs, setBreadcrumbs] = useState(null);
  const isMountedRef = useIsMountedRef();
  const location = useLocation();

  useEffect(() => {
    function handleBreadcrumbsUpdate() {
      let createBreadcrumbs;
      // console.log('pathname change 🍕', location);
      const pathname = location.pathname;
      if (pathname && pathname.includes('products')) {
        createBreadcrumbs = pathname.split('/').splice(1, 2);
        setBreadcrumbs(() => ['shop', ...createBreadcrumbs]);
      } else if (pathname && pathname.includes('prod_')) {
        createBreadcrumbs = pathname.split('/').splice(1, 1);
        createBreadcrumbs.push(productName.replaceAll(' ', '-'));
        setBreadcrumbs(() => ['shop', ...createBreadcrumbs]);
      } else {
        setBreadcrumbs(() => ['shop']);
      }
    }

    if (isMountedRef.current) {
      handleBreadcrumbsUpdate();
    }
  }, [location, isMountedRef]);

  console.log('breadcrumbs in component ', breadcrumbs);
  return (
    <div>
      {breadcrumbs &&
        breadcrumbs.length &&
        breadcrumbs.map((item, i) => (
          <Link key={i} to={`/${item}`}>
            {item}
          </Link>
        ))}
    </div>
  );
};

export default Breadcrumbs;
