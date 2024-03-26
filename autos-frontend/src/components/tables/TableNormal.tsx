import React, { useState } from 'react'
import { TableContainer, Table, Paper, TableHead, TableCell, TableRow, Tooltip } from '@mui/material'
import { primaryColorLight, primaryColorMain } from '../../themes/ThemeColor'


  interface TableNormalValues {
    listValues: any[],
    insertId: number | null
  }
  let indexState;

const TableNormal: React.FC<TableNormalValues> = ({listValues, insertId}) => {

  const [indexState, setIndexState] = useState(0);
    const markLastInsert = (value, index1) => {

      if( value == insertId) {
        setIndexState(index1);
        return primaryColorLight
      } else {
        return 'white';
      }
    }

    /**
   * TableHeader
   * @param tableHeader
   * @returns 
   */
    function TableHeaders() {
      return (
        <TableHead>
        <TableRow>
          {
              Object.keys(listValues[0]).map((key, index) => (
                  <TableCell key={index}> {key} </TableCell>
              ))
          }
        </TableRow>
        </TableHead>
      )
    }

  const TableBody = () => {
    
    return (
      <>
        { listValues.map((tableRow, index) => (
          <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
            { /* Table cell */}
            { Object.values(tableRow).map((value: any, index1) => (
              <Tooltip title="Anzeigen">
              <TableCell onClick={() => {  }} sx={{ fontSize:'1.2rem', backgroundColor: markLastInsert(value, index1) }} component='th' scope='row' key={index1} > {value} </TableCell>
              </Tooltip>
            )) }
          </TableRow>
        )) }
      </>
    )
  }

  const TableComponent = () => {

    return (
      <Paper elevation={3} sx={{ margin: 'auto', width: '100%', height:'420px', overflow: 'scroll', backgroundColor: 'white' }}>
        <TableContainer sx={{width:'100%'}} component={Paper}>
          <Table aria-label='simple table'>
            
            <TableHeaders />
            <tbody>
                <TableBody />
            </tbody>
          </Table>
        </TableContainer>
      </Paper>
    )
  }

    const showTable = listValues.length > 0;
    return showTable ? <TableComponent /> : <div></div>
}

export default TableNormal;
