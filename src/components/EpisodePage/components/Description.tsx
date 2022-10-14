import { FlexBox } from '@/components/styled';
import { Typography } from '@mui/material';

const Description = ({ description }: { description: string }) => {
  return (
    <FlexBox sx={{ width: '100%' }}>
      <Typography variant="body1" component="h2" sx={{ marginLeft: 4 }}>
        {description}
      </Typography>
    </FlexBox>
  );
};

export default Description;
