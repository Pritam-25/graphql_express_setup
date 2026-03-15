import app from './app.js';
import { env } from '@lib/env.js';

const PORT = env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`🚀 GraphQL ready at http://localhost:${PORT}/graphql`);
});
