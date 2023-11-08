document.getElementById("simulate").addEventListener("click", function () {
    const s0 = parseFloat(document.getElementById("S0").value);
    const i0 = parseFloat(document.getElementById("I0").value);
    const r0 = parseFloat(document.getElementById("R0").value);
    const beta = parseFloat(document.getElementById("beta").value);
    const gamma = parseFloat(document.getElementById("gamma").value);
  
    const simulationResult = simulateSIR(s0, i0, r0, beta, gamma);
    plotResult(simulationResult);
  });
  
  function simulateSIR(s0, i0, r0, beta, gamma, days = 100) {
    let S = s0;
    let I = i0;
    let R = r0;
    let N = s0 + i0 + r0;
  
    const result = [
      {
        S: S,
        I: I,
        R: R,
      },
    ];
  
    for (let t = 1; t <= days; t++) {
      const newI = (beta * I * S) / N;
      const newR = gamma * I;
  
      S -= newI;
      I += newI - newR;
      R += newR;
  
      result.push({
        S: S,
        I: I,
        R: R,
      });
    }
  
    return result;
  }
  
  function plotResult(simulationResult) {
    const canvas = document.getElementById("graph");
    const ctx = canvas.getContext("2d");
  
    if (window.myChart) {
      window.myChart.destroy();
    }
  
    const labels = simulationResult.map((_, i) => i);
    const S_data = simulationResult.map((entry) => entry.S);
    const I_data = simulationResult.map((entry) => entry.I);
    const R_data = simulationResult.map((entry) => entry.R);
  
    window.myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "감염 취약자",
            data: S_data,
            borderColor: "blue",
            fill: false,
          },
          {
            label: "감염자",
            data: I_data,
            borderColor: "red",
            fill: false,
          },
          {
            label: "회복자",
            data: R_data,
            borderColor: "green",
            fill: false,
          },
        ],
      },
      options: {
        scales: {
          x: {
            title: {
              display: true,
              text: "경과 시간",
            },
          },
          y: {
            title: {
              display: true,
              text: "인구수",
            },
          },
        },
        responsive: true,
      },
    });
  }
  
  
  /**
  function updateGraph() {
    const s0 = parseFloat(document.getElementById("S0").value);
    const i0 = parseFloat(document.getElementById("I0").value);
    const r0 = parseFloat(document.getElementById("R0").value);
    const beta = parseFloat(document.getElementById("beta").value);
    const gamma = parseFloat(document.getElementById("gamma").value);
  
    const simulationResult = simulateSIR(s0, i0, r0, beta, gamma);
    plotResult(simulationResult);
  }
  
  document.getElementById("beta").addEventListener("input", function (event) {
    const betaValueElement = document.getElementById("beta-value");
    betaValueElement.textContent = event.target.value;
    updateGraph();
  });
  
  document.getElementById("gamma").addEventListener("input", function (event) {
    const gammaValueElement = document.getElementById("gamma-value");
    gammaValueElement.textContent = event.target.value;
    updateGraph();
  });
  
  updateGraph(); // 처음 페이지를 로드할 때, 그래프 초기화하기 위해 호출
  **/