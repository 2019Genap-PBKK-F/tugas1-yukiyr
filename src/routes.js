import DashView from './components/Dash.vue'
import LoginView from './components/Login.vue'
import NotFoundView from './components/404.vue'

// Import Views - Dash
import DashboardView from './components/views/Dashboard.vue'
import TablesView from './components/views/Tables.vue'
import MahasiswaView from './components/views/Mahasiswa.vue'
import DosenView from './components/views/Dosen.vue'
import PenelitianView from './components/views/Penelitian.vue'
import AbmasView from './components/views/Abmas.vue'
import PublikasiView from './components/views/Publikasi.vue'
import DataDasarView from './components/views/DataDasar.vue'
import AspekView from './components/views/Aspek.vue'
import MasterIndikatorView from './components/views/MasterIndikator.vue'
import JenisSatkerView from './components/views/JenisSatker.vue'
import PeriodeView from './components/views/Periode.vue'
import IndikatorPeriodeView from './components/views/Indikator_Periode.vue'
import SatuanKerjaView from './components/views/SatuanKerja.vue'
import CapaianUnitView from './components/views/Capaian_Unit.vue'
import IndikatorSatuanKerjaView from './components/views/Indikator_SatuanKerja.vue'
import IndikatorSatuanKerjaLogView from './components/views/Indikator_SatuanKerja_Log.vue'
import TasksView from './components/views/Tasks.vue'
import SettingView from './components/views/Setting.vue'
import AccessView from './components/views/Access.vue'
import ServerView from './components/views/Server.vue'
import ReposView from './components/views/Repos.vue'

// Routes
const routes = [
  {
    path: '/login',
    component: LoginView
  },
  {
    path: '/',
    component: DashView,
    children: [
      {
        path: 'dashboard',
        alias: '',
        component: DashboardView,
        name: 'Dashboard',
        meta: {description: 'Overview of environment'}
      }, {
        path: 'tables',
        component: TablesView,
        name: 'Tables',
        meta: {description: 'Simple and advance table in CoPilot'}
      }, {
        path: 'mahasiswa',
        component: MahasiswaView,
        name: 'Mahasiswa',
        meta: {description: 'Simple and advance table in CoPilot'}
      }, {
        path: 'Dosen',
        component: DosenView,
        name: 'Dosen',
        meta: {description: 'Simple and advance table in CoPilot'}
      }, {
        path: 'Penelitian',
        component: PenelitianView,
        name: 'Penelitian',
        meta: {description: 'Simple and advance table in CoPilot'}
      }, {
        path: 'Abmas',
        component: AbmasView,
        name: 'Abmas',
        meta: {description: 'Simple and advance table in CoPilot'}
      }, {
        path: 'Publikasi',
        component: PublikasiView,
        name: 'Publikasi',
        meta: {description: 'Simple and advance table in CoPilot'}
      }, {
        path: 'DataDasar',
        component: DataDasarView,
        name: 'DataDasar',
        meta: {description: 'Simple and advance table in CoPilot'}
      }, {
        path: 'Aspek',
        component: AspekView,
        name: 'Aspek',
        meta: {description: 'Simple and advance table in CoPilot'}
      }, {
        path: 'MasterIndikator',
        component: MasterIndikatorView,
        name: 'MasterIndikator',
        meta: {description: 'Simple and advance table in CoPilot'}
      }, {
        path: 'JenisSatker',
        component: JenisSatkerView,
        name: 'JenisSatker',
        meta: {description: 'Simple and advance table in CoPilot'}
      }, {
        path: 'Periode',
        component: PeriodeView,
        name: 'Periode',
        meta: {description: 'Simple and advance table in CoPilot'}
      }, {
        path: 'Indikator_Periode',
        component: IndikatorPeriodeView,
        name: 'Indikator_Periode',
        meta: {description: 'Simple and advance table in CoPilot'}
      }, {
        path: 'SatuanKerja',
        component: SatuanKerjaView,
        name: 'SatuanKerja',
        meta: {description: 'Simple and advance table in CoPilot'}
      }, {
        path: 'Capaian_Unit',
        component: CapaianUnitView,
        name: 'Capaian_Unit',
        meta: {description: 'Simple and advance table in CoPilot'}
      }, {
        path: 'Indikator_SatuanKerja',
        component: IndikatorSatuanKerjaView,
        name: 'Indikator_SatuanKerja',
        meta: {description: 'Simple and advance table in CoPilot'}
      }, {
        path: 'Indikator_SatuanKerja_Log',
        component: IndikatorSatuanKerjaLogView,
        name: 'Indikator_SatuanKerja_Log',
        meta: {description: 'Simple and advance table in CoPilot'}
      }, {
        path: 'tasks',
        component: TasksView,
        name: 'Tasks',
        meta: {description: 'Tasks page in the form of a timeline'}
      }, {
        path: 'setting',
        component: SettingView,
        name: 'Settings',
        meta: {description: 'User settings page'}
      }, {
        path: 'access',
        component: AccessView,
        name: 'Access',
        meta: {description: 'Example of using maps'}
      }, {
        path: 'server',
        component: ServerView,
        name: 'Servers',
        meta: {description: 'List of our servers', requiresAuth: true}
      }, {
        path: 'repos',
        component: ReposView,
        name: 'Repository',
        meta: {description: 'List of popular javascript repos'}
      }
    ]
  }, {
    // not found handler
    path: '*',
    component: NotFoundView
  }
]

export default routes
