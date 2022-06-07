import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchGames } from "../../actions";

import {
  Grid,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button,
} from "@mui/material";

const GameList = () => {
  const dispatch = useDispatch();
  const games = useSelector((state) => Object.values(state.games));

  useEffect(() => {
    dispatch(fetchGames());
  }, []);

  const renderGameList = () => {
    return games.map((game) => {
      return (
        <Grid item xs={12} sm={6} md={4} key={game.id}>
          <CardMedia component="img" image={game.imgUrl} alt={game.gameName} />
          <CardContent sx={{ padding: "16px 0 16px 0" }}>
            <Typography
              gutterBottom
              component="div"
              sx={{
                borderLeft: 3,
                borderColor: "error.main",
                paddingLeft: "5px",
                marginBottom: "1rem",
                fontSize: "1rem",
                fontWeight: "700",
              }}
            >
              {game.gameName}
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
              }}
            >
              <Typography
                sx={{
                  fontSize: "0.5rem",
                  lineHeight: "1.2",
                  fontWeight: "600",
                }}
                color="text.secondary"
              >
                {game.date} <br />
                {game.maker}
                <br />
                {game.type}
              </Typography>

              <Link to={`/games/${game.id}`} style={{ textDecoration: "none" }}>
                <Button
                  variant="outlined"
                  color="error"
                  sx={{
                    fontSize: "0.1rem",
                    fontWeight: "900",
                  }}
                >
                  NT$ {game.gamePrice}
                </Button>
              </Link>
            </Box>
          </CardContent>
        </Grid>
      );
    });
  };

  return (
    <Grid container spacing={4}>
      {renderGameList()}
    </Grid>
  );
};

export default GameList;
