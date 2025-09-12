// export function getCatchCallback(operationTitle: string) {
//         return (error: Error) => {
//                 console.group('Error!');
//                 console.error(
//                         `Couldn't complete operation:
//                         '${operationTitle}'
//                 `
//                 );
//                 console.log(`
//                         Callstack:
//                         '${error.stack}'
//                 `);
//                 console.log(`
//                         Compiler error name:
//                         '${error.name}'
//                 `);
//                 console.log(`
//                         Compiler error message:
//                         '${error.message}'
//                 `);
//
//                 throw error;
//         };
// }
