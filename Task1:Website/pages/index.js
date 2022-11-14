import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Bread from "../asset/img/bread.png";
import Image from "next/image";
import Clock from "../asset/img/clock.png";
import Click from "../asset/img/click.png";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const index = () => {
  return (
    <>
      <span className="span">
        <span className="text">RECEPIES </span>
        <span className="arrow"> {" > "}</span>
        <span className="text">BREAD </span>
        <span className="arrow">{" > "}</span>

        <span className="text">QUICK BREAD </span>
        <span className="arrow">{" > "}</span>
      </span>

      <Box sx={{ width: "100%" }}>
        <Grid container columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <Item className="item">
              <h1>Whole-Grain Banana Bread</h1>
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
                for 'lorem ipsum' will uncover many web sites still in their
                infancy. Various versions have evolved over the years, sometimes
                by accident, sometimes on purpose (injected humour and the
                like).
              </p>

              <ul className="unOrderList">
                <li>
                  <Image src={Clock} alt="clock" className="clockimg" />
                </li>
                <li className="listclock">
                  <p>PREP</p> 
                  <p>10 mins</p>
                </li>
                <li className="listclock">

                  <p>BAKE</p>
                  <p>1 hr to 1 hr 15 mins</p>
                </li>
                <li className="listclock">
                  <p>TOTAL</p>  
                  <p>1 hr 10 min</p>
                </li>
              </ul>

              <ul className="unOrderClick">
                <li>
                  <Image src={Click} alt="clock" className="clicking" />
                </li>
                <li className="listclick">
                  <p>Yield</p> 
                  <p> 1 loaf</p>
                  <p>12 generous servings </p> 
                </li>
                <li className="listclick1">
                  <button style={{border:"1px solid red"}}> + SAVE RECEPIE</button>
                </li>
                <li className="listclick2">
                  <button  className="buttonlast"style={{border:"1px solid red"}}>PRINT</button>
                </li>
              </ul>
            </Item>
          </Grid>

          <Grid item xs={6}>
            <Item className="item">
              <Image src={Bread} alt="bread" />
            </Item>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
export default index;
