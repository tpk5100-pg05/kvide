import { Typography } from '@mui/material';
import { useMemo } from 'react';
import { FlexBox } from '../styled';

const RoundIcon = ({
  color,
  content,
  size = 'md',
}: {
  color: string;
  content: string;
  size?: 'sm' | 'md' | 'lg';
}) => {
  const width = useMemo(() => {
    switch (size) {
      case 'sm':
        return '1.5rem';
      case 'md':
        return '2.5rem';
      case 'lg':
        return '3.5rem';
    }
  }, [size]);

  const height = useMemo(() => {
    switch (size) {
      case 'sm':
        return '1.5rem';
      case 'md':
        return '2.5rem';
      case 'lg':
        return '3.5rem';
    }
  }, [size]);

  const variant = useMemo(() => {
    switch (size) {
      case 'sm':
        return 'subtitle1';
      case 'md':
        return 'h6';
      case 'lg':
        return 'h5';
    }
  }, [size]);

  return (
    <FlexBox
      sx={{
        color: 'white',
        textShadow: ' -1px 1px 0 #000, 1px 1px 0 #000, 1px -1px 0 #000,-1px -1px 0 #000; ',
        backgroundColor: color,
        borderRadius: '100%',
        width: width,
        height: height,
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography variant={variant}>{content}</Typography>
    </FlexBox>
  );
};

export default RoundIcon;
