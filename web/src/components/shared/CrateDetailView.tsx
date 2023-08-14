import { useRouter } from 'next/router';
import { css } from '@emotion/react';
import { useRecoilValue } from 'recoil';
import { crateDataResultsState } from 'recoil/atoms';
import CrateSizeChart from 'components/details/[crate_name]/CrateSizeChart';
import { Typography } from '@mui/material';

const CrateDetailView = (): JSX.Element => {
  const router = useRouter();
  const { crate_name } = router.query;
  const crateNameList = crate_name ? [crate_name.toString()] : [];
  const crateDataResult = useRecoilValue(crateDataResultsState(crateNameList));

  return (
    <>
      <div css={Wrapper}>
        <div>
          {crateDataResult.map((crate) => (
            <div key={crate.crate.id}>
              <Typography variant="h5" component="h2" gutterBottom>
                {crate.crate.name}
              </Typography>
              <Typography variant="body1">{crate.crate.description}</Typography>
              <CrateSizeChart versionList={[...crate.versions].reverse()} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

const Wrapper = css`
  flex: 1;
`;

export default CrateDetailView;
