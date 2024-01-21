// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_404 from "./routes/_404.tsx";
import * as $_app from "./routes/_app.tsx";
import * as $index from "./routes/index.tsx";
import * as $letter_index from "./routes/letter/index.tsx";
import * as $number_index from "./routes/number/index.tsx";
import * as $List from "./islands/List.tsx";
import { type Manifest } from "$fresh/server.ts";

const manifest = {
  routes: {
    "./routes/_404.tsx": $_404,
    "./routes/_app.tsx": $_app,
    "./routes/index.tsx": $index,
    "./routes/letter/index.tsx": $letter_index,
    "./routes/number/index.tsx": $number_index,
  },
  islands: {
    "./islands/List.tsx": $List,
  },
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;
