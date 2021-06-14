import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

import "fontsource-roboto";
import "../assets/css/Dashboard.css";

import YouTubeIcon from "@material-ui/icons/YouTube";
import PublicIcon from "@material-ui/icons/Public";
import VideocamIcon from "@material-ui/icons/Videocam";

import Navbar from "../components/Navbar";
import CardsHeader from "../components/CardsHeader";
import Cards from "../components/Cards";
import Graphics from "../components/Graphics";
import TableMaterial from "../components/TableMaterial";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  iconos: {
    color: "white",
  },
  container: {
    paddingTop: "20px",
    alignItems: "center",
  },
  containerGrafica: {
    marginTop: "20px",
  },
  containerTabla: {
    marginTop: "20px",
  },
  containerLoader: {
    height: "100vh",
    textAlign: "center"
  },
  loader: {
    marginTop: "40vh"
  }
}));

const Dashboard = () => {
  const [estadistica, guardarEstadistica] = useState({});
  const [snippet, guardarSnippet] = useState({});
  const [videos, guardarVideos] = useState([]);
  const [videosEstadisticas, obtenerEstadistica] = useState([]);
  const [dataTable, guardarDataTable] = useState([]);

  const classes = useStyles();

  const consultarApi = async () => {
    const apiEstadistica = await fetch(
      "https://www.googleapis.com/youtube/v3/channels?id=UCvx0kG1KPYrD7Ez24C2rMtQ&key=AIzaSyB69QG5SZ92bCt34TulMV-Ystyasjq2u48&part=statistics,snippet"
    );
    const youtubeEstadistica = await apiEstadistica.json();
    //console.log(youtubeEstadistica)
    guardarEstadistica(youtubeEstadistica.items[0].statistics);
    guardarSnippet(youtubeEstadistica.items[0].snippet);

    //Api de los ultimos videos
    const apiVideos = await fetch(
      "https://www.googleapis.com/youtube/v3/search?key=AIzaSyB69QG5SZ92bCt34TulMV-Ystyasjq2u48&channelId=UCvx0kG1KPYrD7Ez24C2rMtQ&part=snippet&order=date&maxResults=5"
    );
    const ultimosVideos = await apiVideos.json();
    //console.log(ultimosVideos.items[0].id.videoId);
    guardarVideos((videos) => [
      ...videos,
      ultimosVideos.items[0],
      ultimosVideos.items[1],
      ultimosVideos.items[2],
      ultimosVideos.items[3],
      ultimosVideos.items[4],
    ]);
  };

  const consultarApi2 = React.useCallback(async () => {
    for (var i = 0; i < videos.length; i++) {
      const urlVideo =
        "https://www.googleapis.com/youtube/v3/videos?key=AIzaSyB69QG5SZ92bCt34TulMV-Ystyasjq2u48&id=" +
        videos[i].id.videoId +
        "&part=statistics";

      const apiVideosEstadistica = await fetch(urlVideo);
      const videoGet = await apiVideosEstadistica.json();

      obtenerEstadistica((videosEstadisticas) => [
        ...videosEstadisticas,
        videoGet.items[0].statistics,
      ]);
    }
  }, [videos]);

  useEffect(() => {
    consultarApi();
  }, []);

  useEffect(() => {
    if (videos.length === 5) {
      consultarApi2();
    }
  }, [videos, consultarApi2]);

  useEffect(() => {
    if (videosEstadisticas.length === 5) {
      for (let i = 0; i < videos.length; i++) {
        const vid = videos[i].snippet.title;
        const fech = videos[i].snippet.publishedAt.slice(0, -10);
        const lik = videosEstadisticas[i].likeCount;
        const imgg = videos[i].snippet.thumbnails.default.url;
        guardarDataTable((dataTable) => [
          ...dataTable,
          {
            id: i,
            video: vid,
            fecha: fech,
            likes: lik,
            imagen: imgg,
          },
        ]);
      }
    }
  }, [videosEstadisticas, videos]);

  return (
    <div className={classes.root}>
      {dataTable.length === 5 ? (
        <Grid container spacing={3}>
          {snippet !== undefined ? (
            <Grid item xs={12}>
              <Navbar url={snippet} />
            </Grid>
          ) : null}

          <Grid item xs={12} sm={4} lg={4} xl={4}>
            <CardsHeader
              icono={<YouTubeIcon className={classes.iconos} />}
              titulo="CANAL"
              texto={snippet.title}
              color="rgba(248,80,50,1)"
              font="white"
            />
          </Grid>
          <Grid item xs={12} sm={4} lg={4} xl={4}>
            <CardsHeader
              icono={<PublicIcon className={classes.iconos} />}
              titulo="PAIS"
              texto="Perú"
              color="rgba(248,80,50,1)"
              font="white"
            />
          </Grid>
          <Grid item xs={12} sm={4} lg={4} xl={4}>
            {JSON.stringify(estadistica) !== "{}" ? (
              <CardsHeader
                icono={<VideocamIcon className={classes.iconos} />}
                titulo="N° DE VÍDEOS"
                texto={estadistica.videoCount}
                color="rgba(248,80,50,1)"
                font="white"
              />
            ) : null}
          </Grid>

          <Grid
            container
            spacing={1}
            className={classes.container}
            xs={12}
            sm={12}
            md={6}
            lg={6}
            xl={6}
          >
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <Cards titulo="ID DE YOUTUBE" texto={snippet.customUrl} />
            </Grid>
            {JSON.stringify(snippet) !== "{}" ? (
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <Cards
                  titulo="FECHA DE CREACIÓN"
                  texto={snippet.publishedAt.slice(0, -10)}
                />
              </Grid>
            ) : null}
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <Cards
                titulo="SUSCRIPTORES"
                texto={estadistica.subscriberCount}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
              <Cards titulo="VISUALIZACIONES" texto={estadistica.viewCount} />
            </Grid>
          </Grid>

          <Grid item xs={0} sm={0} md={1} lg={1} xl={1}></Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={5}
            lg={5}
            xl={5}
            className={classes.containerGrafica}
          >
            <Graphics videos={videos} videosEstadisticas={videosEstadisticas} />
          </Grid>

          <Grid item xs={12} className={classes.containerTabla}>
            {dataTable.length === 5 ? (
              <TableMaterial dataTable={dataTable} />
            ) : null}
          </Grid>
        </Grid>
      ) : (
        <Grid item xs={12} sm={12} lg={12} xl={12} className={classes.containerLoader}>
          <CircularProgress className={classes.loader} size={100}/>
        </Grid>
      )}
    </div>
  );
};

export default Dashboard;
