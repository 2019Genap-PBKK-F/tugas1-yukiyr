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
      MasterIndikator: [],
      form: {
        id: '',
        id_aspek: '',
        id_penyebut: '',
        id_pembilang: '',
        nama: '',
        deskripsi: '',
        default_bobot: '',
        create_date: '',
        last_update: '',
        expired_date: ''
      }
    }
  },
  mounted() {
    let spreadsheet = jexcel(this.$el, this.jexcelOptions)
    Object.assign(this, { spreadsheet })
  },
  methods: {
    newRow() {
      axios.post('http://localhost:8005/api/MasterIndikator/', this.form).then(res => {
        console.log(res.data)
      })
    },
    updateRow(instance, cell, columns, row, value) {
      axios.get('http://localhost:8005/api/MasterIndikator/').then(res => {
        var index = Object.values(res.data[row])
        index[columns] = value
        console.log(index)
        axios.put('http://localhost:8005/api/MasterIndikator/' + index[0], {
          id: index[0],
          id_aspek: index[1],
          id_penyebut: index[2],
          id_pembilang: index[3],
          nama: index[4],
          deskripsi: index[5],
          default_bobot: index[6],
          create_date: index[7],
          last_update: index[8],
          expired_date: index[9]
        }).then(res => {
          console.log(res.data)
        })
      })
    },
    deleteRow(instance, row) {
      axios.get('http://localhost:8005/api/MasterIndikator/').then(res => {
        var index = Object.values(res.data[row])
        // console.log(index)
        console.log(row)
        axios.delete('http://localhost:8005/api/MasterIndikator/' + index[0])
      })
    }
  },
  computed: {
    jexcelOptions() {
      return {
        data: this.MasterIndikator,
        allowToolbar: true,
        url: 'http://localhost:8005/api/MasterIndikator/',
        onchange: this.updateRow,
        oninsertrow: this.newRow,
        ondeleterow: this.deleteRow,
        columns: [
          { type: 'text', title: 'id', width: '50px' },
          { type: 'text', title: 'id_aspek', width: '80px' },
          { type: 'text', title: 'id_penyebut', width: '95px' },
          { type: 'text', title: 'id_pembilang', width: '95px' },
          { type: 'text', title: 'nama', wordWrap: true, width: '110px' },
          { type: 'text', title: 'deskripsi', wordWrap: true, width: '200px' },
          { type: 'text', title: 'default_bobot', width: '100px' },
          { type: 'text', title: 'create_date', width: '170px' },
          { type: 'text', title: 'last_update', width: '170px' },
          { type: 'text', title: 'expired_date', width: '170px' }
        ]
      }
    }
  }
}
</script>
