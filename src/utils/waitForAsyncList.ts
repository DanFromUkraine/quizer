export default async function waitForAsyncList(asyncList: Promise<unknown>[]) {
        return await Promise.all(asyncList);
}
