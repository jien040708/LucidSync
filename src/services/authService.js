const API_BASE_URL = 'http://localhost:8000';

export const authService = {
  // 로그인 API
  async login(phone, password) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phone_number: phone, password }),
      });
      
      if (!response.ok) {
        let errorMessage = '로그인에 실패했습니다';
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorData.detail || errorMessage;
        } catch {}
        throw new Error(errorMessage);
      }
      
      const data = await response.json();
      
      // 백엔드 응답 형식에 따라 처리
      if (data.token) {
        localStorage.setItem('token', data.token);
      }
      
      if (data.user) {
        localStorage.setItem('user', JSON.stringify(data.user));
        return {
          token: data.token,
          user: data.user
        };
      } else if (data.id) {
        // user 객체가 없는 경우 data 자체가 user 정보일 수 있음
        const user = {
          id: data.id,
          userId: data.user_id || data.userId,
          phone: data.phone_number || data.phone
        };
        localStorage.setItem('user', JSON.stringify(user));
        return {
          token: data.token,
          user: user
        };
      } else {
        throw new Error('서버 응답 형식이 올바르지 않습니다');
      }
    } catch (error) {
      throw error;
    }
  },

  // 회원가입 API
  async signup(userId, phone, password) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId,          
          phone_number: phone,      
          password
        }),
      });
      
      if (!response.ok) {
        let errorMessage = '회원가입에 실패했습니다';
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorData.detail || errorMessage;
        } catch {}
        throw new Error(errorMessage);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  },

  // 로그아웃 API
  async logout() {
    try {
      const token = localStorage.getItem('token');
      if (!token) return true;
      
      const response = await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return response.ok;
    } catch (error) {
      console.error('로그아웃 에러:', error);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return true;
    }
  },

  // 토큰 유효성 검사
  async validateToken() {
    try {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');
      
      if (!token || !user) {
        return false;
      }
      
      const response = await fetch(`${API_BASE_URL}/auth/validate`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        return data.user || JSON.parse(user);
      }
      
      // 토큰이 유효하지 않으면 로컬 스토리지 정리
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return false;
    } catch (error) {
      console.error('토큰 검증 에러:', error);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return false;
    }
  }
};
