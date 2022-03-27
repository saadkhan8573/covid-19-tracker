import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { FormControl, MenuItem, Select, Card, CardContent } from '@material-ui/core'
import './app.css'
import InfoBox from './component/pages/infobox/InfoBox'
import MapView from './component/pages/mapview/MapView'
import TableInfo from './component/pages/graphsection/TableInfo'
import { sortData, prettyPrintStat } from './component/pages/graphsection/util'
import LineGraph from './component/pages/graphsection/LineGraph'
import "leaflet/dist/leaflet.css";

const App = () => {
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState("worldwide")
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([])
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
  const [casesType, setCasesType] = useState("cases")

  useEffect(() => {
    const getCountriesData = async () => {
      const response = await axios.get("https://disease.sh/v3/covid-19/countries")
      const updatedData = response.data.map(country => ({
        name: country.country,
        value: country.countryInfo.iso2
      }))
      setCountries(updatedData)

      const sortedData = sortData(response.data)
      setTableData(sortedData)
    }
    getCountriesData();
  }, [])

  useEffect(() => {
    const getWorldWideData = async () => {
      const response = await axios.get("https://disease.sh/v3/covid-19/all");
      setCountryInfo(response.data)
    }
    getWorldWideData()
  }, [])

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode)
    const url = countryCode === "worldwide" ? 'https://disease.sh/v3/covid-19/all'
      :
      `https://disease.sh/v3/covid-19/countries/${countryCode}`

    const response = await axios.get(url);
    setCountryInfo(response.data)
  }
  console.log("casesType",casesType)

  return (
    <>
      <div className="flex justify-evenly flex-col md:flex-row p-5">
        <div className="px-5" style={{ flex: '0.7' }}>
          <div className=" flex justify-between items-center bg">
            <h1 className="text-2xl font-bold">Covid 19 Tracker</h1>
            <FormControl className="">
              <Select
                variant="outlined"
                value={country}
                onChange={onCountryChange}
              >
                <MenuItem value="worldwide">Worldwide</MenuItem>
                {countries.map((country) => (
                  <MenuItem value={country.value}>{country.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <div className="md:flex md:justify-between my-5 gap-3">
            <InfoBox isRed active={casesType === "cases"} onClick={() => setCasesType("cases")}  title="Coronavirus cases" cases={prettyPrintStat(countryInfo.todayCases)} total={countryInfo.cases} />
            <InfoBox isGreen active={casesType === "recovered"} onClick={() => setCasesType("recovered")} title="Recovered" cases={prettyPrintStat(countryInfo.todayRecovered)} total={countryInfo.recovered} />
            <InfoBox active={casesType === "deaths"} onClick={() => setCasesType("deaths")} title="Deaths" cases={prettyPrintStat(countryInfo.todayDeaths)} total={countryInfo.deaths} />
          </div>
          <MapView center={mapCenter} zoom={mapZoom} />
        </div>

        <Card className="app__right" style={{ flex: '0.3' }}>
          <CardContent>
            <div className="app__information">
              <h3 className="text-2xl font-bold mb-3">Live Cases by Country</h3>
              <TableInfo countries={tableData} />
              <h3>Worldwide</h3>
              <LineGraph casesType={casesType} />
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default App
