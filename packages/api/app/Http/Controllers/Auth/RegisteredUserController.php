<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Illuminate\Validation\Rule; // Importante para o user_type

class RegisteredUserController extends Controller
{
    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): Response
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'lowercase', 'email', 'max:255', 'unique:' . User::class],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'user_type' => ['required', 'string', Rule::in(['PF', 'PJ', 'Leiloeiro'])],

            // ---- REGRAS CONDICIONAIS ----

            // Campos compartilhados (PF, PJ, Leiloeiro)
            'phone' => [
                Rule::requiredIf(fn() => in_array($request->user_type, ['PF', 'PJ', 'Leiloeiro'])),
                'nullable',
                'string',
                'max:20'
            ],

            // Campos compartilhados (PF, PJ)
            'address' => [
                Rule::requiredIf(fn() => in_array($request->user_type, ['PF', 'PJ'])),
                'nullable',
                'string'
            ],

            // Campos de PF
            'cpf' => ['required_if:user_type,PF', 'nullable', 'string', 'max:14', 'unique:' . User::class],
            'rg' => ['required_if:user_type,PF', 'nullable', 'string', 'max:20'],

            // Campos de PJ
            'cnpj' => ['required_if:user_type,PJ', 'nullable', 'string', 'max:18', 'unique:' . User::class],
            'company_name' => ['required_if:user_type,PJ', 'nullable', 'string', 'max:255'],
            'website' => ['nullable', 'string', 'max:255'],

            // Campos de Leiloeiro
            'junta_comercial' => ['required_if:user_type,Leiloeiro', 'nullable', 'string', 'max:255'],
            'registration_number' => ['required_if:user_type,Leiloeiro', 'nullable', 'string', 'max:50'],

            // 2. === NOVAS REGRAS PARA CATEGORIAS ===
            'categories' => [
                Rule::requiredIf(fn() => in_array($request->user_type, ['PF', 'PJ'])), // Obrigatório para PF e PJ
                'nullable', // Pode ser nulo se for Leiloeiro
                'array'     // Deve ser um array (ex: [1, 3, 5])
            ],
            'categories.*' => [ // Regra para cada item dentro do array
                'integer',
                'exists:categories,id' // Garante que o ID da categoria existe no banco
            ],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'user_type' => $request->user_type,

            // Campos PF
            'cpf' => $request->cpf,
            'rg' => $request->rg,
            'address' => $request->address,
            'phone' => $request->phone,

            // Campos PJ
            'cnpj' => $request->cnpj,
            'company_name' => $request->company_name,
            'website' => $request->website,

            // Campos Leiloeiro
            'junta_comercial' => $request->junta_comercial,
            'registration_number' => $request->registration_number,
        ]);

        // 3. === NOVA LÓGICA PARA SALVAR CATEGORIAS ===
        // Se a request tiver categorias (e for um array), anexa elas
        if ($request->has('categories') && is_array($request->categories)) {
            $user->categories()->attach($request->categories);
        }

        event(new Registered($user));

        Auth::login($user);

        // Retorna 204 No Content. O frontend React vai receber isso
        // e saber que o login foi feito com sucesso (via cookie).
        return response()->noContent();
    }
}
