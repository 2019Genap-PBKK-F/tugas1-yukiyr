<template>
  <div>
    <div id="app" ref="spreadsheet"></div>
    <div><input type="button" value="Add new row" @click="() => spreadsheet.insertRow()" /></div>
  </div>
</template>

<script>
import jexcel from 'jexcel'
import 'jexcel/dist/jexcel.css'

var data = [
  ['05111740000023', 'Yuki Yanuar Ratna', '2017', '2019-02-12', '', true],
  ['05111740000044', 'Izzah Dinillah', '2017', '2018-07-11', '', true]
]

var options = {
  data: data,
  allowToolbar: true,
  columns: [
    { type: 'text', title: 'NRP', width: '120px' },
    { type: 'text', title: 'Nama', width: '120px' },
    { type: 'dropdown', title: 'Angkatan', width: '250px', source: [ '2015', '2016', '2017', '2018', '2019' ] },
    { type: 'calendar', title: 'Tanggal Lahir', width: '250px' },
    { type: 'image', title: 'Photo', width: '120px' },
    { type: 'checkbox', title: 'Aktif', width: '80px' }
  ]
}

export default {
  name: 'App',
  mounted: function () {
    let spreadsheet = jexcel(this.$el, options)
    Object.assign(this, { spreadsheet })
  }
}

</script>
