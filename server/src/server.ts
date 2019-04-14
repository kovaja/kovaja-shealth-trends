import app from './app';
const PORT = process.env.PORT || 8000;

app.listen(PORT, (): void => {
  console.log('Plainly server listening on port ' + PORT);
});