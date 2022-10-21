import { addSymptom, querySymptoms } from '@/store/symptoms';
import { Episode, Symptom, Treatment } from '@/store/types';
import Edit from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { Box, Button, Typography } from '@mui/material';
import { useCallback, useState } from 'react';
import { FlexBox } from '../styled';
import ItemsView from './components/ItemsView';
import { addTreatment, queryTreatments } from '@/store/treatments';
import PsychologyAlt from '@mui/icons-material/PsychologyAlt';
import MedicationIcon from '@mui/icons-material/Medication';
import PainIndicator from '../Base/PainIndicator';
import TreatmentEfficacyIndicator from '../Base/TreatmentEfficacyIndicator';
import Level from './components/Level';
import Comment from './components/Comment';
import Description from './components/Description';
import { getPainLevelDescription, getTreatmentEfficacyDescription } from '@/constants/descriptions';
import Duration from './components/Duration';
import { Dayjs } from 'dayjs';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const EpisodePage = ({
  episode,
  title,
  onEpisodeSave,
  add = false,
}: {
  title?: string;
  episode: Episode;
  onEpisodeSave: (ep: Episode) => void;
  add?: boolean;
}) => {
  const [isEditing, setIsEditing] = useState(Boolean(add));
  const [updatedEpisode, setUpdatedEpisode] = useState(episode);

  const navigate = useNavigate();

  const onStartChange = useCallback((start: Dayjs | null) => {
    if (start === null) {
      return;
    }

    setUpdatedEpisode((prev) => ({ ...prev, start_time: start.toDate() }));
  }, []);

  const onEndChange = useCallback((end: Dayjs | null) => {
    if (end === null) {
      return;
    }

    setUpdatedEpisode((prev) => ({ ...prev, end_time: end.toDate() }));
  }, []);

  const onPainLevelChange = useCallback((pain: number) => {
    setUpdatedEpisode((prev) => ({ ...prev, pain_level: pain }));
  }, []);

  const onTreatmentEfficacyChange = useCallback((efficacy: number) => {
    setUpdatedEpisode((prev) => ({ ...prev, treatment_effectiveness: efficacy }));
  }, []);

  const onSymptomsChange = useCallback((symptoms: Symptom[]) => {
    setUpdatedEpisode((prev) => ({ ...prev, symptoms: symptoms }));
  }, []);

  const onTreatmentsChange = useCallback((treatments: Treatment[]) => {
    setUpdatedEpisode((prev) => ({ ...prev, treatments: treatments }));
  }, []);

  const onCommentChange = useCallback((comment: string) => {
    setUpdatedEpisode((prev) => ({ ...prev, notes: comment }));
  }, []);

  const onSave = () => {
    onEpisodeSave(updatedEpisode);
    setIsEditing(false);
  };

  return (
    <>
      <FlexBox flexDirection={'column'} sx={{ width: '100%', alignItems: 'center', p: 2 }}>
        <FlexBox flexDirection={'row'} sx={{ width: '100%' }}>
          <Button color="primary" sx={{ cursor: 'pointer' }} onClick={() => navigate(-1)}>
            <ArrowBackIcon />
          </Button>
        </FlexBox>
        {title && (
          <Typography variant="h4" component="h1" sx={{ marginBottom: 2, display: 'inline-block' }}>
            {title}
          </Typography>
        )}
        <Duration
          isEdit={isEditing}
          start={updatedEpisode.start_time}
          end={updatedEpisode.end_time || new Date()}
          onStartChange={onStartChange}
          onEndChange={onEndChange}
        />
        <Box sx={{ p: 2, width: '100%' }}></Box>
        <Level
          title={'Pain level'}
          isEdit={isEditing}
          step={0.5}
          steps={[1, 1.5, 2, 2.5, 3]}
          level={episode.pain_level}
          onChange={onPainLevelChange}
          Indicator={PainIndicator}
        >
          <Description description={getPainLevelDescription(updatedEpisode.pain_level ?? -1)} />
        </Level>
        <Box sx={{ p: 2, width: '100%' }}></Box>
        <ItemsView
          isEdit={isEditing}
          items={episode.symptoms}
          icon={<PsychologyAlt sx={{ fontSize: 40 }} />}
          onChange={onSymptomsChange}
          onItemCreated={addSymptom}
          itemClass="Symptom"
          queryItems={querySymptoms}
        />
        <Box sx={{ p: 2, width: '100%' }}></Box>
        <ItemsView
          isEdit={isEditing}
          items={episode.treatments}
          icon={<MedicationIcon sx={{ fontSize: 40 }} />}
          onChange={onTreatmentsChange}
          onItemCreated={addTreatment}
          itemClass="Treatment"
          queryItems={queryTreatments}
        />
        <Box sx={{ p: 2, width: '100%' }}></Box>
        <Level
          title={'Treatment efficiency'}
          isEdit={isEditing}
          steps={[0, 1, 2, 3]}
          level={episode.treatment_effectiveness?.valueOf()}
          onChange={onTreatmentEfficacyChange}
          Indicator={TreatmentEfficacyIndicator}
        >
          <Description
            description={getTreatmentEfficacyDescription(
              updatedEpisode.treatment_effectiveness ?? -1,
            )}
          />
        </Level>
        <Box sx={{ p: 2, width: '100%' }}></Box>
        <Comment
          title={'Comments'}
          isEdit={isEditing}
          comment={episode.notes}
          onCommentChange={onCommentChange}
        />
        <Box sx={{ p: 2, width: '100%' }}></Box>
        {!isEditing ? (
          <Button
            onClick={() => setIsEditing(true)}
            style={{ cursor: 'hover', float: 'right' }}
            color="primary"
          >
            <Edit /> <Typography sx={{ ml: 1 }}>Edit episode</Typography>
          </Button>
        ) : (
          <Button color="primary" onClick={onSave} startIcon={<SaveIcon />}>
            Save
          </Button>
        )}
      </FlexBox>
    </>
  );
};

export default EpisodePage;
