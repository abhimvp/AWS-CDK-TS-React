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
        id: '75b594e5-bfd0-4ead-bb5a-83af507c8f26'
    },
    body: JSON.stringify({
        location: 'Best location 2'
    })
} as any, {} as any).then(result =>{
    console.log(result)
});
// handler({
//     httpMethod: 'DELETE',
//     queryStringParameters: {
//         id: 'b501aa9a-dd55-47ce-8df8-44fda2b64afa'
//     },
//     // body: JSON.stringify({
//     //     location: 'Dublin updated'
//     // })
// } as any, {} as any);
// handler({ // should be rejected asap - Gives us {statusCode: 400, body: 'Value for name expected!'}
//     httpMethod: 'POST',
//     body: JSON.stringify({
//         location: 'Dublin updated'
//     })
// } as any, {} as any).then(result =>{
//     console.log(result)
// });