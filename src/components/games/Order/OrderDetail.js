import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Typography,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  Table,
  CircularProgress,
  Stack,
} from "@mui/material";

const OrderDetail = (props) => {
  const order = useSelector((state) => state.order[props.match.params.id]);

  const renderGame = () => {
    return order.orderList.map((game) => {
      return (
        <TableRow key={game.id}>
          <td>
            <Stack direction="row">
              <Link to={`/games/${game.id}`}>
                <img
                  src={game.imgUrl}
                  style={{ width: "180px" }}
                  alt={game.gameName}
                />
              </Link>
              <Stack
                direction="column"
                justifyContent="center"
                sx={{ marginLeft: "10px" }}
              >
                <Typography variant="h6" gutterBottom component="div">
                  {game.gameName}
                </Typography>
                <Typography variant="body2" color="#777">
                  數量：{game.amount} <br />
                  金額：NT$ {game.amount * game.gamePrice}
                </Typography>
              </Stack>
            </Stack>
          </td>
        </TableRow>
      );
    });
  };

  if (!order)
    return (
      <Stack sx={{ color: "grey.500", margin: "2rem" }} direction="row">
        <CircularProgress
          size="30px"
          color="inherit"
          sx={{ marginRight: "15px" }}
        />
        Loading...
      </Stack>
    );

  return (
    <>
      <Table>
        <TableHead sx={{ backgroundColor: "#fa5252" }}>
          <TableRow>
            <TableCell sx={{ fontSize: "1.15rem", color: "white" }}>
              訂單明細 | {order.date}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            fontWeight: "600",
            margin: "1rem 0 2rem",
          }}
        >
          <TableRow>
            <td>訂單編號： {order.id}</td>
          </TableRow>
          <TableRow>
            <td>收件人： {order.name}</td>
          </TableRow>
          <TableRow>
            <td>連絡電話： {order.phone}</td>
          </TableRow>
          <TableRow>
            <td>寄送方式： 郵寄</td>
          </TableRow>
          <TableRow>
            <td>送達地址： {order.address}</td>
          </TableRow>
          <TableRow>
            <td>付款方式： {order.pay}</td>
          </TableRow>
          <TableRow>
            <td>總金額： {order.totalPrice}</td>
          </TableRow>
        </TableBody>
      </Table>

      <Table>
        <TableHead sx={{ backgroundColor: "#fa5252" }}>
          <TableRow>
            <TableCell sx={{ fontSize: "1.15rem", color: "white" }}>
              商品詳情
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
            margin: "1rem 0 ",
          }}
        >
          {renderGame()}
        </TableBody>
      </Table>
    </>
  );
};

export default OrderDetail;
