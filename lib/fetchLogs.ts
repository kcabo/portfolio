import { client } from './client';
import { Log, LogListResponse } from './types';

export default async function fetchLogs() {
  const response = await client.get<LogListResponse>({
    endpoint: 'logs',
    queries: { orders: '-date' },
  });

  const logs = formatData(response);

  return logs;
}

function formatData(response: LogListResponse): Log[] {
  const payload = response.contents;

  const logs = payload.map((item) => ({
    showOnTop: item.showOnTop,
    category: item.category[0], // 要素が一つでも配列形式が返されるため
    date: item.date.slice(0, 10), // yyyy-MM-ddの部分を切り出す
    body: item.body,
  }));

  return logs;
}
