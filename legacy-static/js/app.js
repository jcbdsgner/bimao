// BIMAO OS - Cross-Module Dynamic Dataset
document.addEventListener('DOMContentLoaded', () => {
  const periodDataset = {
    '7j': {
      clients: '8 434', clientsTrend: '<span class="text-emerald-400">↑</span> +24', encours: '105,8', nplRate: '<span class="text-rose-400">●</span> 38,1% NPL', position: '-0,8', positionTrend: '<span class="text-rose-400">↓</span> Débitrice', b2wReq: '240', b2wFailRate: '<span class="text-rose-400">●</span> 19,1% Rejet', b2wSuccVal: '194 tx / 8,8 M', b2wFailVal: '46 tx / 2,1 M', douteuxCnt: '129 (57,1%)', douteuxVal: '9,5 Mds FCFA', sainsCnt: '90 (39,8%)', sainsVal: '0,9 Md FCFA'
    },
    '30j': {
      clients: '8 434', clientsTrend: '<span class="text-emerald-400">↑</span> +4,2% vs M-1', encours: '105,8', nplRate: '<span class="text-rose-400">●</span> 38,1% NPL', position: '-4,2', positionTrend: '<span class="text-rose-400">↓</span> Débitrice', b2wReq: '1 000', b2wFailRate: '<span class="text-rose-400">●</span> 20,7% Rejet', b2wSuccVal: '793 tx / 35,5 M', b2wFailVal: '207 tx / 9,2 M', douteuxCnt: '129 (57,1%)', douteuxVal: '9,5 Mds FCFA', sainsCnt: '90 (39,8%)', sainsVal: '0,9 Md FCFA'
    },
    'm1': {
      clients: '8 210', clientsTrend: '<span class="text-emerald-400">↑</span> +2,1% vs M-1', encours: '102,4', nplRate: '<span class="text-rose-400">●</span> 36,5% NPL', position: '+1,5', positionTrend: '<span class="text-emerald-400">↑</span> Créditrice', b2wReq: '850', b2wFailRate: '<span class="text-rose-400">●</span> 18,2% Rejet', b2wSuccVal: '695 tx / 31,2 M', b2wFailVal: '155 tx / 6,8 M', douteuxCnt: '118 (55,2%)', douteuxVal: '8,8 Mds FCFA', sainsCnt: '88 (41,1%)', sainsVal: '0,9 Md FCFA'
    },
    't4': {
      clients: '7 980', clientsTrend: '<span class="text-emerald-400">↑</span> +5,4% vs T3', encours: '99,1', nplRate: '<span class="text-rose-400">●</span> 34,2% NPL', position: '+3,1', positionTrend: '<span class="text-emerald-400">↑</span> Créditrice', b2wReq: '2 400', b2wFailRate: '<span class="text-rose-400">●</span> 16,8% Rejet', b2wSuccVal: '1 996 tx / 89 M', b2wFailVal: '404 tx / 18 M', douteuxCnt: '105 (52,0%)', douteuxVal: '7,9 Mds FCFA', sainsCnt: '82 (43,1%)', sainsVal: '0,8 Md FCFA'
    }
  };

  const toggleBtns = document.querySelectorAll('.segmented-btn');
  toggleBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      toggleBtns.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      const period = e.target.getAttribute('data-period');
      updateStats(period);
    });
  });

  function updateStats(periodKey) {
    const data = periodDataset[periodKey] || periodDataset['30j'];
    const statElements = document.querySelectorAll('.stat-value');
    statElements.forEach(el => el.classList.add('stat-updating'));
    setTimeout(() => {
      const map = {
        'val-clients': data.clients, 'val-clients-trend': data.clientsTrend, 'val-encours': data.encours, 'val-npl-rate': data.nplRate, 'val-position': data.position, 'val-position-trend': data.positionTrend, 'val-b2w-req': data.b2wReq, 'val-b2w-failrate': data.b2wFailRate, 'val-b2w-succ-val': data.b2wSuccVal, 'val-b2w-fail-val': data.b2wFailVal, 'val-douteux-cnt': data.douteuxCnt, 'val-douteux-val': data.douteuxVal, 'val-sains-cnt': data.sainsCnt, 'val-sains-val': data.sainsVal
      };
      for (let id in map) {
        const el = document.getElementById(id);
        if (el) el.innerHTML = map[id];
      }
      statElements.forEach(el => el.classList.remove('stat-updating'));
    }, 150);
  }
});
