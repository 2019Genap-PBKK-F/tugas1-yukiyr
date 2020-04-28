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
      Periode: [],
      form: {
        id: '',
        nama: '',
        create_date: '',
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
      axios.post('http://localhost:8005/api/Periode/', this.form).then(res => {
        console.log(res.data)
      })
    },
    updateRow(instance, cell, columns, row, value) {
      axios.get('http://localhost:8005/api/Periode/').then(res => {
        var index = Object.values(res.data[row])
        index[columns] = value
        console.log(index)
        axios.put('http://localhost:8005/api/Periode/' + index[0], {
          id: index[0],
          nama: index[1],
          create_date: index[2],
          last_update: index[3]
        }).then(res => {
          console.log(res.data)
        })
      })
    },
    deleteRow(instance, row) {
      axios.get('http://localhost:8005/api/Periode/').then(res => {
        var index = Object.values(res.data[row])
        // console.log(index)
        console.log(row)
        axios.delete('http://localhost:8005/api/Periode/' + index[0])
      })
    }
  },
  computed: {
    jexcelOptions() {
      return {
        data: this.Periode,
        allowToolbar: true,
        url: 'http://localhost:8005/api/Periode/',
        onchange: this.updateRow,
        oninsertrow: this.newRow,
        ondeleterow: this.deleteRow,
        columns: [
          { type: 'text', title: 'id', width: '50px' },
          { type: 'text', title: 'nama', width: '120px' },
          { type: 'text', title: 'create_date', width: '200px' },
          { type: 'text', title: 'last_update', width: '200px' }
        ]
      }
    }
  }
}
</script>
