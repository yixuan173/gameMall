import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  Button,
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
} from "@mui/material";

const Order = () => {
  const orderList = useSelector((state) => Object.values(state.order));

  const renderOrderList = () => {
    return orderList.map((order) => {
      return (
        <TableRow hover key={order.id}>
          <TableCell align="center">No. {order.id}</TableCell>
          <TableCell align="center">{order.date}</TableCell>
          <TableCell align="center">郵寄</TableCell>
          <TableCell align="center">{order.address}</TableCell>
          <TableCell align="center">{order.pay}</TableCell>
          <TableCell align="center">NT$ {order.totalPrice}</TableCell>
          <TableCell align="center">
            <Link to={`/order/${order.id}`} style={{ textDecoration: "none" }}>
              <Button variant="contained" color="info">
                訂單詳情
              </Button>
            </Link>
          </TableCell>
        </TableRow>
      );
    });
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="customized table">
        <TableHead sx={{ backgroundColor: "#fa5252" }}>
          <TableRow>
            <TableCell
              align="center"
              sx={{ color: "white", fontSize: "1.1rem" }}
            >
              訂單編號
            </TableCell>
            <TableCell
              align="center"
              sx={{ color: "white", fontSize: "1.1rem" }}
            >
              訂單日期
            </TableCell>
            <TableCell
              align="center"
              sx={{ color: "white", fontSize: "1.1rem" }}
            >
              寄送方式
            </TableCell>
            <TableCell
              align="center"
              sx={{ color: "white", fontSize: "1.1rem" }}
            >
              地址
            </TableCell>
            <TableCell
              align="center"
              sx={{ color: "white", fontSize: "1.1rem" }}
            >
              付款方式
            </TableCell>
            <TableCell
              align="center"
              sx={{ color: "white", fontSize: "1.1rem" }}
            >
              總額
            </TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{renderOrderList()}</TableBody>
      </Table>
    </TableContainer>
  );
};

export default Order;
