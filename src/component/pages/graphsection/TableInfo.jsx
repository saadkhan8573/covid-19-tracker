import React from 'react'
import numeral from 'numeral'
import './tableinfo.css'

const TableData = ({ countries }) => {

    return (
        <>
            <div className="h-96 overflow-auto w-full">
                    {countries.map((country) => {
                        return (<>
                            <tr className="flex justify-between border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-6 text-left whitespace-nowrap">
                                    <div className="flex items-center">
                                        <span className="font-medium">{country.country}</span>
                                    </div>
                                </td>
                                <td className="py-3 px-6 text-left">
                                    <div className="flex items-center">
                                        <span className="font-bold">{numeral(country.cases).format("0,0")}</span>
                                    </div>
                                </td>
                            </tr>
                        </>)
                    })}
                </div>
        </>
    )
}

export default TableData
