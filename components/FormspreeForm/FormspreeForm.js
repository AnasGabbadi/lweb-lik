"use client";
import { ValidationError, useForm } from "@formspree/react";

export const FormspreeForm = ({ formId }) => {
    const [state, handleSubmit] = useForm(formId);

    if (state.succeeded) {
        return <p className="max-w-5xl mx-auto my-64 text-2xl">Merci pour votre inscription !</p>;
    }

    return (
        <div className="max-w-6xl mx-auto p-8 bg-black/10 rounded-2xl shadow-lg">
            <form onSubmit={handleSubmit} className="flex flex-col space-y-6">
                {/* Nom */}
                <input 
                    id="name"
                    type="text" 
                    name="Nom complet" 
                    placeholder="Votre nom" 
                    className="bg-transparent border-b border-white text-white placeholder-gray-400 outline-none py-3"
                />

                {/* Email */}
                <input 
                    id="mail"
                    type="email" 
                    name="mail" 
                    placeholder="Votre Email" 
                    className="bg-transparent border-b border-white text-white placeholder-gray-400 outline-none py-3"
                />
                <ValidationError prefix="Email" field="mail" errors={state.errors} />

                {/* Téléphone */}
                <input 
                    id="phone"
                    type="tel" 
                    name="phone" 
                    placeholder="Votre Téléphone" 
                    className="bg-transparent border-b border-white text-white placeholder-gray-400 outline-none py-3"
                />
                <ValidationError prefix="Téléphone" field="phone" errors={state.errors} />

                <select
                    id="type"
                    name="type"
                    defaultValue=""
                    className="bg-transparent border-b border-white text-white placeholder-gray-400 outline-none py-3"
                >
                <option value="" disabled className="bg-black">
                    Pour savoir ce que nous allons réaliser ensemble
                </option>
                <option value="consulting" className="bg-black">Consulting</option>
                <option value="development" className="bg-black">Développement</option>
                <option value="design" className="bg-black">Design</option>
                <option value="marketing" className="bg-black">Marketing</option>
                </select>
                <ValidationError
                    prefix="Type de Prestation"
                    field="type"
                    errors={state.errors}
                />

                {/* Message */}
                <textarea 
                    id="description"
                    name="message" 
                    placeholder="Message" 
                    className="bg-transparent border-b border-white text-white placeholder-gray-400 outline-none py-3"
                    rows="3"
                />
                <ValidationError prefix="Message" field="message" errors={state.errors} />

                {/* Bouton d'envoi */}
                <button 
                    type="submit" 
                    disabled={state.submitting}
                    className="btn"
                >
                    Envoyer
                </button>
            </form>
        </div>
    );
};
