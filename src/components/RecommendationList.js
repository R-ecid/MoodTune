// src/components/RecommendationList.js
import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Collapse,
  IconButton,
} from '@mui/material';
import { PlayArrow, ExpandLess, ExpandMore } from '@mui/icons-material';

const RecommendationList = ({ recommendations }) => {
  const [openIndex, setOpenIndex] = React.useState(null);

  const handleClick = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <List>
      {recommendations.map((song, index) => (
        <React.Fragment key={song.id}>
          <ListItem button onClick={() => handleClick(index)}>
            <ListItemAvatar>
              <Avatar src={song.albumArt} alt={song.title} />
            </ListItemAvatar>
            <ListItemText primary={song.title} secondary={song.artist} />
            {openIndex === index ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openIndex === index} timeout="auto" unmountOnExit>
            {song.previewUrl && (
              <IconButton
                color="primary"
                onClick={() => window.open(song.previewUrl, '_blank')}
              >
                <PlayArrow />
              </IconButton>
            )}
          </Collapse>
        </React.Fragment>
      ))}
    </List>
  );
};

export default RecommendationList;
