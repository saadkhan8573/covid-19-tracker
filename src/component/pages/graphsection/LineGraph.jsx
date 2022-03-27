import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2';
import numeral from 'numeral';

const options = {
    legend: {
        display: false,
    },
    elements: {
        point: {
            radius: 0,
        },
    },
    maintainAspectRatio: false,
    tooltips: {
        mode: "index",
        intersect: false,
        callbacks: {
            label: function (tooltipItem, data) {
                console.log("tooltipItem.value", tooltipItem.value)
                return numeral(tooltipItem.value).format("+0,0");
            },
        },
    },
    scales: {
        xAxes: [
            {
                type: "time",
                time: {
                    format: "MM/DD/YY",
                    tooltipFormat: "ll",
                },
            },
        ],
        yAxes: [
            {
                gridLines: {
                    display: false,
                },
                ticks: {
                    // Include a dollar sign in the ticks
                    callback: function (value, index, values) {
                        return numeral(value).format("0a");
                    },
                },
            },
        ],
    },
};

const buildChartData = (data, casesType) => {
    let chartData = [];
    let lastDataPoint;
    for (let date in data.cases) {
        if (lastDataPoint) {
            let newDataPoint = {
                x: date,
                y: data[casesType][date] - lastDataPoint,
            };
            chartData.push(newDataPoint);
        }
        if (casesType) {
            lastDataPoint = data[casesType][date];
        }
    }
    return chartData;
};

const LineGraph = ({ casesType }) => {
    const [data, setData] = useState({})

    useEffect(() => {
        const getLast120DaysData = async () => {
            const response = await axios.get("https://disease.sh/v3/covid-19/historical/all?lastdays=120");
            const chartData = buildChartData(response.data, casesType)
            console.log("response.data", response.data)
            setData(chartData)
        }
        getLast120DaysData()
    }, [casesType])
    console.log("datadatadata", data)

    return (
        <>
            <h1 className="text-2xl font-bold"> Graph </h1>
            <div className="h-96 overflow-auto">
                {data.length &&
                    <Line
                        data={{
                            datasets: [
                                {
                                    backgroundColor: "rgba(204, 16, 52, 0.5)",
                                    borderColor: "#CC1034",
                                    data: data,
                                },
                            ],
                        }}
                        options={options}
                    />
                }
            </div>

        </>
    )
}

export default LineGraph
