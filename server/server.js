const express = require('express');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const path = require('path');
const cors = require('cors');
const { authMiddleware } = require('./utils/auth');
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');
const eventRoutes = require('./routes/eventRoutes');
const pastEventRoutes = require('./routes/pastEventRoutes');
const lessonRoutes = require('./routes/lessonRoutes'); // Import lesson routes

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startApolloServer = async () => {
  await server.start();

  app.use(cors());
  app.use(express.urlencoded({ extended: false, limit: '50mb' }));
  app.use(express.json({ limit: '50mb' }));

  app.use('/graphql', expressMiddleware(server, {
    context: authMiddleware
  }));

  app.use('/api/events', eventRoutes); // Ensure event routes are set correctly
  app.use('/api/past-events', pastEventRoutes); // Ensure past event routes are set correctly
  app.use('/api/lessons', lessonRoutes); // Use lesson

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

startApolloServer();
