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
const WebSocket = require('websocket').server;
const http = require('http');

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const expressWs = require('express-ws')
expressWs(app)
const connections = new Set()
const wsHandler = (ws) => {
  connections.add(ws)
  ws.on('message', (message) => {
    console.log("Got 1", message)
    connections.forEach((conn) => conn.send(message))
  })
  ws.on('close', () => {
    connections.delete(ws)
  })
}
app.ws('/chatroom', wsHandler)
app.use(express.static('build'))




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
const wbServer = http.createServer((request, response) => {
  // Handle HTTP requests here
});

const webSocketServer = new WebSocket({
  httpServer: wbServer,
});

webSocketServer.on('request', (request) => {
  const connection = request.accept(null, request.origin);

  connection.on('message', (message) => {
    // Handle incoming WebSocket messages here
  });

  connection.on('close', (reasonCode, description) => {
    // Handle WebSocket connection closure here
  });
});

wbServer.listen(3002, () => {
  console.log('WebSocket server is listening on port 3001');
});

startApolloServer();
