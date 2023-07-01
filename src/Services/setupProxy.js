import { createProxyMiddleware } from "http-proxy-middleware";

export default (app) => {
  app.use(
    createProxyMiddleware("/api/products/add-product", {
      target: "http://api.thebaklavaboxx.co.uk",
      changeOrigin: true,
    })
  );
};
