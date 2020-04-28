<template>
  <div>
    <div id="app" ref="spreadsheet"></div>
    <div>
        <input type="button" value="Add New Row" @click="() => spreadsheet.insertRow()" />
        <input type="button" value="Delete Selected Row" @click="() => spreadsheet.deleteRow()" />
    </div>
  </div>
</template>

<script>
import jexcel from 'jexcel'
import 'jexcel/dist/jexcel.css'
import axios from 'axios'

export default {
  // name: 'App',
  data() {
    return {
      Indikator_SatuanKerja: [],
      form: {
        id_periode: 1,
        id_master: 1,
        id_satker: 'kode002',
        bobot: '',
        target: '',
        capaian: '',
        last_update: ''
      }
    }
  },
  mounted() {
    let spreadsheet = jexcel(this.$el, this.jexcelOptions)
    Object.assign(this, { spreadsheet })
  },
  methods: {
    newRow() {
      axios.post('http://localhost:8005/api/Indikator_SatuanKerja/', this.form).then(res => {
        console.log(res.data)
      })
    },
    updateRow(instance, cell, columns, row, value) {
      axios.get('http://localhost:8005/api/Indikator_SatuanKerja/').then(res => {
        var index = Object.values(res.data[row])
        index[columns] = value
        console.log(index)
        axios.put('http://localhost:8005/api/Indikator_SatuanKerja/' + index[0], {
          id_periode: index[0],
          id_master: index[1],
          id_satker: index[2],
          bobot: index[3],
          target: index[4],
          capaian: index[5],
          last_update: index[6]
        }).then(res => {
          console.log(res.data)
        })
      })
    },
    deleteRow(instance, row) {
      axios.get('http://localhost:8005/api/Indikator_SatuanKerja/').then(res => {
        var index = Object.values(res.data[row])
        // console.log(index)
        console.log(row)
        axios.delete('http://localhost:8005/api/Indikator_SatuanKerja/' + index[0])
      })
    }
  },
  computed: {
    jexcelOptions() {
      return {
        data: this.Indikator_SatuanKerja,
        allowToolbar: true,
        url: 'http://localhost:8005/api/Indikator_SatuanKerja/',
        onchange: this.updateRow,
        oninsertrow: this.newRow,
        ondeleterow: this.deleteRow,
        columns: [
          { type: 'text', title: 'id_periode', width: '120px' },
          { type: 'text', title: 'id_master', width: '120px' },
          { type: 'text', title: 'id_satker', width: '120px' },
          { type: 'text', title: 'bobot', width: '200px' },
          { type: 'text', title: 'target', width: '200px' },
          { type: 'text', title: 'capaian', width: '200px' },
          { type: 'text', title: 'last_update', width: '200px' }
        ]
      }
    }
  }
}
</script>
