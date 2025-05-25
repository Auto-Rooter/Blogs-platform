import React from 'react'
import {
    ComposableMap,
    Geographies,
    Geography,
  } from 'react-simple-maps';
  import { scaleLinear } from 'd3-scale';
import { CountryData } from "../types/countryData"; 
  
  interface MapChartProps {
    data: CountryData[];
  }

  const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json';
const MapChart = ({ data }: MapChartProps) => {
    console.log("data: " + JSON.stringify(data));
    const max = Math.max(...data.map(d => d.count), 1);
    const colorScale = scaleLinear<string>()
      .domain([0, max])
      .range(['#cf113a', '#b4e110']);
  
    const lookup = data.reduce<Record<string, number>>(
      (acc, d) => ({ ...acc, [d.country]: d.count }),
      {}
    );
    return (
        <ComposableMap projectionConfig={{ scale: 147 }}>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map(geo => {
                const iso = geo.properties.ISO_A2 as string;
                const value = lookup[iso] ?? 0;
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={colorScale(value)}
                    stroke="#FFF"
                    style={{
                      default: { outline: 'none' },
                      hover:   { outline: 'none', opacity: 0.8 },
                      pressed: { outline: 'none' },
                    }}
                  />
                );
              })
            }
          </Geographies>
        </ComposableMap>
      );
}

export default MapChart