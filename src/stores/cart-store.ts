import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import type { localUser } from '@/types';

const useAuthStore = defineStore('auth', () => {
	const user = ref<localUser | null>(JSON.parse(localStorage.getItem('user') || 'null'));
	const router = useRouter();

	function setUser(newUser: localUser | null) {
		user.value = newUser === null ? null : {
			id: newUser.id,
			email: newUser.email
		};

		localStorage.setItem('user', JSON.stringify(user.value));
		return user;
	}
	const getUser = computed(() => user.value);

	async function login(user: localUser) {
        setUser(user);

        return user;
	}

	function logout() {
		setUser(null);
		localStorage.removeItem('user');

		if (getUser.value === null) {
			router.push('/login');
			return true;
		}

		return false;
	}

	return {
		setUser,
		getUser,
		login,
		logout
	};
});

export default useAuthStore;