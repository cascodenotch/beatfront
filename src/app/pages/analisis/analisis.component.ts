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
  BarController
} from 'chart.js';

@Component({
  selector: 'app-analisis',
  templateUrl: './analisis.component.html',
  styleUrls: ['./analisis.component.css']
})
export class AnalisisComponent implements AfterViewInit {

  constructor() {
    
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
      BarController
    );
  }

  ngAfterViewInit(): void {
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
          labels: [
            'Punto 1', 'Punto 2', 'Punto 3', 'Punto 4', 'Punto 1', 'Punto 2', 'Punto 3', 'Punto 4', 
            'Punto 1', 'Punto 2', 'Punto 3', 'Punto 4', 'Punto 1', 'Punto 2', 'Punto 3', 'Punto 4', 
            'Punto 1', 'Punto 2', 'Punto 3', 'Punto 4', 'Punto 1', 'Punto 2', 'Punto 3', 'Punto 4', 
            'Punto 1', 'Punto 2', 'Punto 3', 'Punto 4', 'Punto 1', 'Punto 2', 'Punto 3', 'Punto 4', 
            'Punto 1', 'Punto 2', 'Punto 3', 'Punto 4', 'Punto 1', 'Punto 2', 'Punto 3', 'Punto 4', 
            'Punto 1', 'Punto 2', 'Punto 3', 'Punto 4', 'Punto 1', 'Punto 2', 'Punto 3', 'Punto 4'
          ],
          datasets: [{
            label: ' Evolucion de la Energía',
            data: [10, 20, 15, 30, 10, 20, 15, 30, 10, 20, 15, 30, 10, 20, 15, 30, 10, 20, 15, 30, 
                   10, 20, 15, 30, 10, 20, 15, 30, 10, 20, 15, 30, 10, 20, 15, 30, 10, 20, 15, 30, 
                   10, 20, 15, 30, 10, 20, 15, 30],
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
          labels: ['Clave 1', 'Clave 2', 'Clave 3', 'Clave 4','Clave 1', 'Clave 2', 'Clave 3', 'Clave 4',
            'Clave 1', 'Clave 2', 'Clave 3', 'Clave 4','Clave 1', 'Clave 2', 'Clave 3', 'Clave 4'
          ],
          datasets: [{
            label: 'Distribucion de la clave',
            data: [5, 15, 10, 20, 5, 15, 10, 20, 5, 15, 10, 20, 5, 15, 10, 20],
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
}  
