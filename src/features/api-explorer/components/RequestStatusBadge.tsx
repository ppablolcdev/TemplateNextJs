import type { RequestPhase } from "@/features/api-explorer/types";

interface RequestStatusBadgeProps {
  phase: RequestPhase;
}

const LABELS: Record<RequestPhase, string> = {
  idle: "Lista",
  loading: "Cargando",
  success: "Exito",
  error: "Error",
};

export function RequestStatusBadge({ phase }: RequestStatusBadgeProps) {
  return <span className={`status-chip request-${phase}`}>{LABELS[phase]}</span>;
}
