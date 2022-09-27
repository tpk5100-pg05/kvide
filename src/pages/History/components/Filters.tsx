import { FlexBox } from '@/components/styled';
import { EpisodeOrder, EpisodeOrderBy } from '@/store/episodes/types';
import { Box, Button, MenuItem, TextField } from '@mui/material';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';

import ArrowUpIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownIcon from '@mui/icons-material/ArrowDownward';

const Filters = ({
  //   onQueryChange,
  onOrderChange,
  onOrderByChange,
  sortOptions,
  defaultOrderBy,
}: {
  //   onQueryChange: (query: EpisodeQuery) => void;
  onOrderByChange: (orderBy: EpisodeOrderBy) => void;
  onOrderChange: (order: EpisodeOrder) => void;
  sortOptions: EpisodeOrderBy[];
  defaultOrderBy: EpisodeOrderBy;
}) => {
  const [order, setEpisodeOrder] = useState<EpisodeOrder>('desc');

  useEffect(() => {
    onOrderChange(order);
  }, [order, onOrderChange]);

  const selectOnChange = useCallback(
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      onOrderByChange(event.target.value as EpisodeOrderBy);
    },
    [onOrderByChange],
  );

  return (
    <FlexBox sx={{ alignItems: 'center', width: '100%', paddingTop: 3 }}>
      <Box flexGrow={1} sx={{ flexGrow: 1 }}></Box>
      <TextField label={'Sort by'} onChange={selectOnChange} defaultValue={defaultOrderBy} select>
        {sortOptions.map((option) => (
          <MenuItem key={option} value={option}>
            {prettifyString(option)}
          </MenuItem>
        ))}
      </TextField>
      <Button
        color="info"
        onClick={() =>
          setEpisodeOrder((prev) => {
            if (prev === 'desc') {
              return 'asc';
            }
            return 'desc';
          })
        }
      >
        {order === 'asc' ? <ArrowUpIcon /> : <ArrowDownIcon />}
      </Button>
    </FlexBox>
  );
};

const prettifyString = (str: string): string => {
  return str.replace(/_/g, ' ').replace(/(^\w{1})|(\s{1}\w{1})/g, (match) => match.toUpperCase());
};

export default Filters;
