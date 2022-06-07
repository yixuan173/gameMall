import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchGame } from "../../actions";
import GameDetailVideo from "./GameDetailVideo";
import GameDetailBuy from "./GameDetailBuy";

import { Grid, CircularProgress, Stack } from "@mui/material";

const GameDetail = (props) => {
  const dispatch = useDispatch();
  const game = useSelector((state) => state.games[props.match.params.id]);

  useEffect(() => {
    dispatch(fetchGame(props.match.params.id));
  }, []);

  const renderGame = () => {
    if (!game) {
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
    }

    return (
      <>
        <Grid item xs={12} md={8}>
          <GameDetailVideo videoUrl={game.gameVideoUrl} />
        </Grid>
        <Grid item xs={12} md={4}>
          <GameDetailBuy game={game} />
        </Grid>
      </>
    );
  };

  return (
    <Grid container spacing={4} alignItems="center">
      {renderGame()}
    </Grid>
  );
};

export default GameDetail;
