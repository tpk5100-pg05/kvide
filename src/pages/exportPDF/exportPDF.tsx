import { useLiveQuery } from 'dexie-react-hooks';

import { queryEpisodes } from '@/store/episodes';
import {
  PrintableEpisode,
  PrintableNotes,
  Symptom,
  Treatment,
  TreatmentEffectiveness,
} from '@/store/types';

import React from 'react';
import ReactToPrint from 'react-to-print';

import { ComponentToPrint } from '@/components/PDF/Pdfcomponent';

function ExportPDF() {
  const episodes = useLiveQuery(() => queryEpisodes());

  console.log(episodes);

  const comments: PrintableNotes[] = [];
  const printableEpisodes: PrintableEpisode[] = [];

  //Prepare episodes
  if (episodes) {
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
  }
  console.log('conv', printableEpisodes, comments);
  const componentRef = React.useRef(null);

  const handleAfterPrint = React.useCallback(() => {
    console.log('`onAfterPrint` called');
  }, []);

  const handleBeforePrint = React.useCallback(() => {
    console.log('`onBeforePrint` called');
  }, []);

  const reactToPrintContent = React.useCallback(() => {
    return componentRef.current;
  }, []);

  const reactToPrintTrigger = React.useCallback(() => {
    // NOTE: could just as easily return <SomeComponent />. Do NOT pass an `onClick` prop
    // to the root node of the returned component as it will be overwritten.

    // Bad: the `onClick` here will be overwritten by `react-to-print`
    // return <button onClick={() => alert('This will not work')}>Print this out!</button>;

    // Good
    return <button>Print using a Functional Component</button>;
  }, []);

  return (
    <div>
      <ReactToPrint
        content={reactToPrintContent}
        documentTitle="history exported by <AppName>"
        onAfterPrint={handleAfterPrint}
        onBeforePrint={handleBeforePrint}
        removeAfterPrint
        trigger={reactToPrintTrigger}
      />
      <ComponentToPrint
        ref={componentRef}
        Heading="Event export"
        episodes={printableEpisodes}
        comments={comments}
      />
    </div>
  );
}

export default ExportPDF;
