export function getFieldPayloadValue(payload: unknown): unknown {
  if (payload === null || payload === undefined) {
    return undefined;
  }

  if (Array.isArray(payload)) {
    return payload[0];
  }

  if (typeof payload === 'object') {
    const record = payload as Record<string, unknown>;

    if (record[''] !== undefined) {
      return record[''];
    }

    if (record['value'] !== undefined) {
      return record['value'];
    }
  }

  return payload;
}

export function setFieldPayloadValue(payload: unknown, value: unknown): unknown {
  if (Array.isArray(payload)) {
    payload[0] = value;
    return payload;
  }

  if (payload !== null && typeof payload === 'object') {
    const record = payload as Record<string, unknown>;

    if ('value' in record) {
      record['value'] = value;
    }

    if ('' in record || !('value' in record)) {
      record[''] = value;
    }

    return payload;
  }

  return value;
}