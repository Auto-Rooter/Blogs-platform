import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/mongo';
import articleRoutes  from './routes/article.routes';
import authRoutes from './routes/auth.routes';
import analyticsRoutes from "./routes/analytics.routes";
import { errorHandler } from "./middlewares/errorHandler";
import { verifyJWT } from "./middlewares/auth";
// import prometheusMiddleware from 'express-prometheus-middleware';
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import swaggerOptions from "./docs/swaggers";
import ratingRoutes from "./routes/rating.routes";
import viewRoutes from "./routes/view.routes";
import adminRoutes from "./routes/admin.routes";

dotenv.config();

const app = express();
const swaggerSpec = swaggerJSDoc(swaggerOptions)
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(errorHandler);
// app.use(
//     prometheusMiddleware({
//       metricsPath: "/metrics",
//       collectDefaultMetrics: true,
//       requestDurationBuckets: [0.1, 0.5, 1, 1.5],
//       requestLengthBuckets: [100, 500, 1000],
//       responseLengthBuckets: [100, 500, 1000],
//       extraMasks: [/password/i],
//       metricsAppName: "blog-platform-backend",
//     })
//   );
/*
##############################
#          Routes            #
##############################
*/
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/articles', articleRoutes);
app.use("/api/analytics", verifyJWT, analyticsRoutes);
app.use("/auth", authRoutes);
app.use("/api/ratings", ratingRoutes);
app.use("/api/views", viewRoutes);
app.use("/api/admin", adminRoutes);
app.get('/', (req, res) => {
  res.send('Welcome to Blog123!');
});


// Connect to MongoDB and start the server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`[+] Server is running on http://localhost:${PORT}`);
      console.log(`[+] Swagger Docs available at http://localhost:${PORT}/api/docs`);
    });
  })
  .catch((error: Error) => {
    console.error('Error connecting to MongoDB:', error);
  });