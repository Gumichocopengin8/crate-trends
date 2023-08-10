/**
 * Copyright (c) 2020-Present, Keita Nonaka
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import CratesView from 'components/shared/CratesView';
import Spinner from 'components/shared/Spinner';

const CratesCompare = (): JSX.Element => {
  return (
    <React.Suspense fallback={<Spinner />}>
      <CratesView />
    </React.Suspense>
  );
};

export default CratesCompare;
