import React, { useEffect } from 'react'

//import d3
import * as d3 from "d3";


export default function BarChart({ data, title, yLabel, }) {

    useEffect(() => {
        document.getElementById('chart').innerHTML = '' // slight hack? but clears SVG to avoid duplicates

        let margin = {
            top: 20,
            right: 0,
            bottom: 30,
            left: 40
        }
        let height = 500
        let width = window.innerWidth

        let y = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.num)])
            .range([height - margin.bottom, margin.top]);

        let x = d3.scaleBand()
            .domain(data.map(d => d.name))
            .rangeRound([margin.left, width - margin.right])
            .padding(0.05);

        let yTitle = g => g.append("text")
            .attr("font-family", "sans-serif")
            .attr("font-size", 10)
            .attr("y", 10)
            .text(yLabel || 'Y AXIS');

        let yAxis = g => g
            .attr("transform", `translate(${margin.left},0)`)
            .call(d3.axisLeft(y));

        let xAxis = g => g
            .attr("transform", `translate(0,${height - margin.bottom})`)
            .attr('font-size', '44px')
            .call(d3.axisBottom(x).tickSizeOuter(0));

        let svg = d3.select('#chart')
            .attr("viewBox", [0, 0, width, height]);

        let bar = svg.selectAll('g')
            .data(data)
            .join('g')

        bar.append('rect')
            .attr('fill', 'steelblue')
            .attr('x', d => x(d.name))
            .attr('y', d => y(d.num))
            .attr('height', d => y(0) - y(d.num))
            .attr('width', x.bandwidth());

        bar.append('text')
            .attr('fill', 'red')
            .attr('font-size', '2em')
            .attr('x', d => x(d.name) + x.bandwidth() / 2 - 15)
            .attr('y', d => y(d.num) + 30)
            .text(d => d.num);

        svg.append("g")
            .call(xAxis);

        svg.append("g")
            .call(yAxis);

        svg.call(yTitle);

    })
    return (
        <div>
            <h3 style={{ 'textAlign': 'center' }}>
                {
                    title ? title : 'Bar Chart'
                }
            </h3>
            <svg id="chart"></svg>
        </div>
    )
}
