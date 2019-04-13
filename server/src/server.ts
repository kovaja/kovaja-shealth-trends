import app from './app';
const PORT = 8000;

app.listen(PORT, (): void => {
  console.log('Plainly server listening on port ' + PORT);
});