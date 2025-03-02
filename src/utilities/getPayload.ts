import { getPayload } from 'payload';
import type { Payload } from 'payload';
import config from '../payload.config';

// This is a singleton to ensure we only instantiate Payload once
let cachedPayload: Payload | null = null;

export const getPayloadClient = async (): Promise<Payload> => {
  if (!process.env.PAYLOAD_SECRET) {
    throw new Error('PAYLOAD_SECRET environment variable is missing');
  }

  if (cachedPayload) {
    return cachedPayload;
  }

  // In Payload v2, we directly pass the config object
  const payload = await getPayload({
    config,
  });

  cachedPayload = payload;
  return payload;
}; 