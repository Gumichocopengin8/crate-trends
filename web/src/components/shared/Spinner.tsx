import { css } from '@emotion/react';

interface Props {
  loadingMessage?: string;
}

const Spinner = ({ loadingMessage }: Props): JSX.Element => {
  return (
    <div css={PageIndicator}>
      <div className="loader" />
      <div style={{ color: 'skyblue' }}>{loadingMessage}</div>
    </div>
  );
};

const PageIndicator = css`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .loader,
  .loader:before,
  .loader:after {
    width: 1rem;
    height: 1rem;
    margin-bottom: 8rem;
    animation: load1 1s infinite ease-in-out;
    background: rgba(0, 0, 0, 0);
    border-radius: 1rem;
  }
  .loader {
    color: #eb7f04;
    -ms-transform: translateZ(0);
    transform: translateZ(0);
    animation-delay: -0.16s;
  }
  .loader:before,
  .loader:after {
    position: absolute;
    top: 0;
    content: '';
  }
  .loader:before {
    left: -1.5rem;
    animation-delay: -0.4s;
  }
  .loader:after {
    left: 1.5rem;
  }

  @keyframes load1 {
    0%,
    100% {
      box-shadow: 0 0.5rem;
    }
    50% {
      box-shadow: 0 2rem;
    }
  }
`;

export default Spinner;
