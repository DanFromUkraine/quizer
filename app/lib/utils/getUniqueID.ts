export default function getUniqueID() {
        const currTime = Date.now();

        return `${currTime}-${crypto.randomUUID()}`;
}
