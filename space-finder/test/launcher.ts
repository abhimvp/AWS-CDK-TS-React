import { handler } from "../src/services/spaces/handler";

// handler({} as any,{} as any);
handler(
  {
    httpMethod: "POST",
    body: JSON.stringify({
      location: "Launcher-hyderabad",
    }),
  } as any,
  {} as any
);
