import  { Suspense, lazy } from 'react'


const muiLazyLoader = (importFunc: any, { fallback = null } = { fallback: null }) => {
    const LazyComponent = lazy(importFunc);
  
    return (props: any) => (
      <Suspense fallback={fallback}>
        <LazyComponent {...props} />
      </Suspense>
    );
  };

export default muiLazyLoader;