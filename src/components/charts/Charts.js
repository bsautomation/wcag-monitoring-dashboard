import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LabelList } from 'recharts';

const Charts = ({data, clickHandler}) => {

  return(
    <BarChart
      width={1000}
      height={500}
      data={data}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5
      }}
      onClick={clickHandler}
    >
      <CartesianGrid strokeDasharray="1 1" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="serious" stackId="a" fill="#EF5350" />
      <Bar dataKey="critical" stackId="a" fill="#FF9800" />
      <Bar dataKey="moderate" stackId="a" fill="#FFCA28" />
      <Bar dataKey="minor" stackId="a" fill="#CDDC39">
        <LabelList dataKey="build_no" position="top" angle="0"  />
      </Bar>
    </BarChart>
  )
}

export default Charts