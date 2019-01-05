export const navigation = [
  {
    'id': 'group-01',
    'title': 'Quản lý',
    'type': 'group',
    'icon': 'pages',
    'children': [
      {
        'id': 'dashboard',
        'title': 'Bất động sản',
        'type': 'item',
        'icon': 'business',
        'url': 'dashboard',
        'rbac': 'Dashboard',
        'tooltip': 'Dashboards'
      },
      {
        'id': 'reports',
        'title': 'Tin Tức',
        'type': 'item',
        'icon': 'receipt',
        'url': 'news-manager',
        'rbac': 'Report',
        'tooltip': 'Reports'
      },
      {
        'id': 'recordings',
        'title': 'Giá Bất Động Sản Khu Vực',
        'type': 'item',
        'icon': 'assessment',
        'url': 'price-page',
        'rbac': 'Recordings',
        'tooltip': 'Recordings'

      },
      {
        'id': 'agents-scorecard',
        'title': 'Bất Động Sản Chờ Duyệt',
        'type': 'item',
        'icon': 'assignment',
        'url': 'pending-list',
        'rbac': 'Evaluation',
        'tooltip': 'Agent Scorecards'
      }
      // {
      //   'id': 'agents-scorecard',
      //   'title': 'Thông tin khách hàng',
      //   'type': 'item',
      //   'icon': 'assignment_ind',
      //   'url': 'agent-scorecards',
      //   'rbac': 'Evaluation',
      //   'tooltip': 'Agent Scorecards'
      // }
    ]
  },
  {
    'id': 'group-03',
    'title': 'Cài Đặt',
    'type': 'group',
    'icon': 'pages',
    'children': [
      {
        'id': 'user',
        'title': 'Thông tin cá nhân',
        'type': 'item',
        'icon': 'person',
        'url': 'users',
        'rbac': 'User',
        'tooltip': 'Users'

      },
      {
        'id': 'teams',
        'title': 'Địa chỉ SIP',
        'type': 'item',
        'icon': 'dialer_sip',
        'url': 'j',
        'rbac': 'Pool',
        'tooltip': 'Teams'
      }
    ]
  }
  ];

