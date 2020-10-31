import React, { useEffect } from 'react'

//import d3
import * as d3 from "d3";


export default function BarChart({ data, title, yLabel, barColor, barTextColor, chartColor, chartTextColor, xRotate, chartHeight, focus }) {

    useEffect(() => {
        document.getElementById('chart').innerHTML = '' // slight hack? but clears SVG to avoid duplicates

        let margin = {
            top: 30,
            right: 0,
            bottom: 50,
            left: 40
        }
        let height = chartHeight || 400
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
            .attr("font-size", 12)
            .attr('class', 'yTitle')
            .attr("y", 25)
            .attr("x", 3);

        let yAxis = g => g
            .attr("transform", `translate(${margin.left},0)`)
            .call(d3.axisLeft(y));

        let xAxis = g => g
            .style("font", "16px times")
            .attr("transform", `translate(0,${height - margin.bottom})`)
            .call(d3.axisBottom(x).tickSizeOuter(0));

        let svg = d3.select('#chart')
            .attr("viewBox", [0, 0, width, height]);

        let bar = svg.selectAll('g')
            .data(data)
            .join('g')

        bar.append('rect')
            .attr('x', d => x(d.name))
            .attr('y', d => y(d.num))
            .attr('height', d => y(0) - y(d.num))
            .attr('width', x.bandwidth());

        bar.append('text')
            .attr('class', 'barText')
            .attr('x', d => x(d.name) + x.bandwidth() / 2 - 10)
            .attr('y', d => y(d.num) + 12)
            .text(d => d.num);

        svg.append("g")
            .call(xAxis)
            .selectAll('text')
            .attr('class', 'xAxis')


        svg.append("g")
            .call(yAxis);

        svg.call(yTitle);

    }, [data, chartHeight])

    useEffect(() => {
        // update styles without complete rerender of chart 
        d3.selectAll('.xAxis')
            .attr('transform', `rotate(${xRotate >= 0 ? xRotate : 30})`);
        d3.selectAll('rect')
            .attr('fill', barColor || 'steelblue');
        d3.selectAll('.yTitle')
            .attr('fill', chartTextColor || 'black')
            .text(yLabel || 'Y AXIS');
        d3.selectAll('.barText')
            .attr('fill', barTextColor || 'white')

    })
    return (
        <div style={{ 'background': chartColor || 'white', 'color': chartTextColor || 'rgb(95, 95, 95)' }}>
            <h3 style={{ 'textAlign': 'center' }}>
                {
                    title ? title : 'Bar Chart'
                }
            </h3>
            <svg id="chart"></svg>
        </div>
    )
}
