import React, { useState } from 'react'


// import charts
import BarChart from './BarChart'

export default function D3() {
    const [data, setData] = useState([{ name: "Marshall", num: 32 }, { name: 'Mike', num: 44 }, { name: 'Olly', num: 78 }, { name: 'Jax', num: 10 }])
    const [chartType, setChartType] = useState('bar')
    const [title, setTitle] = useState("")
    const [yLabel, setYLabel] = useState("")
    const renderChart = () => {
        // display the type of chart user is wanting // Pie or Bar
        switch (chartType) {
            case 'pie':
                // return <PieChart data={data} />
                return 'Pie Chart coming soon '
            default:
                return <BarChart data={data} title={title} yLabel={yLabel} />
        }
    }

    const handleKeyUp = (e) => {
        // if key is Enter
        if (e.keyCode === 13) {
            if (e.target.id === 'titleInput') {
                setTitle(e.target.value)
                e.target.value = ""
            } else {
                addData()
            }
        }

    }
    const addData = () => {
        //grab the data input and add to our data
        let input = document.getElementById('dataInput')
        let value = Number(input.value)
        if (value) {
            setData([...data, value])
        } else {
            alert("Must be a number")
        }
        input.value = ""
    }

    const handleSubmit = e => {
        e.preventDefault()
        e.target.reset()
    }
    return (
        <div>
            <div className="inputs-container">
                <form onSubmit={handleSubmit}>
                    <label for="xAxis"> X Axis </label>
                    <input id="xAxis" type="text" placeholder="x axis" required onKeyUp={handleKeyUp} />
                    <label for="yAxis">Y Axis</label>
                    <input id="yAxis" type="text" placeholder="y axis" required onKeyUp={handleKeyUp} />
                    <button type='submit'> Add Data</button>
                </form>

                <div className="chart-info">
                    <input id="yLabel" type="text" placeholder="LABEL Y AXIS" onKeyUp={handleKeyUp} />
                    <input id="titleInput" type="text" placeholder="CHART TITLE" onKeyUp={handleKeyUp} />
                </div>
            </div>
            <div className="chart-container">
                {
                    renderChart()
                }
            </div>
        </div>
    )
}
