import React from 'react'
import { BarChart, Bar, XAxis, Cell, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { COLORS } from '../utils/constants';

const ArticlesBarChart = ({top}: any) => {
  return (
        <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">Top Articles</h2>
        <ResponsiveContainer width="100%" height={250}>
        <BarChart data={top || []}>
            <XAxis dataKey="title" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="views">
            {(top || []).map((_: any, idx: number) => (
                <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
            ))}
            </Bar>        </BarChart>
        </ResponsiveContainer>
    </div>
  )
}

export default ArticlesBarChart