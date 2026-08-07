import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppShell } from "@/components/layout/AppShell";
import { Overview } from "@/pages/Overview";
import { Clients } from "@/pages/Clients";
import { ComptesBancaires } from "@/pages/ComptesBancaires";
import { CreditRisque } from "@/pages/CreditRisque";
import { DigitalFlux } from "@/pages/DigitalFlux";
import { MonetiqueCartes } from "@/pages/MonetiqueCartes";
import { ItSupport } from "@/pages/ItSupport";
import { CarthagoGap } from "@/pages/CarthagoGap";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/" element={<Overview />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/comptes-bancaires" element={<ComptesBancaires />} />
          <Route path="/credit-risque" element={<CreditRisque />} />
          <Route path="/digital-flux" element={<DigitalFlux />} />
          <Route path="/monetique-cartes" element={<MonetiqueCartes />} />
          <Route path="/it-support" element={<ItSupport />} />
          <Route path="/carthago-gap" element={<CarthagoGap />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
