import { handler } from "../src/services/spaces/handler";

// handler({} as any,{} as any);
// handler(
//   {
//     httpMethod: "POST",
//     body: JSON.stringify({
//       location: "Launcher-hyderabad",
//     }),
//   } as any,
//   {} as any
// );
// handler(
//   {
//     httpMethod: "GET",
//     queryStringParameters: {
//         id: 'b501aa9a-dd55-47ce-8df8-44fda2b64afa'
//     }
//   } as any,
//   {} as any
// );
handler({
    httpMethod: 'PUT',
    queryStringParameters: {
        id: 'b501aa9a-dd55-47ce-8df8-44fda2b64afa'
    },
    body: JSON.stringify({
        location: 'Dublin updated'
    })
} as any, {} as any);