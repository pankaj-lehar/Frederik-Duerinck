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

const blog = () => {
  return (
    <>
    <Head>
        <title>Blog</title>
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
              <h1 className="heading4">Blog Page</h1>
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
                for 'lorem ipsum' will uncover many web sites still in their
                infancy. Various versions have evolved over the years, sometimes
                by accident, sometimes on purpose (injected humour and the
                like).
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
              <img
                src="https://picsum.photos/200/300/?blur"
                height="480px"
                width="400px"
                alt="bread"
              />
            </Item>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
export default blog;
