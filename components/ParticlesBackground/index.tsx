'use client';

import Particles from 'react-tsparticles';
import { Engine, ParticlesOptions } from 'tsparticles-engine';
import { loadSlim } from 'tsparticles-slim';

export default function ParticlesBackground () {
  const particlesInit = async (engine: Engine) =>
    await loadSlim(engine);
  
  const options: ParticlesOptions = {
    fpsLimit: 120,
    interactivity: {
      events: {
        onClick: {
          enable: false,
        },
        onHover: {
          enable: true,
          mode: 'grab',
        },
        resize: true,
      },
      modes: {
        grab: {
          distance: 200,
          line_linked: {
            opacity: 1,
          },
        },
      },
    },
    particles: {
      color: {
        value: '#2dba4e',
      },
      links: {
        color: '#2b3137',
        distance: 128,
        enable: true,
        opacity: 1,
        width: 1,
      },
      move: {
        direction: 'none',
        enable: true,
        outModes: {
          default: 'bounce',
        },
        random: false,
        speed: 1,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 300,
        },
        value: 50,
      },
      opacity: {
        value: 0.1,
      },
      shape: {
        type: 'triangle',
        stroke: {
          width: 1,
          color: '#2b3137',
        },
      },
      size: {
        value: { min: 1, max: 8 },
      },
    },
    detectRetina: true,
  };

  return (
    <div style={{ zIndex: -1 }}>
      <Particles
        id='tsparticles'
        init={particlesInit}
        options={options}
      />
    </div>
  );
}