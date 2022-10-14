import { useLiveQuery } from 'dexie-react-hooks';
import { useCallback, useMemo, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Button } from '@mui/material';

import { queryEpisodes } from '@/store/episodes';
import {
  PrintableEpisode,
  PrintableNotes,
  Symptom,
  Treatment,
  TreatmentEffectiveness,
} from '@/store/types';

import { ComponentToPrint } from '@/components/PDF/Pdfcomponent';

import { useNavigate } from 'react-router-dom';
import { routes } from '@/routes';
import { Pages } from '@/routes/types';

function ExportPDF() {
  const navigate = useNavigate();
  const episodes = useLiveQuery(() => queryEpisodes());
  const componentRef = useRef(null);

  const [printableEpisodes, comments] = useMemo(() => {
    const printableEpisodes: PrintableEpisode[] = [];
    const comments: PrintableNotes[] = [];

    if (!episodes) {
      return [[], []];
    }

    for (let i = 0; i < episodes.length; i++) {
      if (!episodes[i]) continue;

      console.log(TreatmentEffectiveness.GOOD_IMPROVEMENT);

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
    console.log('`onAfterPrint` called');
    navigate(routes[Pages.History].path);
  }, [navigate]);

  const handleBeforePrint = useCallback(() => {
    console.log('`onBeforePrint` called');
  }, []);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'history exported by <AppName>',
    onAfterPrint: handleAfterPrint,
    onBeforePrint: handleBeforePrint,
    removeAfterPrint: false,
  });

  return (
    <div>
      <Button onClick={handlePrint}>Print</Button>
      <div style={{ display: 'None' }}>
        <ComponentToPrint
          ref={componentRef}
          Heading="Event export"
          episodes={printableEpisodes}
          comments={comments}
        />
      </div>
    </div>
  );
}

export default ExportPDF;
