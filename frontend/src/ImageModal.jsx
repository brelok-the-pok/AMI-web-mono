import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

export const ImageModal = ({images}) => {

  return (
    <ImageList sx={{ width: "100%", height: "100%" }} cols={2} rowHeight="100%">
      {images.map((item) => (
        <ImageListItem key={item}>
          <img
            srcSet={`${item}`}
            src={`${item}`}
            alt={"img"}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}


