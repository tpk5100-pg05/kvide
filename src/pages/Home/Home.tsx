import Graph from '@/components/Graph';
import Meta from '@/components/Meta';
import { FullSizeCenteredFlexBox } from '@/components/styled';

function Home() {
  return (
    <>
      <Meta title="Home" />
      <FullSizeCenteredFlexBox flexDirection={'column'}>
        <Graph />
      </FullSizeCenteredFlexBox>
    </>
  );
}

export default Home;
