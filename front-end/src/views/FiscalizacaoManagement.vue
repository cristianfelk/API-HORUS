<template>
    <div class="fiscalizacao-management">
      <div class="fiscalizacao-header">
        <h2>{{ rua }}</h2>
        <span :class="['status', statusClass]">{{ status }}</span>
      </div>
      <p>{{ endereco }}</p>
      <p>{{ bairro }}</p>
      <p><strong>Observações:</strong> {{ observacoes }}</p>
      <div class="fiscalizacao-footer">
        <span class="data">{{ data }}</span>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      rua: String,
      endereco: String,
      bairro: String,
      observacoes: String,
      data: String,
      status: String
    },
    computed: {
      statusClass() {
        return this.status === 'Finalizada' ? 'finalizada' : 'em-andamento';
      }
    }
  };
  </script>
  
  <style scoped>
  .fiscalizacao-management {
    background-color: #f9f9f9;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    padding: 15px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    margin-bottom: 15px;
  }
  
  .fiscalizacao-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }
  
  .fiscalizacao-header h2 {
    margin: 0;
    font-size: 18px;
    color: #333;
  }
  
  .status {
    padding: 5px 10px;
    border-radius: 15px;
    font-size: 12px;
    font-weight: bold;
    color: white;
  }
  
  .em-andamento {
    background-color: #FFD700;
  }
  
  .finalizada {
    background-color: #4CAF50;
  }
  
  .fiscalizacao-footer {
    display: flex;
    align-items: center;
    margin-top: 10px;
    font-size: 14px;
    color: #777;
  }
  
  .fiscalizacao-footer .data {
    display: flex;
    align-items: center;
  }
  
  .fiscalizacao-footer .data::before {
    content: "⏰";
    margin-right: 5px;
  }
  </style>
  