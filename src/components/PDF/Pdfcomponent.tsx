// Using a class component, everything works without issue
import React from 'react';
import { PrintableEpisode, PrintableNotes } from '@/store/types';

class PDFEventTableEntry extends React.PureComponent<{ episode: PrintableEpisode }> {
  render() {
    const episode: PrintableEpisode = this.props.episode;

    return (
      <>
        <tr>
          <th style={{ borderRight: '1px solid', borderTop: '2px solid' }}>{episode.date_time}</th>
          <th style={{ borderRight: '1px solid', borderTop: '2px solid' }}>{episode.start_time}</th>
          <th style={{ borderRight: '1px solid', borderTop: '2px solid' }}>{episode.pain_level}</th>
          <th style={{ borderRight: '1px solid', borderTop: '2px solid' }}>{episode.symptoms}</th>
          <th style={{ borderRight: '1px solid', borderTop: '2px solid' }}>{episode.notes}</th>
        </tr>
        <tr>
          <th style={{ borderRight: '1px solid' }}></th>
          <th style={{ borderRight: '1px solid' }}>{episode.end_time}</th>
          <th style={{ borderRight: '1px solid' }}></th>
          <th style={{ borderRight: '1px solid', borderTop: '2px solid', fontStyle: 'oblique' }}>
            {episode.medications}
          </th>
          <th style={{ borderRight: '1px solid', borderTop: '2px solid', fontStyle: 'oblique' }}>
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
        <h4>
          {commentData.notesNum} at {commentData.date}
        </h4>
        <p>{commentData.notes}</p>
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
        <table style={{ border: '2px solid', width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ borderRight: '1px solid' }}>Date</th>
              <th style={{ borderRight: '1px solid' }}>Start</th>
              <th style={{ borderRight: '2px solid' }}>Pain</th>
              <th style={{ borderRight: '1px solid', borderBottom: '2px solid' }}>Symptons</th>
              <th
                style={{
                  borderRight: '1px solid',
                  borderLeft: '2px solid',
                  borderBottom: '2px solid',
                }}
              >
                Comment
              </th>
            </tr>
            <tr>
              <th style={{ borderRight: '1px solid' }}></th>
              <th style={{ borderRight: '1px solid' }}>End</th>
              <th style={{ borderRight: '2px solid' }}>state</th>
              <th style={{ borderRight: '1px solid', fontStyle: 'oblique' }}>Treatment executed</th>
              <th style={{ border: '1px solid', fontStyle: 'oblique' }}>effect</th>
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
