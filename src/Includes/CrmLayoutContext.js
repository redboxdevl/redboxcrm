import { createContext } from 'react';

// Legacy pages skip their standalone navigation when hosted in the CRM workspace.
export const CrmLayoutContext = createContext(false);
