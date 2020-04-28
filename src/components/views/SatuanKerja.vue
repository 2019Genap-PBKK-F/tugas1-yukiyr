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
      SatuanKerja: [],
      form: {
        id: '',
        nama: '',
        level_unit: '',
        id_induk_satker: '',
        id_jns_satker: ''
      }
    }
  },
  mounted() {
    let spreadsheet = jexcel(this.$el, this.jexcelOptions)
    Object.assign(this, { spreadsheet })
  },
  methods: {
    newRow() {
      axios.post('http://localhost:8005/api/SatuanKerja/', this.form).then(res => {
        console.log(res.data)
      })
    },
    updateRow(instance, cell, columns, row, value) {
      axios.get('http://localhost:8005/api/SatuanKerja/').then(res => {
        var index = Object.values(res.data[row])
        index[columns] = value
        console.log(index)
        axios.put('http://localhost:8005/api/SatuanKerja/' + index[0], {
          id: index[0],
          nama: index[1],
          level_induk: index[2],
          id_induk_satker: index[3],
          id_jns_satker: index[4]
        }).then(res => {
          console.log(res.data)
        })
      })
    },
    deleteRow(instance, row) {
      axios.get('http://localhost:8005/api/SatuanKerja/').then(res => {
        var index = Object.values(res.data[row])
        // console.log(index)
        console.log(row)
        axios.delete('http://localhost:8005/api/SatuanKerja/' + index[0])
      })
    }
  },
  computed: {
    jexcelOptions() {
      return {
        data: this.SatuanKerja1,
        allowToolbar: true,
        url: 'http://localhost:8005/api/SatuanKerja/',
        onchange: this.updateRow,
        oninsertrow: this.newRow,
        ondeleterow: this.deleteRow,
        columns: [
          { type: 'text', title: 'id', width: '280px' },
          { type: 'text', title: 'nama', width: '130px', wordWrap: true },
          { type: 'text', title: 'level_induk', width: '90px' },
          { type: 'text', title: 'id_induk_satker', width: '280px' },
          { type: 'text', title: 'id_jns_satker', width: '90px' }
        ]
      }
    }
  }
}
</script>
