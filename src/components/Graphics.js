import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import "../assets/css/Graphics.css";

const Graphics = (props) => {
  //AQUI EMPIEZA
  const [data, guardarData] = useState({});

  useEffect(() => {
    if (props.videosEstadisticas.length === 5) {
      //actualizarData();
      const dataG = {
        labels: ["5", "4", "3", "2", "1 - último"],
        datasets: [
          {
            label: "Numero de vistas en los ultimos 5 videos",
            fill: false,
            backgroundColor: "rgba(73,155,234,1)",
            borderColor: "rgba(73,155,234,1)",
            pointBorderColor: "rgba(73,155,234,1)",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(73,155,234,1)",
            pointHoverBorederColor: "rgba(73,155,234,1)",
            pointRadius: 1,
            pointHitRadius: 10,
            data: [
              props.videosEstadisticas[4].viewCount,
              props.videosEstadisticas[3].viewCount,
              props.videosEstadisticas[2].viewCount,
              props.videosEstadisticas[1].viewCount,
              props.videosEstadisticas[0].viewCount,
            ],
          },
        ],
      };
      guardarData(dataG);
    }
  }, [props.videosEstadisticas]);

  return (
    <div className="containerGrafica">
      {JSON.stringify(data) !== "{}" ? <Line data={data} /> : null}
    </div>
  );
};

export default Graphics;
