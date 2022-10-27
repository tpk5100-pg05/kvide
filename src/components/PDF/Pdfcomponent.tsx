// Using a class component, everything works without issue
import React from 'react';
import { PrintableEpisode, PrintableNotes } from '@/store/types';

class PDFEventTableEntry extends React.PureComponent<{ episode: PrintableEpisode }> {
  render() {
    const episode: PrintableEpisode = this.props.episode;

    return (
      <>
        <tr>
          <th
            style={{ borderRight: '1px solid black', borderTop: '2px solid black', color: 'black' }}
          >
            {episode.date_time}
          </th>
          <th
            style={{ borderRight: '2px solid black', borderTop: '2px solid black', color: 'black' }}
          >
            {episode.start_time}
          </th>
          <th
            style={{ borderRight: '2px solid black', borderTop: '2px solid black', color: 'black' }}
          >
            {episode.pain_level}
          </th>
          <th
            style={{ borderRight: '2px solid black', borderTop: '2px solid black', color: 'black' }}
          >
            {episode.triggers}
          </th>
          <th
            style={{ borderRight: '1px solid black', borderTop: '2px solid black', color: 'black' }}
          >
            {episode.symptoms}
          </th>
          <th
            style={{ borderRight: '1px solid black', borderTop: '2px solid black', color: 'black' }}
          >
            {episode.notes}
          </th>
        </tr>
        <tr>
          <th style={{ borderRight: '1px solid black', color: 'black' }}></th>
          <th style={{ borderRight: '2px solid black', color: 'black' }}>{episode.end_time}</th>
          <th style={{ borderRight: '2px solid black', color: 'black' }}></th>
          <th style={{ borderRight: '1px solid black', color: 'black' }}></th>
          <th
            style={{
              borderRight: '1px solid black',
              borderTop: '2px solid black',
              fontStyle: 'oblique',
              color: 'black',
            }}
          >
            {episode.medications}
          </th>
          <th
            style={{
              borderRight: '1px solid black',
              borderTop: '2px solid black',
              fontStyle: 'oblique',
              color: 'black',
            }}
          >
            {episode.treatment_effectiveness}
          </th>
        </tr>
      </>
    );
  }
}

class PDFEventCommentEntry extends React.PureComponent<{ comment: PrintableNotes }> {
  render() {
    const commentData: PrintableNotes = this.props.comment;

    return (
      <div>
        <h4 style={{ color: 'black' }}>
          {commentData.notesNum} at {commentData.date}
        </h4>
        <p style={{ color: 'black' }}>{commentData.notes}</p>
      </div>
    );
  }
}

export class ComponentToPrint extends React.PureComponent<{
  episodes: PrintableEpisode[];
  comments: PrintableNotes[];
  Heading: string;
}> {
  render() {
    const episodes: PrintableEpisode[] = this.props.episodes;
    const comments: PrintableNotes[] = this.props.comments;

    return (
      //<div>My cool content here!</div>
      <div className="relativeCSS">
        <style type="text/css" media="print">
          {
            '\
             @page { size: A4 portrait; \
             margin: 2cm;\
              }\
             '
          }
        </style>
        <div style={{ width: '100%' }}>
          <h2 style={{ color: 'black', textAlign: 'center' }}>{this.props.Heading}</h2>
        </div>
        <table style={{ border: '2px solid black', width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ borderRight: '1px solid black', color: 'black' }}>Date</th>
              <th style={{ borderRight: '1px solid black', color: 'black' }}>Start</th>
              <th style={{ borderRight: '2px solid black', color: 'black' }}>Pain</th>
              <th style={{ borderRight: '2px solid black', color: 'black' }}>Triggers</th>
              <th
                style={{
                  borderRight: '1px solid black',
                  borderBottom: '2px solid black',
                  color: 'black',
                }}
              >
                Symptoms
              </th>
              <th
                style={{
                  borderRight: '1px solid black',
                  borderLeft: '2px solid black',
                  borderBottom: '2px solid black',
                }}
              >
                Comment
              </th>
            </tr>
            <tr>
              <th style={{ borderRight: '1px solid black', color: 'black' }}></th>
              <th style={{ borderRight: '1px solid black', color: 'black' }}>End</th>
              <th style={{ borderRight: '2px solid black', color: 'black' }}>state</th>
              <th style={{ borderRight: '2px solid black', color: 'black' }}></th>
              <th style={{ borderRight: '1px solid black', fontStyle: 'oblique', color: 'black' }}>
                Treatment executed
              </th>
              <th style={{ border: '1px solid black', fontStyle: 'oblique', color: 'black' }}>
                effect
              </th>
            </tr>
          </thead>
          <tbody>
            {episodes &&
              episodes.map((episode) => (
                <PDFEventTableEntry key={episode.id} episode={episode}></PDFEventTableEntry>
              ))}
          </tbody>
        </table>
        <h2>Comments:</h2>
        {comments &&
          comments.map((comment) => (
            <PDFEventCommentEntry key={comment.id} comment={comment}></PDFEventCommentEntry>
          ))}
      </div>
    );
  }
}
