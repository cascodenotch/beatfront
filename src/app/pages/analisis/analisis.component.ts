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

  setAnalysisData: any = {}; 
  energyData: number[] = [];
  keyData: number[]=[];

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

setAnalysis (): void{

  this.setService.setAnalysis(this.setService.set.id_set).subscribe({
    next: (response: any) => {
    this.setAnalysisData = response.data;
    this.energyData = response.data.arrayEnergy;
    this.keyData = response.data.arrayKey;
    this.initializeLineChart1();
    this.initializeLineChart2();
    },
    error: (err) => {
      console.error('Error al obtener el análisis del set', err);
    }
  });
}

ngAfterViewInit(): void {
  this.initializeBarChart();
}

initializeBarChart(): void {
  const barCtx = document.getElementById('barChart') as HTMLCanvasElement;
  if (barCtx) {
    new Chart(barCtx, {
      type: 'bar', 
      data: {
        labels: ['Género 1', 'Género 2', 'Género 3', 'Género 4'], 
        datasets: [{
          label: 'Porcentaje por Género',
          data: [30, 20, 25, 25],
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
              }
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
          label: 'Distribucion de la clave',
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

