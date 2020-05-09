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
      Indikator_Periode: [],
      form: {
        id_master: 1,
        id_periode: 1,
        bobot: ''
      }
    }
  },
  mounted() {
    let spreadsheet = jexcel(this.$el, this.jexcelOptions)
    Object.assign(this, { spreadsheet })
  },
  methods: {
    newRow() {
      axios.post('http://10.199.14.46:8005/api/Indikator_Periode/', this.form).then(res => {
        console.log(res.data)
      })
    },
    updateRow(instance, cell, columns, row, value) {
      axios.get('http://10.199.14.46:8005/api/Indikator_Periode/').then(res => {
        var index = Object.values(res.data[row])
        index[columns] = value
        console.log(index)
        axios.put('http://10.199.14.46:8005/api/Indikator_Periode/' + index[0], {
          id_master: index[0],
          id_periode: index[1],
          bobot: index[2]
        }).then(res => {
          console.log(res.data)
        })
      })
    },
    deleteRow(instance, row) {
      axios.get('http://10.199.14.46:8005/api/Indikator_Periode/').then(res => {
        var index = Object.values(res.data[row])
        // console.log(index)
        console.log(row)
        axios.delete('http://10.199.14.46:8005/api/Indikator_Periode/' + index[0])
      })
    }
  },
  computed: {
    jexcelOptions() {
      return {
        data: this.Indikator_Periode,
        allowToolbar: true,
        url: 'http://10.199.14.46:8005/api/Indikator_Periode/',
        onchange: this.updateRow,
        oninsertrow: this.newRow,
        ondeleterow: this.deleteRow,
        columns: [
          { type: 'text', title: 'id_master', width: '120px' },
          { type: 'text', title: 'id_periode', width: '120px' },
          { type: 'text', title: 'bobot', width: '200px' }
        ]
      }
    }
  }
}
</script>
