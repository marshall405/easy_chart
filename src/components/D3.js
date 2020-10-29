import React, { useState } from 'react'


// import charts
import BarChart from './BarChart'

export default function D3() {
    const [data, setData] = useState([1000, 1450, 1275, 2200])
    const [chartType, setChartType] = useState('bar')
    const [title, setTitle] = useState("")

    const renderChart = () => {
        // display the type of chart user is wanting // Pie or Bar
        switch (chartType) {
            case 'pie':
                // return <PieChart data={data} />
                return 'Pie Chart coming soon '
            default:
                return <BarChart data={data} title={title} />
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

    return (
        <div>
            <button onClick={() => setChartType('pie')}> Pie Chart</button>
            <button onClick={() => setChartType('bar')}> Bar Chart</button>
            <input id="dataInput" type="text" placeholder="add data" onKeyUp={handleKeyUp} />
            <input id="titleInput" type="text" placeholder="title of your chart" onKeyUp={handleKeyUp} />
            <div className="chart-container">
                {
                    renderChart()
                }
            </div>
        </div>
    )
}
