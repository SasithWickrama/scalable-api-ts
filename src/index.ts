import app from './app';

const port = Number(process.env.PORT);

app.listen(port, "0.0.0.0", () => {
console.log(`Server is listening on port ${port}`);
});