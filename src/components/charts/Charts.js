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
      <CartesianGrid strokeDasharray="5 5" stroke="white" />
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="serious" stackId="a" fill="rgb(255, 99, 132)" />
      <Bar dataKey="critical" stackId="a" fill="rgb(255, 159, 64)" />
      <Bar dataKey="moderate" stackId="a" fill="rgb(75, 192, 192)" />
      <Bar dataKey="minor" stackId="a" fill="rgb(54, 162, 235)">
        <LabelList dataKey="build_no" position="top" angle="0"  />
      </Bar>
    </BarChart>
  )
}

export default Charts