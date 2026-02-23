import { Embedded } from '@cerbos/embedded-client';
import wasmUrl from '@cerbos/embedded-server/server.wasm';

let embeddedClient: Embedded | undefined;

function getRuleId(): string {
  return __CERBOS_RULE_ID__.trim();
}

export function hasCerbosRuleId(): boolean {
  return getRuleId().length > 0;
}

export function getCerbosClient(): Embedded {
  if (embeddedClient) {
    return embeddedClient;
  }

  const ruleId = getRuleId();

  if (!ruleId) {
    throw new Error(
      'Missing CERBOS_RULE_ID. Set it before starting the app (for example: CERBOS_RULE_ID=RULExxx pnpm run dev).',
    );
  }

  embeddedClient = new Embedded({
    policies: { ruleId },
    wasm: wasmUrl,
  });

  return embeddedClient;
}

export async function canCreatePurchaseOrder(role: string): Promise<boolean> {
  const cerbos = getCerbosClient();

  return cerbos.isAllowed({
    principal: {
      id: `demo-${role.toLowerCase()}`,
      roles: [role],
      attr: { department: 'sales' },
    },
    resource: {
      kind: 'purchase_order',
      id: 'PO-1000',
      attr: {
        owner: 'demo-user',
        totalCents: 125000,
      },
    },
    action: 'create',
  });
}
