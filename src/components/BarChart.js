import React, { useEffect } from 'react'

//import d3
import * as d3 from "d3";


export default function BarChart({ data, title }) {

    useEffect(() => {
        let width = getComputedStyle(document.getElementById('chart')).width.split("px")[0]

        const x = d3.scaleLinear()
            .domain([0, d3.max(data)])
            .range([0, width])

        d3.select("#chart")
            .style('text-align', 'center')
            .style('color', '#fff')
            .selectAll('div')
            .data(data)
            .join('div')
            .style('background-color', 'rgb(60,80,200)')
            .style('width', d => `${x(d)}px`)
            .style('padding', '5px')
            .style('margin', '1px')
            .style('border-radius', '2px')
            .text(d => d)
    })
    return (
        <div>
            <h3 style={{ 'textAlign': 'center' }}>
                {
                    title ? title : 'Bar Chart'
                }
            </h3>
            <div id="chart"></div>
        </div>
    )
}
