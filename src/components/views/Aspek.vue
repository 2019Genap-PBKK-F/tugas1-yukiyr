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
      Aspek: [],
      form: {
        id: '',
        aspek: '',
        komponen_aspek: ''
      }
    }
  },
  mounted() {
    let spreadsheet = jexcel(this.$el, this.jexcelOptions)
    Object.assign(this, { spreadsheet })
  },
  methods: {
    newRow() {
      axios.post('http://localhost:8005/api/Aspek/', this.form).then(res => {
        console.log(res.data)
      })
    },
    updateRow(instance, cell, columns, row, value) {
      axios.get('http://localhost:8005/api/Aspek/').then(res => {
        var index = Object.values(res.data[row])
        index[columns] = value
        console.log(index)
        axios.put('http://localhost:8005/api/Aspek/' + index[0], {
          id: index[0],
          aspek: index[1],
          komponen_aspek: index[2]
        }).then(res => {
          console.log(res.data)
        })
      })
    },
    deleteRow(instance, row) {
      axios.get('http://localhost:8005/api/Aspek/').then(res => {
        var index = Object.values(res.data[row])
        // console.log(index)
        console.log(row)
        axios.delete('http://localhost:8005/api/Aspek/' + index[0])
      })
    }
  },
  computed: {
    jexcelOptions() {
      return {
        data: this.Aspek,
        allowToolbar: true,
        url: 'http://localhost:8005/api/Aspek/',
        onchange: this.updateRow,
        oninsertrow: this.newRow,
        ondeleterow: this.deleteRow,
        columns: [
          { type: 'text', title: 'id', width: '50px' },
          { type: 'text', title: 'aspek', width: '200px' },
          { type: 'text', title: 'komponen_aspek', wordWrap: true, width: '200px' }
        ]
      }
    }
  }
}
</script>
