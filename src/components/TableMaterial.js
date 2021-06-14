import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

const StyledTableCell = withStyles(() => ({
  head: {
    textAlign: "center",
    background: "black",
    color: "white"
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const TableMaterial = (props) => {
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell>Vídeo</StyledTableCell>
            <StyledTableCell>Fecha de Publicación</StyledTableCell>
            <StyledTableCell>Número de likes</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.dataTable.map((elemento) => (
            <TableRow key={elemento.id}>
              <TableCell>
                <img src={elemento.imagen} width="35px" height="25px" alt="Logo Video" />{" "}
                {elemento.video}
              </TableCell>
              <TableCell align="center">{elemento.fecha}</TableCell>
              <TableCell align="center">{elemento.likes}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TableMaterial;
