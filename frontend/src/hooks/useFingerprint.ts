import FingerprintJS from '@fingerprintjs/fingerprintjs';

// a fingerprint is fetched only once per session
let cachedFingerprint: string | null = null;

export const getFingerprint = async (): Promise<string> => {
    if (cachedFingerprint) return cachedFingerprint;
    const fp = await FingerprintJS.load();
    const result = await fp.get();
    cachedFingerprint = result.visitorId;
    return cachedFingerprint;
}