import React, { useState } from 'react'


// import charts
import BarChart from './BarChart'

export default function D3() {
    const [data, setData] = useState([{ name: "Marshall", num: 32 }, { name: 'Mike', num: 44 }, { name: 'Olly', num: 78 }, { name: 'Jax', num: 10 }])
    const [chartType, setChartType] = useState('bar')
    const [title, setTitle] = useState("")
    const [yLabel, setYLabel] = useState("")
    const [barColor, setBarColor] = useState("")
    const [barTextColor, setBarTextColor] = useState("")
    const [chartColor, setChartColor] = useState("")
    const [chartTextColor, setChartTextColor] = useState("")
    const [xRotate, setXRotate] = useState(0)
    const [chartHeight, setChartHeight] = useState(600)

    const renderChart = () => {
        // display the type of chart user is wanting // Pie or Bar
        switch (chartType) {
            case 'pie':
                // return <PieChart data={data} />
                return 'Pie Chart coming soon '
            default:
                return <BarChart data={data} title={title} yLabel={yLabel} barColor={barColor} barTextColor={barTextColor} chartColor={chartColor} chartTextColor={chartTextColor} xRotate={xRotate} chartHeight={chartHeight} />
        }
    }

    const handleKeyUp = (e) => {
        // if key is Enter
        if (e.keyCode === 13) {
            switch (e.target.id) {
                case 'titleInput':
                    setTitle(e.target.value)
                    break;
                case 'yLabel':
                    setYLabel(e.target.value)
                    break;
                case 'barColor':
                    setBarColor(e.target.value)
                    break;
                case 'barTextColor':
                    setBarTextColor(e.target.value)
                    break;
                case 'chartColor':
                    setChartColor(e.target.value)
                    break;
                case 'chartTextColor':
                    setChartTextColor(e.target.value)
                    break;
                default:
                    break;
            }
            e.target.value = ""
        }

    }

    const clearChart = () => {
        if (window.confirm('Are you sure?')) {
            // clear data from chart
            setData([])
        }
    }
    const handleSubmit = e => {
        e.preventDefault()
        let yValue = Number(e.target.yAxis.value)
        let xValue = e.target.xAxis.value

        // checks yValue to make sure its a number
        if (yValue) {
            setData([...data, { name: xValue, num: yValue }])
            e.target.reset()
            e.target.xAxis.focus()
        } else {
            alert('Y value must be a number')
            e.target.yAxis.focus()
        }
    }

    const handleOnChange = e => {
        switch (e.target.id) {
            case 'xRotate':
                setXRotate(Number(e.target.value))
                break;
            case 'chartHeight':
                setChartHeight(Number(e.target.value))
                break;
            default:
                break;
        }
    }
    return (
        <div>
            <div className="inputs-container">
                <div className="add-data top">
                    <h4> New Data Details </h4>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="xAxis"> X AXIS </label>
                        <input id="xAxis" type="text" placeholder="NAME" required onKeyUp={handleKeyUp} />
                        <label htmlFor="yAxis">Y AXIS (number)</label>
                        <input id="yAxis" type="text" placeholder="VALUE" required onKeyUp={handleKeyUp} />
                        <button className="submit button" type='submit'> Add Data</button>
                    </form>
                </div>
                <div className="chart-info top">
                    <h4> Chart Details </h4>
                    <input id="yLabel" type="text" placeholder="LABEL Y AXIS" onKeyUp={handleKeyUp} />
                    <input id="titleInput" type="text" placeholder="CHART TITLE" onKeyUp={handleKeyUp} />
                    <input id="barColor" type="text" placeholder="BAR COLOR" onKeyUp={handleKeyUp} />
                    <input id="barTextColor" type="text" placeholder="BAR TEXT COLOR" onKeyUp={handleKeyUp} />
                    <input id="chartColor" type="text" placeholder="CHART COLOR" onKeyUp={handleKeyUp} />
                    <input id="chartTextColor" type="text" placeholder="CHART TEXT COLOR" onKeyUp={handleKeyUp} />
                    <input id="xRotate" value={xRotate} type="range" min="0" max="180" onChange={handleOnChange}></input>
                    <label htmlFor="xRotate">Rotate X Axis values</label>

                    <input id="chartHeight" value={chartHeight} type="range" min="300" max="1200" onChange={handleOnChange}></input>
                    <label htmlFor="chartHeight"> Adjust Chart Height</label>

                </div>
            </div>
            <div className="chart-container">
                {
                    renderChart()
                }
            </div>

            <div className="clear-button-container">
                <button className="clear button" onClick={clearChart}>Clear Chart</button>
            </div>
        </div>
    )
}
