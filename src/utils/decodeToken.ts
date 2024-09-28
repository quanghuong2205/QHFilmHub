import { LOCAL_STORAGE_KEY } from '@/constant/local-storage-key.const';
import { jwtDecode } from 'jwt-decode';

export const decodeToken = (): ITokenPayload | undefined => {
  const token = localStorage.getItem(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
  if (!token) return undefined;
  return jwtDecode(token);
};
