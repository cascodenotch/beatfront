import { Component, AfterViewInit } from '@angular/core';
import {
  Chart,
  ChartConfiguration,
  ChartTypeRegistry,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend,
  DoughnutController,
  LineController,
  BarController, 
  Filler
} from 'chart.js';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import { SetsService } from 'src/app/shared/sets.service';

@Component({
  selector: 'app-analisis',
  templateUrl: './analisis.component.html',
  styleUrls: ['./analisis.component.css']
})
export class AnalisisComponent implements AfterViewInit {


  // Propiedades
  setAnalysisData: any = {}; 
  energyData: number[] = [];
  keyData: number[]=[];
  valenceData: number []=[];
  isLoading: boolean = true; 
  errorMessage: boolean = false; 

  constructor(public setService : SetsService) {

    Chart.register(
      ArcElement,
      LineElement,
      BarElement,
      PointElement,
      LinearScale,
      CategoryScale,
      Title,
      Tooltip,
      Legend,
      DoughnutController,
      LineController,
      BarController,
      Filler
    );
  }

ngOnInit(): void {
    this.setAnalysis(); 
  }

setAnalysis(): void {
  this.setService.setAnalysis(this.setService.set.id_set).subscribe({
    next: (response: any) => {
      if (response.error) {
        this.isLoading = false;
        this.errorMessage = true;  
      } else {
        this.setAnalysisData = response.data;
        this.energyData = response.data.arrayEnergy;
        this.keyData = response.data.arrayKey;
        this.valenceData = response.data.arrayValence;
        this.isLoading = false; 
        this.initializeCharts();
      }
    },
    error: (err) => {
      console.error('Error al obtener el análisis del set', err);
      this.isLoading = false;
    }
  });
}

ngAfterViewInit(): void {
}

ngAfterViewChecked(): void {
  if (!this.isLoading) {
    setTimeout(() => {
      this.initializeCharts();
    }, 0);
  }
}

initializeCharts(): void {
  this.initializeBarChart();
  this.initializeLineChart1();
  this.initializeLineChart2();
}

initializeBarChart(): void {
  const barCtx = document.getElementById('barChart') as HTMLCanvasElement;
  if (barCtx) {
    new Chart(barCtx, {
      type: 'bar', 
      data: {
        labels: ['Triste', 'Melancólico', 'Neutro', 'Alegre', 'Eufórico'], 
        datasets: [{
          label: 'Distribución Emocional de las Canciones',
          data: this.valenceData,
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'], 
          borderWidth: 1, 
        }]
      },
      options: {
        responsive: true, 
        plugins: {
          legend: {
            display: true,
            labels: {
              boxWidth: 0, 
              color: 'white', 
              font: {
                size: 14,
                family: 'Roboto',
                weight: 'bold',
              }
            }
          }
        },
        scales: {
          x: {
            ticks: {
              color: 'white',
              font: {
                size: 14,
                family: 'Roboto',
                weight: 'bold',
              }
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.0)',
            }
          },
          y: {
            ticks: {
              color: 'white',
              font: {
                size: 14,
                family: 'Roboto',
                weight: 'bold',
              },
              callback: (value) => Number.isInteger(value) ? value : null,
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.0)',
            }
          }
        }
      }
    });
  } 
}

initializeLineChart1(): void {
  const lineChart1Ctx = document.getElementById('lineChart1') as HTMLCanvasElement;
  if (lineChart1Ctx) {
    new Chart(lineChart1Ctx, {
      type: 'line',
      data: {
        labels: this.energyData.map((_, index) => `Canción ${index + 1}`),
        datasets: [{
          label: ' Evolucion de la Energía',
          data:  this.energyData,
                  borderColor: '#FF6384',
                  backgroundColor: 'rgba(255, 99, 132, 0.2)',
          fill: true,
        }]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            ticks: {
              color: '#D9D9D9',  
              font: {
                size: 14,
                family: 'Roboto',
                weight: 'bold',
              }
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.0)',
            }
          },
          y: {
            ticks: {
              color: '#D9D9D9',  
              font: {
                size: 14,
                family: 'Roboto',
                weight: 'bold',
              }
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.0)',
            }
          }
        },
        plugins: {
          legend: {
            display: true,
            labels: {
              boxWidth: 0, 
              color: '#D9D9D9',  
              font: {
                size: 18,
                family: 'Roboto',
                weight: 'bold',
              }
            }
          }
        }
      }
    });
  }
}


initializeLineChart2(): void {
  const lineChart2Ctx = document.getElementById('lineChart2') as HTMLCanvasElement;
  if (lineChart2Ctx) {
    new Chart(lineChart2Ctx, {
      type: 'line',
      data: {
        labels: this.keyData.map((_, index) => `Canción ${index + 1}`),
        datasets: [{
          label: 'Variación de la Clave',
          data: this.keyData,
          borderColor: '#1A5276',  
          backgroundColor: 'rgba(54, 162, 235, 0.1)',  
          fill: true,
        }]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            ticks: {
              color: '#2C3E50',  
              font: {
                size: 14,
                family: 'Roboto',
                weight: 'bold',
              }
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.0)',
            }
          },
          y: {
            ticks: {
              callback: (tickValue: string | number) => {
                const numericValue = typeof tickValue === 'number' ? tickValue : parseFloat(tickValue);
                return isNaN(numericValue) ? '' : this.convertKeyToPitch(numericValue);
              },
              color: '#2C3E50',  
              font: {
                size: 14,
                family: 'Roboto',
                weight: 'bold',
              }
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.0)',
            }
          }
        },
        plugins: {
          legend: {
            display: true,
            labels: {
              boxWidth: 0, 
              color: 'black',  
              font: {
                size: 18,
                family: 'Roboto',
                weight: 'bold',
              }
            }
          }
        }
      }
    });
  }
}

// Función para convertir el valor de 'key' a notación musical
convertKeyToPitch(key: number): string {
  if (key === null || key === undefined || key === -1) {
    return "";  // Devuelve un valor predeterminado si key es null, undefined o -1
  }
  const pitches = [
    "C", "C#", "D", "D#", "E", "F", "F#", 
    "G", "G#", "A", "A#", "B"
  ];
  return pitches[key % 12];
}

}  

