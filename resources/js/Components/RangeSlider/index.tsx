import React from 'react';
import { Slider, Rail, Handles, Tracks, Ticks } from 'react-compound-slider';
import { SliderRail, Handle, Track, Tick } from './components'; // example render components - source below

const sliderStyle = {
  position: 'relative',
  width: '100%',
};

type RangeSliderProps = {
  onChange: (values: readonly [number, number]) => void;
  onUpdate: (values: readonly [number, number]) => void;
  domain: readonly [number, number];
  values: readonly [number, number];
};

export const RangeSlider = ({ onChange, onUpdate, domain, values }: RangeSliderProps) => (
  <div style={{ margin: '10px auto 2px auto', height: 52, width: '82%' }}>
    <Slider
      mode={2}
      step={1 /* don't let library handle step! */}
      domain={domain}
      rootStyle={sliderStyle}
      onChange={() => onChange(values)}
      onUpdate={onUpdate as (values: readonly number[]) => void}
      values={[...values]}
    >
      <Rail>{({ getRailProps }) => <SliderRail getRailProps={getRailProps} />}</Rail>
      <Handles>
        {({ handles, getHandleProps }) => (
          <div className="slider-handles">
            {handles.map((handle) => (
              <Handle
                key={handle.id}
                handle={handle}
                domain={[...domain]}
                getHandleProps={getHandleProps}
              />
            ))}
          </div>
        )}
      </Handles>
      <Tracks left={false} right={false}>
        {({ tracks, getTrackProps }) => (
          <div className="slider-tracks">
            {tracks.map(({ id, source, target }) => (
              <Track key={id} source={source} target={target} getTrackProps={getTrackProps} />
            ))}
          </div>
        )}
      </Tracks>
      <Ticks count={5}>
        {({ ticks }) => (
          <div className="slider-ticks">
            {ticks.map((tick) => (
              <Tick format={(t) => `£${t}`} key={tick.id} tick={tick} count={ticks.length} />
            ))}
          </div>
        )}
      </Ticks>
    </Slider>
  </div>
);
