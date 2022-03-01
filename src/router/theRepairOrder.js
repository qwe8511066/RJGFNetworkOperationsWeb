export default [
  {
    path: '/hiddenTroubleReport',
    name: 'hiddenTroubleReport',
    component: () => import('views/theRepairOrder/HiddenTroubleReport.vue'),
    meta: {
      title: '隐患上报'
    }
  },
  {
    path: '/faultRepairOrder',
    name: 'faultRepairOrder',
    component: () => import('views/theRepairOrder/FaultRepairOrder.vue'),
    meta: {
      title: '故障工单'
    }
  },
  {
    path: '/faultRepairOrderDetails',
    name: 'faultRepairOrderDetails',
    component: () => import('views/theRepairOrder/FaultRepairOrderDetails.vue'),
    meta: {
      title: '故障工单详情'
    }
  },

  {
    path: '/faultRepairOrderDispose',
    name: 'faultRepairOrderDispose',
    component: () => import('views/theRepairOrder/FaultRepairOrderDispose.vue'),
    meta: {
      title: '故障工单处理'
    }
  },
]
