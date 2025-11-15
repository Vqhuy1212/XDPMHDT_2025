import { HoltWinters } from 'node-svr';

export function forecastRentals(data) {
  const hw = new HoltWinters(data, 0.2, 0.1, 0.1); // alpha, beta, gamma
  const forecast = hw.forecast(6); // Dự báo 6 tháng tới
  return forecast;
}
