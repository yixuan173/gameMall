import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { addToOrder, deleteCart } from "../../../actions";
import history from "../../../history";

import {
  Stack,
  Typography,
  InputLabel,
  TextField,
  Box,
  Select,
  MenuItem,
  FormControl,
  Button,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const CartForm = () => {
  const cart = useSelector((state) => Object.values(state.cart));
  const price = cart.map((item) => item.gamePrice * item.amount);

  const dispatch = useDispatch();

  const createDate = () => {
    const now = new Date();
    const date = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(now.getDate()).padStart(2, "0")}`;

    return date;
  };

  let totalPrice;
  const renderPrice = () => {
    if (price.length === 0) return;

    const total = price.reduce((acc, current) => acc + current);
    const fare = total >= 2000 ? 0 : 90;
    totalPrice = total + fare;

    return (
      <Typography variant="subtitle2">
        遊戲：{total} + 運費：{fare}
        <p>總共：NT$ {total + fare}</p>
      </Typography>
    );
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      address: "",
      pay: "貨到付款",
    },

    validationSchema: Yup.object({
      name: Yup.string().min(2, "至少要超過 2 個字").required("收件人為必填"),
      phone: Yup.number().required("連絡電話為必填"),
      address: Yup.string().required("地址為必填"),
    }),

    onSubmit: (values) => {
      const date = createDate();
      dispatch(
        addToOrder({
          ...values,
          totalPrice,
          userId: cart[0].userId,
          date,
          orderList: cart,
        })
      );

      dispatch(deleteCart(cart[0].userId));
      alert("成功訂購！！");
      history.push("/order");
    },
  });

  const renderForm = () => {
    return (
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={3}>
          <Stack direction="row" spacing={2}>
            <Box sx={{ width: "8rem" }}>
              <TextField
                required
                size="small"
                name="name"
                id="name"
                label="收件人"
                {...formik.getFieldProps("name")}
              />
              {formik.touched.name && formik.errors.name ? (
                <Typography variant="subtitle2" style={{ color: "red" }}>
                  {formik.errors.name}
                </Typography>
              ) : null}
            </Box>
            <Box>
              <TextField
                required
                size="small"
                name="phone"
                id="phone"
                label="連絡電話"
                {...formik.getFieldProps("phone")}
              />
              {formik.touched.phone && formik.errors.phone ? (
                <Typography variant="subtitle2" style={{ color: "red" }}>
                  {formik.errors.phone}
                </Typography>
              ) : null}
            </Box>
          </Stack>

          <Box>
            <TextField
              fullWidth
              required
              size="small"
              name="address"
              id="address"
              label="地址"
              {...formik.getFieldProps("address")}
            />
            {formik.touched.address && formik.errors.address ? (
              <Typography variant="subtitle2" style={{ color: "red" }}>
                {formik.errors.address}
              </Typography>
            ) : null}
          </Box>

          <Stack direction="row" spacing={3}>
            <FormControl sx={{ marginTop: "4px" }}>
              <InputLabel id="inputState">付款方式</InputLabel>
              <Select
                name="pay"
                size="small"
                id="inputState"
                {...formik.getFieldProps("pay")}
              >
                <MenuItem value="貨到付款">貨到付款</MenuItem>
                <MenuItem value="信用卡">信用卡</MenuItem>
                <MenuItem value="LINE PAY">LINE PAY</MenuItem>
                <MenuItem value="街口支付">街口支付</MenuItem>
              </Select>
            </FormControl>
            {renderPrice()}
          </Stack>

          <Button
            onClick={formik.handleSubmit}
            variant="contained"
            endIcon={<SendIcon />}
          >
            送出訂單
          </Button>
        </Stack>
      </form>
    );
  };

  return <>{renderForm()}</>;
};

export default CartForm;
