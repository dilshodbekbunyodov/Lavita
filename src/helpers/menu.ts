import type { RouteRecordRaw } from 'vue-router'

export const submenu: RouteRecordRaw[] = [
  {
    path: 'production',
    name: 'production',
    component: () => import('../views/production/allProduct.vue'),
    meta: {
      group: 'warehouses',
      title: 'Товары',
      query: { type: 0 }
    }
  },
  {
    path: 'warehouses',
    name: 'warehouses',
    component: () => import('@/views/warehouse/allWarehouses.vue'),
    meta: {
      group: 'warehouses',
      title: 'Склады'
    }
  },

  {
    path: 'proinvoice',
    name: 'proinvoice',
    component: () => import('@/views/invoice/product/allProInvoice.vue'),
    meta: {
      group: 'warehouses',
      title: 'Акт производства'
    }
  },
  {
    path: 'invoices',
    name: 'invoices',
    component: () => import('@/views/invoice/invoice/allInvoice.vue'),
    meta: {
      group: 'warehouses',
      title: 'Накладные'
    }
  },
  {
    path: 'expense',
    name: 'expense',
    component: () => import('@/views/expense/allExpence.vue'),
    meta: {
      group: 'warehouses',
      title: 'Списание'
    }
  },
  {
    path: 'movements',
    name: 'movements',
    component: () => import('@/views/invoice/movement/allMovement.vue'),
    meta: {
      group: 'warehouses',
      title: 'Перемещения'
    }
  },
  {
    path: 'filters',
    name: 'filters',
    component: () => import('@/views/filters/index.vue'),
    meta: {
      group: 'warehouses',
      title: 'Фильтры'
    }
  },
  {
    path: 'departments',
    name: 'departments',
    component: () => import('@/views/user/department/allDepartments.vue'),
    meta: {
      group: 'user',
      title: 'Отделы'
    }
  },
  {
    path: 'employee',
    name: 'employee',
    component: () => import('@/views/user/employee/allEmployee.vue'),
    meta: {
      group: 'user',
      title: 'Сотрудники'
    }
  },
  {
    path: 'worktable',
    name: 'worktable',
    component: () => import('@/views/user/worktable/allWorktable.vue'),
    meta: {
      group: 'user',
      title: 'Рабочий график'
    }
  },
  {
    path: 'salary',
    name: 'salary',
    component: () => import('@/views/user/salary/allSalary.vue'),
    meta: {
      group: 'user',
      title: 'Зарплаты'
    }
  },

  {
    path: '',
    name: '',
    component: () => import('@/views/invoice/invoice/allInvoice.vue'),
    meta: {
      group: 'finance',
      title: 'Типы оплаты'
    }
  },
  {
    path: '',
    name: '',
    component: () => import('@/views/invoice/invoice/allInvoice.vue'),
    meta: {
      group: 'finance',
      title: 'Кассы'
    }
  },
  {
    path: '',
    name: '',
    component: () => import('@/views/invoice/invoice/allInvoice.vue'),
    meta: {
      group: 'finance',
      title: 'Справочник'
    }
  },
  {
    path: '',
    name: '',
    component: () => import('@/views/invoice/invoice/allInvoice.vue'),
    meta: {
      group: 'finance',
      title: 'Транзакции'
    }
  },
  {
    path: '',
    name: '',
    component: () => import('@/views/invoice/invoice/allInvoice.vue'),
    meta: {
      group: 'finance',
      title: 'Счета баланса'
    }
  },
  {
    path: '',
    name: '',
    component: () => import('@/views/invoice/invoice/allInvoice.vue'),
    meta: {
      group: 'finance',
      title: 'Контрагенты'
    }
  }
]

export const links: RouteRecordRaw[] = [
  ...submenu,
  {
    path: 'warehouses/create',
    name: 'createwarehouse',
    component: () => import('@/views/warehouse/createWarehouse.vue')
  },
  {
    path: 'department/:id',
    name: 'showdepartment',
    component: () => import('@/views/user/department/showDepartment.vue'),
    children: [
      {
        path: 'employee',
        name: 'department_employee',
        component: () => import('@/views/user/department/departmentEmployee.vue')
      },
      {
        path: 'history',
        name: 'department_settings',
        component: () => import('@/views/user/department/departmentSettings.vue')
      }
    ]
  },
  {
    path: 'employee/:id',
    name: 'showemployee',
    component: () => import('@/views/user/employee/showEmployee.vue'),
    children: [
      {
        path: 'information',
        name: 'employee_information',
        component: () => import('@/views/user/employee/employeeInformation.vue')
      },
      {
        path: 'salary',
        name: 'employee_salary',
        component: () => import('@/views/user/employee/employeeSalary.vue')
      },
      {
        path: 'worktable',
        name: 'employee_worktable',
        component: () => import('@/views/user/employee/employeeWorktable.vue')
      },
      {
        path: 'statistic',
        name: 'employee_statistic',
        component: () => import('@/views/user/employee/employeeStatistic.vue')
      },
      {
        path: 'access',
        name: 'employee_access',
        component: () => import('@/views/user/employee/employeeAccess.vue')
      }
    ]
  },
  {
    path: 'production/create',
    name: 'createproduct',
    component: () => import('@/views/production/createProduct.vue')
  },
  {
    path: 'proinvoice/create',
    name: 'createproinvoice',
    component: () => import('@/views/invoice/product/createProInvoice.vue')
  },
  {
    path: 'invoice/create',
    name: 'createinvoice',
    component: () => import('@/views/invoice/invoice/createInvoice.vue')
  },
  {
    path: 'movement/create',
    name: 'createmovement',
    component: () => import('@/views/invoice/movement/createMovement.vue')
  },
  {
    path: 'expense/create',
    name: 'createExpense',
    component: () => import('@/views/expense/createExpence.vue')
  },
  {
    path: 'invoice/:id',
    name: 'showinvoice',
    component: () => import('@/views/invoice/invoice/statusInvoice.vue')
  },
  {
    path: 'salary/:id',
    name: 'showsalary',
    component: () => import('@/views/user/salary/showSalary.vue')
  },
  {
    path: 'proinvoice/:id',
    name: 'showproinvoice',
    component: () => import('@/views/invoice/product/statusProInvoice.vue')
  },
  {
    path: 'movement/:id',
    name: 'showmovement',
    component: () => import('@/views/invoice/movement/statusMovement.vue')
  },
  {
    path: 'expense/:id',
    name: 'showExpense',
    component: () => import('@/views/expense/statusExpense.vue')
  },
  {
    path: 'filters/:id',
    name: 'showfilters',
    component: () => import('@/views/filters/components/detailFilter.vue')
  },
  {
    path: 'production/:id',
    name: 'showproduct',
    component: () => import('@/views/production/showProduct.vue'),
    children: [
      {
        path: 'warehouses',
        name: 'showproduct_warehouse',
        component: () => import('@/views/production/product/byWarehouses.vue')
      },
      {
        path: 'documents',
        name: 'showproduct_documents',
        component: () => import('@/views/production/product/byDocuments.vue')
      }
    ]
  },
  {
    path: 'warehouses/:id',
    name: 'showwarehouse',
    component: () => import('@/views/warehouse/showWarehouse.vue'),
    children: [
      {
        path: 'products',
        name: 'warehouse_products',
        component: () => import('@/views/warehouse/tabs/warehouseProducts.vue')
      },
      {
        path: 'history',
        name: 'warehouse_history',
        component: () => import('@/views/warehouse/tabs/warehouseHistory.vue')
      },
      {
        path: 'settings',
        name: 'warehouse_settings',
        component: () => import('@/views/warehouse/tabs/warehouseSettings.vue')
      }
    ]
  },
  // {
  //   path: 'filters/:id',
  //   name: 'show-filters',
  //   component: () => import('@/views/filters/components/detailFilter.vue'),
  //   children: [
  //     {
  //       path: 'filters',
  //       name: 'filters',
  //       component: () => import('@/views/filters/index.vue')
  //     },
  //   ]
  // },
]
