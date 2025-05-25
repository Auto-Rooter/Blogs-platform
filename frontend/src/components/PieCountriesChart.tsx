import React from 'react'
import {
    ResponsiveContainer,
    Cell,
    Tooltip,
    PieChart,
    Pie,
    Legend,
  } from 'recharts';
  import { COLORS } from '../utils/constants';
  
const PieCountriesChart = ({countryViews}: any) => {
  return (
    <div className="bg-white p-4 rounded shadow">
    <h2 className="text-lg font-semibold mb-2">Views by country</h2>
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie
          data={countryViews || []}
          dataKey="count"
          nameKey="country"
          cx="50%"
          cy="50%"
          outerRadius={80}
          label
        >
          {(countryViews || []).map((_: any, idx: number) => (
            <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  </div>
  )
}

export default PieCountriesChart