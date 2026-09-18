export interface Indicator {
  id: string;
  name: string;
  value: number;
  format: "COP" | "USD" | "percent" | "number";
  direction: "up" | "down";
  change?: number;
  changePercent?: number;
}

export const indicators: Indicator[] = [
  { id: "dollar", name: "Dólar", value: 4150.75, format: "COP", direction: "down", change: -18.3, changePercent: -0.44 },
  { id: "trm", name: "TRM", value: 4185.6, format: "COP", direction: "up", change: 12.2, changePercent: 0.29 },
  { id: "euro", name: "Euro", value: 4503.8, format: "COP", direction: "down", change: -9.5, changePercent: -0.21 },
  { id: "bolivar", name: "Bolívar", value: 0.03, format: "USD", direction: "up", changePercent: 3.45 },
  { id: "mexican-peso", name: "Peso mexicano", value: 0.06, format: "USD", direction: "up", changePercent: 1.67 },
  { id: "coffee", name: "Café", value: 2.85, format: "USD", direction: "down", change: -0.04, changePercent: -1.38 },
  { id: "gold", name: "Oro", value: 2346.5, format: "USD", direction: "up", change: 14.2, changePercent: 0.61 },
  { id: "usury", name: "Tasa de usura en Colombia", value: 29.24, format: "percent", direction: "down" },
];

export const interestRate: Indicator = {
  id: "interest-rate", name: "Tasa de interés del Banrep", value: 9.25, format: "percent", direction: "down",
};

export const stockIndex: Indicator = {
  id: "icolcap", name: "ICOLCAP", value: 1384.7, format: "number", direction: "up",
};
