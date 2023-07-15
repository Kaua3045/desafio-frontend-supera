import { DatePicker } from "@mui/x-date-pickers";
import { useEffect, useState } from "react";
import WireTransfer from "../models/WireTransfer";
import { wireTransferApi } from "../api/Api";
import { helpers } from "../helpers/Helpers";
import { 
  Box, 
  Button, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  TextField, 
  Typography 
} from "@mui/material";
import {
  FlexContainer,
  ExtendTable,
  MoneyInfo,
  Buttons
} from "./FormStyles";

export const Form = () => {
  const [beginDate, setBeginDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [operatorName, setOperatorName] = useState<string>("");
  const [wireTransfers, setWireTransfers] = useState<WireTransfer[]>([]);

  const handleBeginDateChange = (date: Date | null) => {
    setBeginDate(date);
  };

  const handleEndDateChange = (date: Date | null) => {
    setEndDate(date);
  };

  const handleOperatorNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setOperatorName(event.target.value);
  };

  const fetchData = async () => {
    try {
      const data = await wireTransferApi.fetchWireTransfers(null);
      setWireTransfers(data);
    } catch (err) {
      console.log(err);
    }
  };
  
  useEffect(() => {
    void fetchData();
  }, []);

  const handleClickSearch = () => {
    void wireTransferApi.fetchWireTransfers({
      startDate: beginDate ? helpers.formatDateToString(beginDate) : null,
      endDate: endDate ? helpers.formatDateToString(endDate) : null,
      transactionOperatorName: operatorName ? operatorName : null
    }).then((data) => {
      setWireTransfers(data);
    }).catch(err => console.log(err));
  };

  const handleClickClearFilters = () => {
    setBeginDate(null);
    setEndDate(null);
    setOperatorName("");
  }

  return (
    <>
      <form>
        <FlexContainer>
          <DatePicker
            value={beginDate}
            onChange={handleBeginDateChange}
            label="Data de início"
          />
          <DatePicker
            label="Data de fim"
            value={endDate}
            onChange={handleEndDateChange}
          />
          <TextField
            value={operatorName}
            onChange={handleOperatorNameChange}
            label="Nome do operador transacionado"
          />
        </FlexContainer>
        <Buttons>
          <Button onClick={handleClickSearch} variant="contained">
            Pesquisar
          </Button>

          <Button onClick={handleClickClearFilters} variant="outlined">
            Limpar filtros
          </Button>
        </Buttons>
      </form>
      <FlexContainer>
        <Box width="100%">
          <ExtendTable>
            <MoneyInfo>
              <Typography fontSize={20} m={1}>
                Valor Total:
              </Typography>
              <Typography color={"green"} fontSize={20} m={1}>
                  R$ {wireTransfers.length > 0 
                  ? wireTransfers.map((item: WireTransfer) => item.value).reduce((a : number,b : number) => a + b).toFixed(2) 
                  : 0}
                </Typography>
            </MoneyInfo>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Dados</TableCell>
                    <TableCell>Valor</TableCell>
                    <TableCell>Tipo</TableCell>
                    <TableCell>Nome operador transacionado</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {wireTransfers.map((wireTransfer) => (
                    <TableRow key={wireTransfer.wireTransferId}>
                      <TableCell>
                        {helpers.formatDateStringToString(
                          wireTransfer.wireTransferDate
                        )}
                      </TableCell>
                      <TableCell>{wireTransfer.value}</TableCell>
                      <TableCell>{wireTransfer.type}</TableCell>
                      <TableCell>
                        {wireTransfer.transactionOperatorName}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </ExtendTable>
        </Box>
      </FlexContainer>
    </>
  );
};
