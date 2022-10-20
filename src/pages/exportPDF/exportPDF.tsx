import { useCallback, useMemo, useRef, useState } from 'react';
import { useLiveQuery } from 'dexie-react-hooks';
import { useNavigate } from 'react-router-dom';
import { useReactToPrint } from 'react-to-print';
import dayjs from 'dayjs';
import { Button, Container, FormControl, InputLabel, MenuItem, Select, Stack } from '@mui/material';

import { ComponentToPrint } from '@/components/PDF/Pdfcomponent';
import Meta from '@/components/Meta';

import { queryEpisodes } from '@/store/episodes';
import {
  PrintableEpisode,
  PrintableNotes,
  Symptom,
  Treatment,
  TreatmentEffectiveness,
} from '@/store/types';

import { routes } from '@/routes';
import { Pages } from '@/routes/types';

function ExportPDF() {
  const navigate = useNavigate();
  const componentRef = useRef(null);

  const [intervalFilter, setIntervalFilter] = useState(7);
  const episodes = useLiveQuery(() => {
    const now = dayjs();
    const after = now.subtract(intervalFilter, 'day').toDate();
    return intervalFilter > 0 ? queryEpisodes({ after }) : queryEpisodes();
  }, [intervalFilter]);

  const [printableEpisodes, comments] = useMemo(() => {
    const printableEpisodes: PrintableEpisode[] = [];
    const comments: PrintableNotes[] = [];

    if (!episodes) {
      return [[], []];
    }

    for (let i = 0; i < episodes.length; i++) {
      if (!episodes[i]) continue;

      const printEpisode: PrintableEpisode = {
        id: i,
        start_time: episodes[i].start_time.toLocaleTimeString('it-IT'),
        end_time: episodes[i].end_time?.toLocaleTimeString('it-IT') ?? '?',
        date_time: episodes[i].start_time.toDateString(),
        pain_level: episodes[i].pain_level?.toString() ?? '?',
        treatment_effectiveness: !episodes[i]
          ? ' '
          : episodes[i].treatment_effectiveness == TreatmentEffectiveness.NO_IMPROVEMENT
          ? 'N'
          : episodes[i].treatment_effectiveness == TreatmentEffectiveness.RELAPSE
          ? 'R'
          : episodes[i].treatment_effectiveness == TreatmentEffectiveness.GOOD_IMPROVEMENT
          ? 'G'
          : 'M',
        medications: episodes[i].treatments
          .map((m: Treatment) => (m.name ? m.name : '?'))
          .join(' '),
        symptoms: episodes[i].symptoms.map((m: Symptom) => (m.name ? m.name : '?')).join(' '),
        notes: '',
      };

      if (episodes[i].notes) {
        const num: number = comments.length;
        printEpisode.notes = num.toString();
        comments.push({
          notesNum: '#' + num.toString(),
          id: num,
          notes: episodes[i].notes ?? ' ',
          date: episodes[i].start_time.toDateString(),
        });
      } else {
        printEpisode.notes = '';
      }
      printableEpisodes.push(printEpisode);
    }

    return [printableEpisodes, comments];
  }, [episodes]);

  const handleAfterPrint = useCallback(() => {
    navigate(routes[Pages.History].path);
  }, [navigate]);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'history exported by <AppName>',
    onAfterPrint: handleAfterPrint,
    removeAfterPrint: false,
  });

  return (
    <>
      <Meta title="Export PDF" />

      <Container sx={{ paddingY: '1rem' }}>
        <Stack>
          <FormControl sx={{ flexGrow: 1, flex: 1 }}>
            <InputLabel>Interval</InputLabel>
            <Select
              label="Interval"
              value={intervalFilter}
              onChange={(event) => setIntervalFilter(event.target.value as number)}
            >
              <MenuItem value={7}>last 7 days</MenuItem>
              <MenuItem value={30}>last 30 days</MenuItem>
              <MenuItem value={90}>last 90 days</MenuItem>
              <MenuItem value={0}>since the dawn of time</MenuItem>
            </Select>
          </FormControl>
          <Button variant="outlined" size="large" onClick={handlePrint}>
            Export
          </Button>
        </Stack>
      </Container>

      <div style={{ display: 'None' }}>
        <ComponentToPrint
          ref={componentRef}
          Heading="Event export"
          episodes={printableEpisodes}
          comments={comments}
        />
      </div>
    </>
  );
}

export default ExportPDF;
