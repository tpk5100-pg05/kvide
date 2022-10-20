import { FlexBox } from '@/components/styled';
import { Box, Card, TextField, Typography } from '@mui/material';

const Comment = ({
  title,
  isEdit,
  comment,
  onCommentChange,
}: {
  title: string;
  isEdit: boolean;
  comment: string | undefined;
  onCommentChange: (start: string) => void;
}) => {
  if (isEdit) {
    return (
      <Card sx={{ width: '100%', p: 1, pb: 4, pr: 4, pl: 4 }}>
        <FlexBox sx={{ width: '100%', p: 1 }}>
          <Typography variant="h6">{title}</Typography>
        </FlexBox>
        <FlexBox sx={{ width: '100%', p: 1 }}>
          <TextField
            sx={{ width: '100%', p: 1 }}
            id="standard-multiline-static"
            multiline
            rows={6}
            defaultValue={comment}
            onBlur={(e) => onCommentChange(e.target.value)}
            variant="standard"
          />
        </FlexBox>
      </Card>
    );
  }

  return (
    <Card sx={{ width: '100%', p: 1, pb: 4, pr: 4, pl: 4 }}>
      <Box sx={{ width: '100%', p: 1 }}>
        <Typography variant="h6">{title}</Typography>
      </Box>
      <p>{comment}</p>
    </Card>
  );
};

export default Comment;
