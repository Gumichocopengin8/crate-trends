import React from 'react';
import CrateDetailView from 'components/shared/CrateDetailView';
import Spinner from 'components/shared/Spinner';

const CrateDetailPage = (): JSX.Element => {
  return (
    <React.Suspense fallback={<Spinner />}>
      <CrateDetailView />
    </React.Suspense>
  );
};

export default CrateDetailPage;
