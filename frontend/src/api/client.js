const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';

class ApiError extends Error {
  constructor(message, status, code) {
    super(message);
    this.status = status;
    this.code = code;
  }
}

async function request(path, options = {}) {
  let response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
      ...options,
    });
  } catch {
    throw new ApiError(
      'Could not reach the 1Fi backend server. Please verify the backend is running.',
      0,
      'NETWORK_ERROR'
    );
  }

  let body;
  try {
    body = await response.json();
  } catch {
    throw new ApiError('Received an unexpected response from the server.', response.status, 'BAD_RESPONSE');
  }

  if (!response.ok || body.success === false) {
    const message = body?.error?.message || 'Something went wrong.';
    const code = body?.error?.code || 'UNKNOWN_ERROR';
    throw new ApiError(message, response.status, code);
  }

  return body.data;
}

export function getProducts(params = {}) {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, val]) => {
    if (val !== undefined && val !== null && val !== '' && val !== 'all') {
      query.append(key, val);
    }
  });
  const qs = query.toString();
  return request(`/api/products${qs ? `?${qs}` : ''}`);
}

export function getProductBySlug(slug) {
  return request(`/api/products/${encodeURIComponent(slug)}`);
}

export function getCollateral() {
  return request('/api/wealth/collateral');
}

export function calculateWealthOffset(payload) {
  return request('/api/wealth/calculate-offset', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function submitOrder(payload) {
  return request('/api/wealth/orders', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function getOrders() {
  return request('/api/wealth/orders');
}

export function prepayOrder(orderId) {
  return request(`/api/wealth/orders/${encodeURIComponent(orderId)}/prepay`, {
    method: 'POST',
  });
}

export function loginUser(credentials) {
  return request('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });
}

export function forgotPasswordUser(payload) {
  return request('/api/auth/forgot-password', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function resetPasswordUser(payload) {
  return request('/api/auth/reset-password', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export { ApiError };
