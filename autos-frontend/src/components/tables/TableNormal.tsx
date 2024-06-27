import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { FC } from 'react';

  interface TableNormalValues {
    listValues: any[]
  }

const TableNormal: FC<TableNormalValues> = ({listValues}) => {

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
                  <TableCell key={ index }> {key} </TableCell>
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
              <TableCell onClick={() => {  }} sx={{ fontSize:'1.2rem' }} component='th' scope='row' key={index1} > {value} </TableCell>
              
            )) }
          </TableRow>
        )) }
      </>
    )
  }

  const TableComponent = () => {

    return (
      <Paper elevation={3} sx={{ margin: 'auto', width: '100%', height:'420px', overflow: 'scroll', backgroundColor: 'background.paper' }}>
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
