import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  List,
  ListItem,
  ListItemText,
  Button,
  Collapse,
  ListItemButton,
  ListItemIcon,
  ListSubheader,
} from "@mui/material";

import React, { useState } from "react";
import ReactPlayer from "react-player";

const CoursePage = () => {
  const [open, setOpen] = React.useState(true);
  const handleClick = () => {
    setOpen(!open);
  };

  const course = {
    title: "Curso de React",
    description: "Este curso te enseñará a crear aplicaciones web con React.",
    image: "/images/banners/banner-1.jpg",
    sections: [
      {
        title: "Introducción",
        videos: [
          {
            id: 1,
            title: "Introducción a React",
            description: "Este video te enseñará los conceptos básicos de React.",
            url: "https://res.cloudinary.com/dw5wd0zkt/video/upload/v1699679814/wqvtrskflc739p2z6do4.mp4",
          },
        ],
      },
      {
        title: "Componentes",
        videos: [
          {
            id: 2,
            title: "Componentes de React",
            description: "Este video te enseñará a crear y utilizar componentes de React.",
            url: "https://res.cloudinary.com/dw5wd0zkt/video/upload/v1699683868/ITA_-_How_could_this_happen_to_banana_Joe_zg31ju.mp4",
          },
        ],
      },
    ],
  };
  const [videoState, setVideoState] = useState(course.sections[0].videos[0].url);

  const handleClickOpen = () => {
    // Recarga la página con la URL del video seleccionado
    window.location.href = videoState;
  };

  return (
    <Container>
      <Grid marginBottom={4} item xs={12} md={12}>
        <Card>
          <Typography padding={4} variant="h3">
            {course.title}
          </Typography>
        </Card>
      </Grid>

      <Grid container spacing={6}>
        <Grid item xs={12} md={12}>
          <ReactPlayer
            url={videoState}
            controls={true}
            width={"100%"}
            height={"550px"}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <Typography paddingBottom={4} variant="h4">
            Contenido del Curso
          </Typography>
        </Grid>
      </Grid>

      <Grid item xs={12} md={12}>
        <List
          sx={{ width: '100%', bgcolor: 'background.paper' }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              Secciones
            </ListSubheader>
          }
        >
          {course.sections.map((section) => (

            <Grid>
              <Grid>
                <ListItemButton key={section.title} >
                  <ListItemText primary={section.title + ':'} onClick={handleClick} />
                </ListItemButton>
              </Grid>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding >
                  {section.videos.map((video) => (
                    <ListItemButton sx={{ pl: 4 }} key={video.id}>
                      <ListItemText
                        secondary={`- ${video.title}`}
                        onClick={() => {
                          setVideoState(video.url);
                          handleClickOpen;
                        }}
                      />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            </Grid>
          ))}
        </List>
      </Grid>
    </Container>
  );
};

export default CoursePage;
