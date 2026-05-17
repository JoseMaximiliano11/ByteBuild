// src/lib/auth.ts
// Funciones de autenticación con Supabase

import supabase from './supabase';
import type { User as SupabaseUser } from '@supabase/supabase-js';
import { User, RegisterData } from '@/types/user';

interface UserProfileRow {
  id_usuario?: string;
  email?: string;
  nombres?: string;
  apellidos?: string;
  ci?: string;
  id_rol?: number;
  estado?: number;
  username?: string;
  url_foto_perfil?: string;
  google_id?: string;
  fecha_nac?: string;
  genero?: string;
  telefono?: string;
  puntos_totales?: number;
  puntos_canjeados?: number;
}

function mapProfileToUser(profile: UserProfileRow, supabaseUser: SupabaseUser): User {
  return {
    uid: supabaseUser.id,
    nombre: profile.nombres || '',
    apellido: profile.apellidos || '',
    correo: profile.email || supabaseUser.email || '',
    ci: profile.ci || '',
    puntos: profile.puntos_totales ?? 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    id_usuario: profile.id_usuario,
    id_rol: profile.id_rol,
    estado: profile.estado,
    username: profile.username,
    url_foto_perfil: profile.url_foto_perfil,
    google_id: profile.google_id,
    fecha_nac: profile.fecha_nac,
    genero: profile.genero,
    telefono: profile.telefono,
    puntos_totales: profile.puntos_totales,
    puntos_canjeados: profile.puntos_canjeados,
  };
}

async function getUserProfile(email: string): Promise<UserProfileRow | null> {
  const { data, error } = await supabase
    .from('usuarios')
    .select('*')
    .eq('email', email)
    .single();

  if (error) {
    console.warn('No se encontró perfil de usuario:', error.message);
    return null;
  }

  return data as UserProfileRow | null;
}

/**
 * Registrar un nuevo usuario
 */
export async function signUp(data: RegisterData): Promise<User> {
  let response: Response;

  try {
    response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        nombre: data.nombre,
        apellido: data.apellido,
        correo: data.correo,
        ci: data.ci,
        password: data.password,
      }),
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Error de conexión';
    const friendlyMessage = /fetch failed|failed to fetch|ETIMEDOUT|timeout/i.test(message)
      ? 'No se pudo conectar con el servidor de registro. Intenta de nuevo.'
      : message;
    console.error('Error en registro:', message);
    throw new Error(friendlyMessage);
  }

  const result = await response.json();

  if (!response.ok) {
    console.error('Error en registro:', result.error || 'Error desconocido');
    throw new Error(result.error || 'Error desconocido al registrar.');
  }

  const user = result.user as User;
  if (!user) {
    throw new Error('No se pudo crear el usuario');
  }

  return user;
}

/**
 * Iniciar sesión
 */
export async function signIn(email: string, password: string): Promise<User> {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error('Error en login:', error.message);
    throw new Error(error.message);
  }

  const user = data.user;
  if (!user) {
    throw new Error('No se pudo iniciar sesión');
  }

  const profile = await getUserProfile(email);
  if (profile) {
    return mapProfileToUser(profile, user);
  }

  return {
    uid: user.id,
    nombre: user.user_metadata?.nombre || '',
    apellido: user.user_metadata?.apellido || '',
    correo: user.email || '',
    ci: user.user_metadata?.ci || '',
    puntos: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}

/**
 * Cerrar sesión
 */
export async function logOut(): Promise<void> {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('Error al cerrar sesión:', error.message);
    throw new Error(error.message);
  }
}

/**
 * Escuchar cambios de autenticación
 */
export function onAuthChange(callback: (user: User | null) => void): () => void {
  const { data } = supabase.auth.onAuthStateChange(async (_event, session) => {
    if (session?.user) {
      const email = session.user.email || '';
      const profile = await getUserProfile(email);
      if (profile) {
        callback(mapProfileToUser(profile, session.user));
      } else {
        callback({
          uid: session.user.id,
          nombre: session.user.user_metadata?.nombre || '',
          apellido: session.user.user_metadata?.apellido || '',
          correo: session.user.email || '',
          ci: session.user.user_metadata?.ci || '',
          puntos: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
    } else {
      callback(null);
    }
  });

  return () => data.subscription?.unsubscribe();
}

/**
 * Obtener usuario actual
 */
export async function getCurrentUser(): Promise<User | null> {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (error || !user) return null;

  const profile = await getUserProfile(user.email || '');
  if (profile) {
    return mapProfileToUser(profile, user);
  }

  return {
    uid: user.id,
    nombre: user.user_metadata?.nombre || '',
    apellido: user.user_metadata?.apellido || '',
    correo: user.email || '',
    ci: user.user_metadata?.ci || '',
    puntos: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
}
