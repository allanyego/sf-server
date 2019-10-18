const routes = [
  {
    endpoint: 'talents',
    children: [
        {
            method: 'GET',
            url: '/'
        },
        {
            method: 'GET',
            url: '/:id'
        }
    ]     
  },
  {
    endpoint: 'clients',
    children: [
        {
            method: 'GET',
            url: '/'
        },
        {
            method: 'GET',
            url: '/:id'
        }
    ]     
  },
  {
    endpoint: 'jobs',
    children: [
        {
            method: 'GET',
            url: '/'
        },
        {
            method: 'GET',
            url: '/:id'
        },
        {
            method: 'GET',
            url: '/client/:id'
        },
        {
            method: 'POST',
            url: '/'
        },
        {
            method: 'PUT',
            url: '/:id'
        },
        {
            method: 'GET',
            url: '/talents/:id'
        },
        {
            method: 'GET',
            url: '/talents/:id'
        }
    ]     
  },
  {
    endpoint: 'bids',
    children: [
        {
            method: 'GET',
            url: '/talents/:id'
        },
        {
            method: 'GET',
            url: '/jobs/:id'
        },
        {
            method: 'POST',
            url: '/jobs/:jobId'
        },
        {
            method: 'PUT',
            url: '/:id'
        }
    ]     
  },
  {
    endpoint: 'contracts',
    children: [
        {
            method: 'GET',
            url: '/talents/:id'
        },
        {
            method: 'GET',
            url: '/clients/:id'
        },
        {
            method: 'POST',
            url: '/'
        },
        {
            method: 'PUT',
            url: '/:id'
        }
    ]     
  },
  {
    endpoint: 'reviews',
    children: [
        {
            method: 'GET',
            url: '/:id'
        },
        {
            method: 'POST',
            url: '/clients'
        },
        {
            method: 'POST',
            url: '/talents'
        },
        {
            method: 'PUT',
            url: '/:id'
        },
        {
            method: 'DELETE',
            url: '/:id'
        }
    ]     
  },
  {
    endpoint: 'threads',
    children: [
        {
            method: 'GET',
            url: '/:id',
        },
        {
            method: 'POST',
            url: '/',
        },
        {
            method: 'POST',
            url: '/messages',
        },
        {
            method: 'PUT',
            url: '/:id',
        },
        {
            method: 'PUT',
            url: '/messages/:id',
        },
        {
            method: 'DELETE',
            url: '/:id',
        },
        {
            method: 'DELETE',
            url: '/messages/:id',
        }
    ]     
  },
  {
    endpoint: 'users',
    children: [
        {
            method: 'POST',
            url: '/'
        },
        {
            method: 'POST',
            url: '/auth'
        },
        {
            method: 'PUT',
            url: '/:id'
        }
    ]     
  }
];

module.exports = {
 routes: routes
}