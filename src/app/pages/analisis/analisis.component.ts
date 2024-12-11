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
  LineController
} from 'chart.js';

@Component({
  selector: 'app-analisis',
  templateUrl: './analisis.component.html',
  styleUrls: ['./analisis.component.css']
})
export class AnalisisComponent implements AfterViewInit {

  constructor() {
    // Registrar los componentes necesarios para los gráficos
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
      LineController
    );
  }

  ngAfterViewInit(): void {
    this.initializeDoughnutChart();
    this.initializeLineChart1();
    this.initializeLineChart2();
  }

  initializeDoughnutChart(): void {
    const doughnutCtx = document.getElementById('doughnutChart') as HTMLCanvasElement;
    if (doughnutCtx) {
      new Chart(doughnutCtx, {
        type: 'doughnut',
        data: {
          labels: ['Género 1', 'Género 2', 'Género 3', 'Género 4'],
          datasets: [{
            data: [30, 20, 25, 25],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
          }]
        },
        options: {
          responsive: true, 
          plugins: {
            legend: {
              position: 'right', 
              labels: {
                font: {
                  size: 18,  
                  family: 'Roboto', 
                  weight: 'bold', 
                },
                color: 'white', 
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
          labels: ['Punto 1', 'Punto 2', 'Punto 3', 'Punto 4'],
          datasets: [{
            label: ' Evolucion de la Energía',
            data: [10, 20, 15, 30],
            borderColor: '#FF6384',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            fill: true
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: true,
              labels: {
                color: '#FFFFFF',  // Cambiar el color de la leyenda
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
          labels: ['Clave 1', 'Clave 2', 'Clave 3', 'Clave 4'],
          datasets: [{
            label: 'Distribucion de la clave',
            data: [5, 15, 10, 20],
            borderColor: '#36A2EB',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            fill: true
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: true,
              labels: {
                color: 'black',  // Cambiar el color de la leyenda
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
