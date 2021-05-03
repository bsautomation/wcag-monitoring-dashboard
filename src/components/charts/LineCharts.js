import React from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LabelList } from 'recharts';

const LineCharts = ({data}) => {

  return(
    <LineChart className="line"
      width={800}
      height={500}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="build_no" reversed={true}/>
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="total" stroke="#8884d8">
        <LabelList dataKey="date" position="left" angle="-45"  />
      </Line>
      <Line type="monotone" dataKey="serious" stroke="rgb(255, 99, 132)" />
      <Line type="monotone" dataKey="critical" stroke="rgb(255, 159, 64)" />
      <Line type="monotone" dataKey="moderate" stroke="rgb(75, 192, 192)" />
      <Line type="monotone" dataKey="minor" stroke="rgb(54, 162, 235)" />
    </LineChart>
  )
}

export default LineCharts