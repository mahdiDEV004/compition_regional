import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register: authRegister } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const result = await authRegister(data);
      if (result.success) {
        setSuccessMessage('Registration successful!');
        setErrorMessage('');
        // Navigate to dashboard or login after successful registration
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      } else {
        setErrorMessage(result.error || 'Registration failed');
        setSuccessMessage('');
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'Registration failed');
      setSuccessMessage('');
    } finally {
      setIsLoading(false);
    }
  };

  const password = watch("mot_de_passe");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Créer un compte
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Rejoignez-nous pour participer aux compétitions
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-8">
          {successMessage && (
            <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
              {successMessage}
            </div>
          )}
          
          {errorMessage && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nom</label>
                <input
                  {...register("nom", { required: "Nom est requis" })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 border"
                  placeholder="Votre nom"
                />
                {errors.nom && <p className="text-red-500 text-xs mt-1">{errors.nom.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Prénom</label>
                <input
                  {...register("prenom", { required: "Prénom est requis" })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 border"
                  placeholder="Votre prénom"
                />
                {errors.prenom && <p className="text-red-500 text-xs mt-1">{errors.prenom.message}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                {...register("email", { 
                  required: "Email est requis",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Email invalide"
                  }
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 border"
                placeholder="votre@email.com"
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Mot de Passe</label>
              <input
                type="password"
                {...register("mot_de_passe", { 
                  required: "Mot de passe est requis",
                  minLength: {
                    value: 8,
                    message: "Le mot de passe doit avoir au moins 8 caractères"
                  }
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 border"
                placeholder="••••••••"
              />
              {errors.mot_de_passe && <p className="text-red-500 text-xs mt-1">{errors.mot_de_passe.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Confirmer Mot de Passe</label>
              <input
                type="password"
                {...register("mot_de_passe_confirmation", { 
                  required: "Veuillez confirmer le mot de passe",
                  validate: value => value === password || "Les mots de passe ne correspondent pas"
                })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-3 border"
                placeholder="••••••••"
              />
              {errors.mot_de_passe_confirmation && <p className="text-red-500 text-xs mt-1">{errors.mot_de_passe_confirmation.message}</p>}
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#18bebc] hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Inscription en cours...' : "S'inscrire"}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Ou</span>
              </div>
            </div>

            <div className="mt-6">
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
              >
                Déjà un compte ? Se connecter
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;