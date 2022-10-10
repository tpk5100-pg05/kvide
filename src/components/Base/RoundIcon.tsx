import { Typography } from '@mui/material';
import { FlexBox } from '../styled';

const RoundIcon = ({ color, content }: { color: string; content: string }) => {
  return (
    <FlexBox
      sx={{
        color: 'gray',
        backgroundColor: color,
        borderRadius: '100%',
        width: '2rem',
        height: '2rem',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography variant="subtitle1">{content}</Typography>
    </FlexBox>
  );
};

export default RoundIcon;
