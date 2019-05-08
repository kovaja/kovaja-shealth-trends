import app from './app';
import { Logger } from './utilities/logger';

const PORT = process.env.PORT || 8000;

app.listen(PORT, (): void => {
  Logger.log('Server listening on port', PORT);
});