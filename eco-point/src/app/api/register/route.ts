import { NextResponse } from 'next/server';
import supabaseAdmin from '@/lib/supabaseAdmin';

export async function POST(request: Request) {
  if (!supabaseAdmin) {
    return NextResponse.json(
      { error: 'Configuración del servidor incompleta.' },
      { status: 500 }
    );
  }

  try {
    const { nombre, apellido, correo, ci, password } = await request.json();

    if (!nombre || !apellido || !correo || !ci || !password) {
      return NextResponse.json(
        { error: 'Todos los campos son obligatorios.' },
        { status: 400 }
      );
    }

    const { data: createData, error: createError } = await supabaseAdmin.auth.admin.createUser({
      email: correo,
      password,
      email_confirm: true,
      user_metadata: { nombre, apellido, ci },
    });

    if (createError) {
      const duplicateMessage = /already exists|duplicate|already registered|unique constraint/i.test(createError.message)
        ? 'Este correo ya está registrado.'
        : createError.message || 'Error creando el usuario.';

      return NextResponse.json(
        { error: duplicateMessage },
        { status: duplicateMessage === 'Este correo ya está registrado.' ? 409 : 400 }
      );
    }

    const { data: profileData, error: profileError } = await supabaseAdmin
      .from('usuarios')
      .insert([
        {
          email: correo,
          nombres: nombre,
          apellidos: apellido,
          ci,
        },
      ])
      .select()
      .single();

    if (profileError) {
      if (createData?.user?.id) {
        await supabaseAdmin.auth.admin.deleteUser(createData.user.id);
      }
      return NextResponse.json(
        { error: profileError.message || 'Error creando el perfil de usuario.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      user: {
        uid: createData.user?.id,
        correo,
        ci,
        nombre,
        apellido,
        id_usuario: profileData?.id_usuario,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error interno del servidor';
    console.error('Ruta /api/register falló:', message);
    return NextResponse.json(
      { error: message || 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
