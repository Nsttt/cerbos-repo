import { useState } from 'react';
import './App.css';
import { canCreatePurchaseOrder, hasCerbosRuleId } from './cerbos.ts';

function App() {
  const [role, setRole] = useState('USER');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | undefined>();
  const [error, setError] = useState<string | undefined>();

  const ruleIdConfigured = hasCerbosRuleId();

  const runCheck = async () => {
    setLoading(true);
    setError(undefined);
    setResult(undefined);

    try {
      const allowed = await canCreatePurchaseOrder(role);
      setResult(allowed ? 'ALLOW' : 'DENY');
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="app-shell">
      <div className="card">
        <h1>Cerbos WASM PDP</h1>
        <p className="subtitle">Embedded policy decision point using rule-based bundles from Cerbos Hub.</p>

        <label className="field">
          <span>Principal role</span>
          <select value={role} onChange={(event) => setRole(event.target.value)}>
            <option value="USER">USER</option>
            <option value="MANAGER">MANAGER</option>
            <option value="ADMIN">ADMIN</option>
          </select>
        </label>

        <button type="button" onClick={runCheck} disabled={!ruleIdConfigured || loading}>
          {loading ? 'Checking...' : 'Check purchase_order.create'}
        </button>

        {!ruleIdConfigured && (
          <p className="message error">
            Set <code>CERBOS_RULE_ID</code> and restart the dev server.
          </p>
        )}

        {result && (
          <p className={`message ${result === 'ALLOW' ? 'allow' : 'deny'}`}>
            Decision: <strong>{result}</strong>
          </p>
        )}

        {error && <p className="message error">{error}</p>}

        <p className="hint">
          Request shape: principal role `{role}` on resource <code>purchase_order</code> with action{' '}
          <code>create</code>.
        </p>
      </div>
    </main>
  );
}

export default App;
