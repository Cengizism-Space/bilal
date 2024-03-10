import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="description"
            content="Hellevoetsluis HDV Eyüp Sultan Camii TV mededelingen en activiteiten"
          />
          <meta
            property="og:site_name"
            content="Hellevoetsluis HDV Eyüp Sultan Camii TV mededelingen en activiteiten"
          />
          <meta
            property="og:description"
            content="Hellevoetsluis HDV Eyüp Sultan Camii TV mededelingen en activiteiten"
          />
          <meta
            property="og:title"
            content="Hellevoetsluis HDV Eyüp Sultan Camii TV mededelingen en activiteiten"
          />
          <meta name="twitter:card" content="summary_large_image" />
          <meta
            name="twitter:title"
            content="Hellevoetsluis HDV Eyüp Sultan Camii TV mededelingen en activiteiten"
          />
          <meta
            name="twitter:description"
            content="Hellevoetsluis HDV Eyüp Sultan Camii TV mededelingen en activiteiten"
          />
        </Head>
        <body className="bg-black antialiased">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
