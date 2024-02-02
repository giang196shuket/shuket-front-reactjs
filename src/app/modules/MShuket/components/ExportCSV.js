import React from 'react'
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { Button } from "react-bootstrap";

export const ExportCSV = ({csvData, fileName, UIProps}) => {
    let entities = []
    UIProps?.ids.forEach(ele => {
        const object = csvData.find(obj => obj.id === ele)
        if(object){
            entities.push(object)
        }
    });
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const exportToCSV = (entities, fileName) => {
        const ws = XLSX.utils.json_to_sheet(entities);
        
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], {type: fileType});
        FileSaver.saveAs(data, fileName + fileExtension);
    }

    return (
        <Button className='mr-5' variant="success" onClick={(e) => exportToCSV(entities,fileName)}>Export CSV</Button>
    )
}
