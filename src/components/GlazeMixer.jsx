import { RotateCcw, Sparkles } from 'lucide-react';
import { useMemo, useState } from 'react';

const initial = { copper: 34, iron: 28, cobalt: 18, ash: 24 };

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

export default function GlazeMixer() {
  const [minerals, setMinerals] = useState(initial);
  const [atmosphere, setAtmosphere] = useState('reduction');

  const tileStyle = useMemo(() => {
    const { copper, iron, cobalt, ash } = minerals;
    const cobaltAlpha = clamp(0.12 + cobalt / 125, 0.12, 0.72);
    const ironAlpha = clamp(0.08 + iron / 150, 0.08, 0.64);
    const ashAlpha = clamp(0.08 + ash / 190, 0.08, 0.48);
    const copperAlpha = clamp(0.1 + copper / 125, 0.1, 0.78);

    const copperColor = atmosphere === 'reduction'
      ? `rgba(177, 68, 53, ${copperAlpha})`
      : `rgba(39, 145, 119, ${copperAlpha})`;
    const ironColor = atmosphere === 'reduction'
      ? `rgba(63, 42, 35, ${ironAlpha})`
      : `rgba(167, 92, 45, ${ironAlpha})`;
    const cobaltColor = `rgba(28, 71, 160, ${cobaltAlpha})`;
    const ashColor = `rgba(226, 218, 191, ${ashAlpha})`;
    const metallic = atmosphere === 'reduction' ? 0.62 : 0.28;

    return {
      background: `
        radial-gradient(circle at 22% 18%, ${ashColor} 0 14%, transparent 40%),
        radial-gradient(circle at 76% 24%, ${copperColor} 0 10%, transparent 43%),
        radial-gradient(circle at 34% 67%, ${cobaltColor} 0 12%, transparent 46%),
        radial-gradient(circle at 75% 72%, ${ironColor} 0 15%, transparent 48%),
        linear-gradient(145deg, rgba(238,235,224,.82), rgba(64,70,68,.88) 34%, rgba(22,26,28,.96) 76%)
      `,
      '--metallic': metallic,
      '--ash-speckle': clamp(ash / 100, 0.08, 0.88),
      '--copper-flash': clamp(copper / 100, 0.08, 0.9),
    };
  }, [minerals, atmosphere]);

  const update = (name, value) => setMinerals((current) => ({ ...current, [name]: Number(value) }));

  return (
    <section className="glaze-mixer-section" id="glaze-lab">
      <div className="glaze-intro">
        <p className="eyebrow"><Sparkles size={14} /> RAKU + GLAZE LAB</p>
        <h2>Fire changes the plan.</h2>
        <p>
          Mandy mixes glazes from scratch and works across multiple firing methods. This little lab is a chemistry-inspired visual toy — not a recipe predictor — built around the way copper, iron, cobalt, ash and atmosphere can push a fired surface in different directions.
        </p>
      </div>

      <div className="glaze-workbench">
        <div className="tile-stage">
          <span className="tile-stage-label">DIGITAL TEST TILE</span>
          <div className="test-tile-wrap">
            <div className="test-tile" style={tileStyle} aria-label="Interactive glaze test tile preview">
              <span className="tile-groove groove-one" />
              <span className="tile-groove groove-two" />
              <span className="tile-groove groove-three" />
              <span className="tile-sheen" />
              <span className="tile-speckle" />
            </div>
            <span className="test-tile-shadow" />
          </div>
          <p>Hover the tile for a little Raku smoke.</p>
        </div>

        <div className="mineral-controls">
          <div className="mineral-head">
            <div><span>GLAZE PLAYGROUND</span><strong>MOVE THE MINERALS</strong></div>
            <button onClick={() => { setMinerals(initial); setAtmosphere('reduction'); }}><RotateCcw size={14} /> RESET</button>
          </div>

          <div className="atmosphere-toggle" role="group" aria-label="Firing atmosphere">
            <span>ATMOSPHERE</span>
            <button className={atmosphere === 'oxidation' ? 'is-active' : ''} onClick={() => setAtmosphere('oxidation')}>OXIDATION</button>
            <button className={atmosphere === 'reduction' ? 'is-active' : ''} onClick={() => setAtmosphere('reduction')}>REDUCTION</button>
          </div>

          {Object.entries(minerals).map(([name, value]) => (
            <label key={name}>
              <span><strong>{name}</strong><em>{value}%</em></span>
              <input type="range" min="0" max="100" value={value} onChange={(event) => update(name, event.target.value)} />
            </label>
          ))}
          <small>CHEMISTRY-INSPIRED VISUALIZATION — NOT A REAL GLAZE FORMULA OR FIRING PREDICTION.</small>
        </div>
      </div>
    </section>
  );
}
