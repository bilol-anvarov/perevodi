'use client'
import React, { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const DotsAnimation = () => {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const particlesOptions = {
    particles: {
      number: {
        value: 1, // Количество точек
      },
      size: {
        value: 4, // Размер точек
      },
      move: {
        enable: true,
        speed: 2, // Скорость движения
        direction: "random", // Направление движения
        random: true,
        straight: false,
      },
      opacity: {
        value: 1,
        random: false,
      },
      shape: {
        type: "circle", // Форма точек
      },
    },
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: "repulse", // Реакция при наведении
        },
        onClick: {
          enable: false,
          mode: "push", // Добавить больше точек при клике
        },
      },
    },
    background: {
      color: "rgb(180, 217, 127 / 0%)", // Цвет фона
    },
  };

  return (
    <Particles
      params={{
        particles: {
          number: {
            value: 50, // Количество точек
            density: {
              enable: true,
              value_area: 800, // Область, в которой точки будут отображаться
            },
          },
          color: {
            value: "#ffffff", // Цвет точек
          },
          shape: {
            type: "circle", // Форма точек
          },
          size: {
            value: 3, // Размер точек
            random: true,
          },
          move: {
            enable: true,
            speed: 2, // Скорость движения точек
            direction: "none", // Направление движения
            random: false,
            straight: false,
            out_mode: "bounce", // Частицы будут отскакивать от границ
          },
        },
      }}
      style={{
        width: '100%', // Ширина контейнера
        height: '100px', // Высота на весь экран
        position: 'absolute', // Чтобы частицы не перекрывали другой контент
      }}
    />
  );
};

export default DotsAnimation;
