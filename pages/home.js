import dynamic from 'next/dynamic'

const HomePage = dynamic(() => import('../components/landingPage/src/index'))

export default function HOME() {
  return (
    <HomePage />
);
};

