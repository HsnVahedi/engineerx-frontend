// import "../styles/globals.css";

import NextNprogress from "nextjs-progressbar";
import { useEffect } from "react";
import { createStyles, makeStyles } from "@material-ui/core";
import { restoreSettings } from "../src/modules/settings";
import { defaultSettings, SettingsProvider } from "../src/context/settings";
import Head from "next/head";

const useStyles = makeStyles(() =>
  createStyles({
    "@global": {
      "*": {
        boxSizing: "border-box",
        margin: 0,
        padding: 0,
      },
      html: {
        "-webkit-font-smoothing": "antialiased",
        "-moz-osx-font-smoothing": "grayscale",
        height: "100%",
        width: "100%",
      },
      body: {
        height: "100%",
        width: "100%",
      },
      "#root": {
        height: "100%",
        width: "100%",
      },
    },
  })
);

const App = ({ Component, pageProps: { preview, ...componentProps } }) => {
  useStyles();

  useEffect(() => {
    if (preview) {
      fetch("/api/preview/clear/");
    }
  }, [preview]);
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  // useEffect(() => {
  //   const restoredSettings = restoreSettings();
  //   if (restoredSettings) {
  //     setSettings(restoredSettings);
  //   }
  // }, []);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <NextNprogress height={10} color="#209cee"></NextNprogress>
      <SettingsProvider settings={defaultSettings}>
        <Component {...componentProps} />
      </SettingsProvider>
    </>
  );
};

export default App;
