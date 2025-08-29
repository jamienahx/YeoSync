const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/users`;

interface AuthFormData {
  email: string;
  password: string;
}


const signIn = async (formData: AuthFormData) => {
    try {
    const res = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData), 
    });

     if (!res.ok) {
      const errorText = await res.text(); // try to capture any text returned
      throw new Error(errorText || 'Login failed');
    }

    const data = await res.json();

     if (data.jwt) {
      localStorage.setItem('token', data.jwt);  //store token in local storage
      const decoded = JSON.parse(atob(data.jwt.split('.')[1]));
      return decoded;
    }
    throw new Error('Invalid response from server');
} catch (err:any) {
    console.log(err);
    throw new Error(err.message || 'Login failed');
}
}

const signOut = () => {
  localStorage.removeItem('token');
};

export {
  signIn,
  signOut
};