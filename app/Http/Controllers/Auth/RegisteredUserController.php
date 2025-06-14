<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register', [
            'status' => session('status'),
            'errors' => session('errors') ? session('errors')->getBag('default')->getMessages() : [],
        ]);
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $rules = [
            'name' => 'required|string|min:5|max:255',
            'email' => 'required|string|email|min:15|max:255|unique:' . User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ];

        $feedbacks = [

            'name.required' => 'O nome é obrigatório. ',
            'name.string' => 'O nome deve ser uma string válida. ',
            'name.min' => 'O nome deve conter pelo menos 5 caracteres. ',
            'name.max' => 'O nome não pode exceder 255 caracteres. ',

            'email.required' => 'O e-mail é obrigatório.',
            'email.string' => 'O e-mail deve ser uma string válida. ',
            'email.email' => 'O formato do e-mail é inválido. ',
            'email.min' => 'O e-mail deve conter pelo menos 15 caracteres. ',
            'email.max' => 'O e-mail não pode exceder 255 caracteres. ',
            'email.unique' => 'Este e-mail já está cadastrado. ',

            'password.required' => 'A senha é obrigatória.',
            'password.confirmed' => 'As senhas não conferem. ',
            'password.min' => 'A senha deve conter pelo menos 8 caracteres. ',
        ];

        $request->validate($rules, $feedbacks);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        event(new Registered($user));

        Auth::login($user);

        return redirect(route('dashboard', absolute: false));
    }


}
