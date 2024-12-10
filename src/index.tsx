import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './client/App';
// import express, { Request, Response } from 'express';
// import mongoose

// const app = express();
// const Port = 3000;

const root = createRoot(document.getElementById('root')!);
root.render(<App />);

// app.listen(Port, () => console.log(`Server running on port ${Port}`));
