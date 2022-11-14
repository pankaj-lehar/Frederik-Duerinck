import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Bread from "../asset/img/bread.png";
import Image from "next/image";
import Head from "next/head";



const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const recepies = () => {
  return (
    <>
     <Head>
        <title>Recepies</title>
      </Head>
      <span className="span">
        <span className="text">RECEPIES</span>
        <span className="arrow"> {">"}</span>
        <span className="text">BREAD</span>
        <span className="arrow">{">"}</span>

        <span className="text">QUICK BREAD</span>
        <span className="arrow">{">"}</span>
      </span>

      <Box sx={{ width: "100%" }}>
        <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <Item className="item">
              <h1 className="heading2">Recepies Page</h1>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry standard dummy text
                ever since the 1500s, when an unknown printer took a galley of
                type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum It is a long established fact that a reader will be
                distracted by the readable content of a page when looking at its
                layout. The point of using Lorem Ipsum is that it has a
                more-or-less normal distribution of letters, as opposed to using
                'Content here, content here', making it look like readable
                English. Many desktop publishing packages and web page editors
                now use Lorem Ipsum as their default model text, and a search
               
              </p>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry standard dummy text
                ever since the 1500s, when an unknown printer took a galley of
             
               
              </p>
            </Item>
          </Grid>
          <Grid item xs={6}>
            <Item className="item">
            <img src="https://picsum.photos/seed/picsum/200/300" alt="bread" height="480px" width="400px"/>

            </Item>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
export default recepies;
