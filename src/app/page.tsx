"use client";

import { RequestStatusBadge } from "@/features/api-explorer/components/RequestStatusBadge";
import { ResponseTable } from "@/features/api-explorer/components/ResponseTable";
import { useRealApiExplorer } from "@/features/api-explorer/hooks/useRealApiExplorer";
import { mapPayloadToTableModel } from "@/features/api-explorer/mappers/payload-table-mappers";

export default function Home() {
  const explorer = useRealApiExplorer();

  return (
    <main className="test-page-shell">
      <section className="test-panel">
        <section className="operation-section">
          <div className="operation-header">
            <div>
              <h2>Consultar cuenta</h2>
            </div>
            <RequestStatusBadge phase={explorer.accountRequest.phase} />
          </div>
          <form
            className="transfer-form"
            onSubmit={(event) => {
              event.preventDefault();
              void explorer.fetchAccount();
            }}
          >
            <label>
              accountId
              <input
                onChange={(event) => explorer.setAccountId(event.target.value)}
                value={explorer.accountId}
              />
            </label>
            <button disabled={explorer.accountRequest.phase === "loading"} type="submit">
              {explorer.accountRequest.phase === "loading"
                ? "Consultando..."
                : "Consultar cuenta real"}
            </button>
          </form>
          <ResponseTable
            emptyMessage="Todavia no se ejecuto la consulta real de cuenta."
            value={mapPayloadToTableModel(explorer.accountRequest.result)}
          />
        </section>

        <section className="operation-section">
          <div className="operation-header">
            <div>
              <h2>Registrar transferencia</h2>
            </div>
            <RequestStatusBadge phase={explorer.transferRequest.phase} />
          </div>
          <form
            className="transfer-form"
            onSubmit={(event) => {
              event.preventDefault();
              void explorer.createTransfer();
            }}
          >
            <label>
              SourceAccountNumber
              <input
                onChange={(event) => explorer.setSourceAccountNumber(event.target.value)}
                value={explorer.sourceAccountNumber}
              />
            </label>
            <label>
              DestinationAccountNumber
              <input
                onChange={(event) => explorer.setDestinationAccountNumber(event.target.value)}
                value={explorer.destinationAccountNumber}
              />
            </label>
            <label>
              Amount
              <input
                min="0"
                onChange={(event) => explorer.setAmount(event.target.value)}
                step="0.01"
                type="number"
                value={explorer.amount}
              />
            </label>
            <button disabled={explorer.transferRequest.phase === "loading"} type="submit">
              {explorer.transferRequest.phase === "loading" ? "Enviando..." : "Transferir real"}
            </button>
          </form>
          <ResponseTable
            emptyMessage="Todavia no se ejecuto la transferencia real."
            value={mapPayloadToTableModel(explorer.transferRequest.result)}
          />
        </section>

        <section className="operation-section">
          <div className="panel-header">
            <div>
              <h2>Consultar transacciones</h2>
            </div>
            <div className="header-inline">
              <RequestStatusBadge phase={explorer.transactionsRequest.phase} />
              <button
                className="ghost-button"
                onClick={() => void explorer.fetchTransactions()}
                type="button"
              >
                Consultar
              </button>
            </div>
          </div>
          <ResponseTable
            emptyMessage="Todavia no se consulto el historial real."
            value={mapPayloadToTableModel(explorer.transactionsRequest.result)}
          />
        </section>
      </section>
    </main>
  );
}
